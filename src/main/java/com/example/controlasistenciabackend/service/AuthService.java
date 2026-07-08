package com.example.controlasistenciabackend.service;

import com.example.controlasistenciabackend.entity.Usuario;
import com.example.controlasistenciabackend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario validarLogin(String username, String password) {
        // Para desarrollo: permitimos el acceso sin validar credenciales
        // Retornamos el usuario 'admin' para que siempre haya un usuario autenticado
        return usuarioRepository.findByUsername("admin").orElse(null);
    }
}