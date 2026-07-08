package com.example.controlasistenciabackend.entity;

import jakarta.persistence.*;
import lombok.Data; // Asegúrate de tener Lombok en tu proyecto

/**
 * Entidad Usuario: Representa la tabla de usuarios en la base de datos.
 * Esta clase almacena las credenciales para el proceso de autenticación.
 */
@Entity
@Table(name = "usuarios")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // El nombre de usuario debe ser único para evitar duplicados en el registro
    @Column(unique = true, nullable = false)
    private String username;

    // La contraseña debe ser obligatoria
    @Column(nullable = false)
    private String password;
}