package com.pegi.backend.service;

import com.pegi.backend.entity.Badge;
import com.pegi.backend.entity.User;
import com.pegi.backend.repository.BadgeRepository;
import com.pegi.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;

    // GET /api/profile
    public Map<String, Object> getProfile(String email) {
        User user = findUserByEmail(email);
        List<Badge> badges = badgeRepository.findByUser(user);

        // Ubah badge jadi list of map untuk respons JSON
        List<Map<String, Object>> badgeList = badges.stream().map(b -> {
            Map<String, Object> bMap = new HashMap<>();
            bMap.put("name", b.getName());
            bMap.put("description", b.getDescription());
            bMap.put("icon", b.getIcon());
            bMap.put("earnedAt", b.getEarnedAt());
            return bMap;
        }).toList();

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("bio", user.getBio());
        response.put("phone", user.getPhone());
        response.put("avatar", user.getAvatar());
        response.put("role", user.getRole().getName().name());
        response.put("badges", badgeList);
        response.put("createdAt", user.getCreatedAt());
        return response;
    }

    // PUT /api/profile
    public Map<String, Object> updateProfile(String email, Map<String, Object> request) {
        User user = findUserByEmail(email);

        // Update hanya field yang dikirim (tidak null)
        if (request.containsKey("name"))   user.setName((String) request.get("name"));
        if (request.containsKey("bio"))    user.setBio((String) request.get("bio"));
        if (request.containsKey("phone"))  user.setPhone((String) request.get("phone"));
        if (request.containsKey("avatar")) user.setAvatar((String) request.get("avatar"));

        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Profil berhasil diperbarui");
        response.put("name", user.getName());
        return response;
    }

    // Helper private - cari user, lempar error kalau tidak ada
    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }
}
