package com.pegi.backend.controller;

import com.pegi.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    // GET /api/groups/{id}/chats
    // Ambil semua pesan chat dalam grup tertentu
    // Hanya bisa diakses oleh anggota grup
    @GetMapping("/{id}/chats")
    public ResponseEntity<?> getChatMessages(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {

        String email = userDetails.getUsername();
        return ResponseEntity.ok(chatService.getChatMessages(email, id));
    }

    // POST /api/groups/{id}/chats
    // Kirim pesan baru ke chat grup
    @PostMapping("/{id}/chats")
    public ResponseEntity<?> sendMessage(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        // request berisi: message (String)
        String email = userDetails.getUsername();
        Map<String, Object> result = chatService.sendMessage(email, id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
