package com.pegi.backend.service;

import com.pegi.backend.entity.ChatMessage;
import com.pegi.backend.entity.Group;
import com.pegi.backend.entity.GroupMember;
import com.pegi.backend.entity.User;
import com.pegi.backend.repository.ChatMessageRepository;
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
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final UserRepository userRepository;

    // GET /api/groups/{id}/chats
    public List<Map<String, Object>> getChatMessages(String email, Long groupId) {
        User user   = findUserByEmail(email);
        Group group = findGroupById(groupId);

        // Hanya anggota grup yang boleh lihat chat
        checkMembership(user, group);

        return chatMessageRepository.findByGroupOrderBySentAtAsc(group)
                .stream().map(msg -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", msg.getId());
                    map.put("message", msg.getMessage());
                    map.put("senderName", msg.getSender().getName());
                    map.put("senderId", msg.getSender().getId());
                    map.put("sentAt", msg.getSentAt());
                    return map;
                }).toList();
    }

    // POST /api/groups/{id}/chats
    public Map<String, Object> sendMessage(String email, Long groupId,
                                            Map<String, String> request) {
        User user   = findUserByEmail(email);
        Group group = findGroupById(groupId);

        // Hanya anggota grup yang boleh kirim pesan
        checkMembership(user, group);

        String messageText = request.get("message");
        if (messageText == null || messageText.isBlank()) {
            throw new RuntimeException("Pesan tidak boleh kosong");
        }

        ChatMessage chatMessage = ChatMessage.builder()
                .group(group)
                .sender(user)
                .message(messageText)
                .build();
        chatMessageRepository.save(chatMessage);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("messageId", chatMessage.getId());
        response.put("message", chatMessage.getMessage());
        response.put("senderName", user.getName());
        response.put("sentAt", chatMessage.getSentAt());
        return response;
    }

    // Helper: cek apakah user adalah anggota grup, lempar error kalau bukan
    private void checkMembership(User user, Group group) {
        if (!groupMemberRepository.existsByGroupAndUser(group, user)) {
            throw new RuntimeException("Kamu bukan anggota grup ini");
        }
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
