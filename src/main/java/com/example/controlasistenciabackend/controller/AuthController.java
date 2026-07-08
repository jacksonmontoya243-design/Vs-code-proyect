package com.example.controlasistenciabackend.controller;

import com.example.controlasistenciabackend.entity.Usuario;
import com.example.controlasistenciabackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService; // ¡Ahora está dentro de la clase!

    @PostMapping("/register")
    public ResponseEntity<String> registrar(@RequestBody Usuario usuario) {
        authService.registrarUsuario(usuario);
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        System.out.println("DEBUG: Recibido usuario: " + usuario.getUsername());
        System.out.println("DEBUG: Recibido password: " + usuario.getPassword());

        Usuario authUser = authService.validarLogin(usuario.getUsername(), usuario.getPassword());

        if (authUser != null) {
            return ResponseEntity.ok("Login exitoso");
        } else {
            System.out.println("DEBUG: Validación fallida en la base de datos");
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }
}