Sistema Inteligente de Control de Asistencia
📋 Descripción del Proyecto
El Sistema Inteligente de Control de Asistencia es una aplicación web integral desarrollada para optimizar el registro y seguimiento de entradas y salidas del personal dentro de una organización.

La solución permite gestionar la información de los empleados mediante operaciones CRUD y automatizar el control de asistencia mediante la generación de códigos QR individuales, empleando una arquitectura Full-Stack moderna que separa la lógica de backend del cliente web.

🎯 Objetivo
Desarrollar un sistema que permita administrar la información de los empleados y apoyar el proceso de control de asistencia mediante tecnologías modernas de desarrollo de software, garantizando escalabilidad y una experiencia de usuario dinámica.

🚀 Tecnologías Utilizadas
Backend
Java 17

Spring Boot

Spring Data JPA / JDBC

Maven

Spring Security

Base de Datos
MySQL

Frontend (Modernizado)
React (Vite)

Axios (para consumo de API REST)

React Router DOM

CSS3 (Diseño responsivo)

Control de Versiones
Git

GitHub

Generación de QR
ZXing (Zebra Crossing)

💡 Funcionalidades Implementadas
Gestión de Empleados
Operaciones CRUD completas (Crear, Consultar, Actualizar y Eliminar).

Visualización mediante tablas dinámicas interactivas con consumo de datos vía axios.

Gestión de Asistencia
Generación automática de códigos QR para cada empleado.

Administración centralizada de registros.

Dashboard Dinámico
Visualización de estadísticas de personal (empleados, supervisores, administradores) mediante consultas en tiempo real a la base de datos.

Seguridad
Configuración de autenticación mediante Spring Security.

📂 Estructura del Repositorio
Plaintext
├── control-asistencia-backend/  # Lógica de servidor y API REST (Java/Spring Boot)
└── frontend-asistencia/         # Interfaz de usuario dinámica (React/Vite)
🏗️ Arquitectura Implementada
El proyecto sigue una arquitectura por capas para garantizar escalabilidad:

Frontend (SPA - React): Consume la API y gestiona el estado de la aplicación.

API REST (Spring Boot): Expone los endpoints para la comunicación de datos.

Service Layer: Contiene la lógica de negocio.

Repository Layer: Gestión de persistencia con JPA.

Base de Datos (MySQL): Almacenamiento centralizado.

🎓 Evidencia Académica
Proyecto desarrollado como evidencia:

GA7-220501096-AA2-EV01 – Codificación de módulos del software según requerimientos del proyecto

Programa de formación:

Tecnólogo en Análisis y Desarrollo de Software (SENA)

👤 Autor
Jackson Montoya Mercado

Tecnólogo en Análisis y Desarrollo de Software

Servicio Nacional de Aprendizaje – SENA

2026