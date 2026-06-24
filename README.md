# 🚀 Sistema Inteligente de Control de Asistencia

---

## 📋 Descripción del Proyecto

El **Sistema Inteligente de Control de Asistencia** es una aplicación web desarrollada para optimizar el registro y seguimiento de entradas y salidas del personal dentro de una organización.

La solución permite gestionar la información de los empleados mediante operaciones **CRUD** y automatizar el control de asistencia mediante la generación de **códigos QR individuales**, empleando una arquitectura **Full-Stack moderna** que separa la lógica del backend del cliente web.

---

## 🎯 Objetivo

Desarrollar un sistema que permita administrar la información de los empleados y apoyar el proceso de control de asistencia mediante tecnologías modernas de desarrollo de software, garantizando:

* Escalabilidad
* Seguridad
* Facilidad de mantenimiento
* Experiencia de usuario dinámica

---

## 🛠️ Tecnologías Utilizadas

### Backend

| Tecnología             | Uso                       |
| ---------------------- | ------------------------- |
| Java 17                | Lenguaje principal        |
| Spring Boot            | Desarrollo de API REST    |
| Spring Data JPA / JDBC | Persistencia de datos     |
| Maven                  | Gestión de dependencias   |
| Spring Security        | Seguridad y autenticación |
| MySQL                  | Base de datos             |

### Frontend

| Tecnología       | Uso                 |
| ---------------- | ------------------- |
| React (Vite)     | Interfaz de usuario |
| Axios            | Consumo de API REST |
| React Router DOM | Navegación          |
| CSS3             | Diseño responsivo   |

### Herramientas Complementarias

* Git
* GitHub
* ZXing (Zebra Crossing) para generación de códigos QR

---

## 💡 Funcionalidades Implementadas

### 👨‍💼 Gestión de Empleados

✔ Crear empleados

✔ Consultar empleados

✔ Actualizar información

✔ Eliminar registros

✔ Visualización mediante tablas dinámicas

✔ Consumo de datos mediante Axios

---

### 📱 Gestión de Asistencia

✔ Generación automática de códigos QR

✔ Identificación individual por empleado

✔ Administración centralizada de registros

---

### 📊 Dashboard Dinámico

✔ Estadísticas de empleados

✔ Estadísticas de supervisores

✔ Estadísticas de administradores

✔ Consultas en tiempo real a la base de datos

---

### 🔒 Seguridad

✔ Configuración de autenticación mediante Spring Security

✔ Protección de rutas y recursos

---

## 📂 Estructura del Repositorio

```plaintext
Sistema-Control-Asistencia
│
├── control-asistencia-backend/
│   └── API REST - Spring Boot
│
└── frontend-asistencia/
    └── Aplicación Web - React + Vite
```

---

## 🏗️ Arquitectura Implementada

```text
┌─────────────────┐
│ Frontend React  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ API REST        │
│ Spring Boot     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Service Layer   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Repository Layer│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ MySQL Database  │
└─────────────────┘
```

### Capas del Sistema

**Frontend (SPA - React)**

* Consume la API REST.
* Gestiona el estado de la aplicación.

**API REST (Spring Boot)**

* Expone los endpoints para la comunicación de datos.

**Service Layer**

* Contiene la lógica de negocio.

**Repository Layer**

* Gestiona la persistencia mediante JPA.

**Base de Datos (MySQL)**

* Almacenamiento centralizado de la información.

---

## 🎓 Evidencia Académica

**Proyecto desarrollado como evidencia:**

**GA7-220501096-AA2-EV01**

*Codificación de módulos del software según requerimientos del proyecto.*

### Programa de Formación

**Tecnólogo en Análisis y Desarrollo de Software**

**Servicio Nacional de Aprendizaje (SENA)**

---

## 👨‍💻 Autor

### Jackson Montoya Mercado

**Tecnólogo en Análisis y Desarrollo de Software**

Servicio Nacional de Aprendizaje – SENA

📅 Año: 2026
