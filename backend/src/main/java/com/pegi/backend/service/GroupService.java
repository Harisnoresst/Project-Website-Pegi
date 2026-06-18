package com.pegi.backend.service;

import com.pegi.backend.entity.Group;
import com.pegi.backend.entity.GroupMember;
import com.pegi.backend.entity.User;
import com.pegi.backend.entity.enums.GroupType;
import com.pegi.backend.repository.GroupMemberRepository;
import com.pegi.backend.repository.GroupRepository;
import com.pegi.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final UserRepository userRepository;
    private final BadgeService badgeService;

    // POST /api/groups
    public Map<String, Object> createGroup(String email, Map<String, Object> request) {
        User creator = findUserByEmail(email);

        String name        = (String) request.get("name");
        String description = (String) request.getOrDefault("description", "");
        String typeStr     = (String) request.getOrDefault("groupType", "PUBLIC");
        GroupType groupType = GroupType.valueOf(typeStr.toUpperCase());

        // Buat grup baru
        Group group = Group.builder()
                .name(name)
                .description(description)
                .groupType(groupType)
                .creator(creator)
                .build();
        groupRepository.save(group);

        // Otomatis jadikan pembuat sebagai ADMIN grup
        GroupMember adminMember = GroupMember.builder()
                .group(group)
                .user(creator)
                .memberRole("ADMIN")
                .build();
        groupMemberRepository.save(adminMember);

        // Cek badge setelah gabung grup
        badgeService.checkAndAwardBadges(creator);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Grup berhasil dibuat");
        response.put("groupId", group.getId());
        response.put("groupName", group.getName());
        return response;
    }

    // GET /api/groups
    public List<Map<String, Object>> getGroups(String email) {
        // Tampilkan semua grup PUBLIC + grup yang diikuti user
        User user = findUserByEmail(email);

        List<Long> myGroupIds = groupMemberRepository.findByUser(user)
                .stream().map(gm -> gm.getGroup().getId()).toList();

        return groupRepository.findAll().stream()
                .filter(g -> g.getGroupType() == GroupType.PUBLIC
                          || myGroupIds.contains(g.getId()))
                .map(g -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", g.getId());
                    map.put("name", g.getName());
                    map.put("description", g.getDescription());
                    map.put("groupType", g.getGroupType().name());
                    map.put("creatorName", g.getCreator().getName());
                    map.put("isMember", myGroupIds.contains(g.getId()));
                    map.put("createdAt", g.getCreatedAt());
                    return map;
                }).toList();
    }

    // POST /api/groups/{id}/invite
    public Map<String, Object> inviteToGroup(String email, Long groupId,
                                              Map<String, Object> request) {
        User inviter = findUserByEmail(email);
        Group group  = findGroupById(groupId);

        // Hanya anggota grup yang boleh undang
        if (!groupMemberRepository.existsByGroupAndUser(group, inviter)) {
            throw new RuntimeException("Kamu bukan anggota grup ini");
        }

        String invitedEmail = (String) request.get("invitedUserEmail");
        User invitedUser = userRepository.findByEmail(invitedEmail)
                .orElseThrow(() -> new RuntimeException("User yang diundang tidak ditemukan"));

        // Cek apakah sudah menjadi anggota
        if (groupMemberRepository.existsByGroupAndUser(group, invitedUser)) {
            throw new RuntimeException("User sudah menjadi anggota grup ini");
        }

        GroupMember newMember = GroupMember.builder()
                .group(group)
                .user(invitedUser)
                .memberRole("MEMBER")
                .build();
        groupMemberRepository.save(newMember);

        badgeService.checkAndAwardBadges(invitedUser);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", invitedUser.getName() + " berhasil diundang ke grup");
        return response;
    }

    // POST /api/groups/{id}/join
    public Map<String, Object> joinGroup(String email, Long groupId) {
        User user   = findUserByEmail(email);
        Group group = findGroupById(groupId);

        // Hanya grup PUBLIC yang bisa dimasuki langsung
        if (group.getGroupType() == GroupType.PRIVATE) {
            throw new RuntimeException("Grup ini PRIVATE, kamu harus diundang terlebih dahulu");
        }

        // Cek apakah sudah menjadi anggota
        if (groupMemberRepository.existsByGroupAndUser(group, user)) {
            throw new RuntimeException("Kamu sudah menjadi anggota grup ini");
        }

        GroupMember member = GroupMember.builder()
                .group(group)
                .user(user)
                .memberRole("MEMBER")
                .build();
        groupMemberRepository.save(member);

        badgeService.checkAndAwardBadges(user);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Berhasil bergabung ke grup " + group.getName());
        return response;
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }

    private Group findGroupById(Long id) {
        return groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grup tidak ditemukan"));
    }
}
