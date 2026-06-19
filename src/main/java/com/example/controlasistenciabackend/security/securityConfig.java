package com.example.controlasistenciabackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer; // 👈 NUEVO: Importación necesaria para habilitar Basic Auth
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * CONFIGURACIÓN: securityConfig
 * Clase encargada de centralizar las políticas de seguridad web del sistema.
 * Define qué rutas son públicas, cuáles requieren autenticación y gestiona
 * el ciclo de vida del inicio y cierre de sesión de los usuarios.
 * * @author Jackson Montoya
 * @version 1.1
 */
@Configuration
public class securityConfig {

    /**
     * Define el filtro de seguridad principal (SecurityFilterChain) que intercepta
     * y valida cada petición HTTP entrante al servidor.
     * * @param http Objeto que permite configurar la seguridad web mediante expresiones lambda.
     * @return SecurityFilterChain Configuración construida y aplicada.
     * @throws Exception En caso de errores en la configuración de los componentes.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // 1. DESHABILITAR CSRF: Se desactiva la protección Cross-Site Request Forgery
                // para facilitar las pruebas locales y peticiones asíncronas desde el frontend.
                .csrf(csrf -> csrf.disable())

                // 2. CONTROL DE ACCESOS Y PERMISOS (Autorización de rutas)
                .authorizeHttpRequests(auth -> auth
                        // LISTA BLANCA (Rutas públicas): Se permite el libre acceso sin autenticación
                        // al login, estilos, scripts y la carpeta estática de imágenes QR.
                        .requestMatchers(
                                "/login.html",
                                "/login",
                                "/styles.css",
                                "/app.js",
                                "/qr/**" // Requisito vital para que los dispositivos lean los QR generados
                        ).permitAll()

                        // RESTRICCIÓN GENERAL: Cualquier otra petición no especificada arriba
                        // requiere obligatoriamente que el usuario esté autenticado.
                        .anyRequest().authenticated()
                )

                // 3. CONFIGURACIÓN DEL FORMULARIO DE LOGIN CUSTOMIZADO
                .formLogin(login -> login
                        .loginPage("/login.html")              // Define la vista HTML del login
                        .loginProcessingUrl("/login")          // Endpoint interno que procesa las credenciales
                        .defaultSuccessUrl("/dashboard.html", true) // Redirección exitosa tras loguearse
                        .failureUrl("/login.html?error=true")  // Redirección en caso de datos incorrectos
                        .permitAll()                           // Permite que todos accedan al formulario
                )

                // 4. CONFIGURACIÓN DEL CIERRE DE SESIÓN (LOGOUT)
                .logout(logout -> logout
                        .logoutUrl("/logout")                 // Endpoint para gatillar el cierre de sesión
                        .logoutSuccessUrl("/login.html")       // Destino tras cerrar sesión exitosamente
                        .invalidateHttpSession(true)           // Destruye la sesión HTTP del servidor
                        .deleteCookies("JSESSIONID")           // Elimina la cookie de rastreo en el navegador
                        .permitAll()
                )

                // 5. SOPORTE PARA HTTP BASIC AUTH (NUEVO)
                // Vital para que herramientas como Insomnia o Postman puedan enviar las credenciales
                // directamente mediante la pestaña 'Auth' y recibir datos JSON, en lugar de ser redirigidas a la web.
                .httpBasic(Customizer.withDefaults());

        // Retorna e implementa la cadena de filtros configurada
        return http.build();
    }
}