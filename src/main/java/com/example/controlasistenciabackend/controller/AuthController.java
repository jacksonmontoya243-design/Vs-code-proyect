package com.example.controlasistenciabackend.controller;

import com.example.controlasistenciabackend.dto.LoginRequest;
import com.example.controlasistenciabackend.dto.LoginResponse;
import com.example.controlasistenciabackend.entity.Usuario;
import com.example.controlasistenciabackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            authService.registrarUsuario(usuario);
            return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Error al registrar: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.validarLogin(loginRequest.getUsername(), loginRequest.getPassword());

        if (token != null) {
            return ResponseEntity.ok(new LoginResponse(token, loginRequest.getUsername(), "Login exitoso"));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas"));
        }
    }
}
