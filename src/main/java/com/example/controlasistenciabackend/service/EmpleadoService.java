package com.example.controlasistenciabackend.service;

import com.example.controlasistenciabackend.entity.Empleado;
import com.example.controlasistenciabackend.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * SERVICIO: EmpleadoService
 * Capa de lógica de negocio encargada de gestionar los procesos asociados
 * a los empleados (Crear, Leer, Actualizar y Eliminar).
 * * Se conecta directamente con la capa de persistencia (Repository).
 * * @author Jackson Montoya
 * @version 1.0
 */
@Service
public class EmpleadoService {

    /**
     * Inyección de dependencias de la interfaz EmpleadoRepository.
     * Permite acceder a los métodos CRUD preconfigurados por Spring Data JPA.
     */
    @Autowired
    private EmpleadoRepository empleadoRepository;

    /**
     * Recupera la lista completa de empleados registrados en el sistema.
     * * @return List<Empleado> Lista con todos los empleados de la base de datos.
     */
    public List<Empleado> obtenerTodos() {
        // Invoca el método findAll() de JPA para traer todos los registros
        return empleadoRepository.findAll();
    }

    /**
     * Registra un nuevo empleado en el sistema.
     * * @param empleado Objeto con los datos del colaborador a registrar.
     * @return Empleado El objeto guardado con su respectivo ID generado por la BD.
     */
    public Empleado guardarEmpleado(Empleado empleado) {
        // Persiste los datos usando el método save() de JPA
        return empleadoRepository.save(empleado);
    }

    /**
     * Actualiza la información de un empleado existente buscando por su ID.
     * Estándar aplicado: camelCase para los parámetros del método.
     * * @param id Identificador único del empleado a modificar.
     * @param empleadoActualizado Objeto con los nuevos datos a ingresar.
     * @return Empleado El objeto actualizado y guardado; retorna null si el empleado no existe.
     */
    public Empleado actualizarEmpleado(Long id, Empleado empleadoActualizado) {

        // 1. BUSQUEDA: Intentar encontrar al empleado por su ID. Si no existe, retorna null.
        Empleado empleado = empleadoRepository.findById(id).orElse(null);

        // 2. VALIDACIÓN: Si el empleado existe, se modifican sus atributos
        if (empleado != null) {
            empleado.setNombre(empleadoActualizado.getNombre());
            empleado.setDocumento(empleadoActualizado.getDocumento());
            empleado.setCargo(empleadoActualizado.getCargo());

            // 3. PERSISTENCIA: Se guardan los cambios aplicados sobre el mismo registro
            return empleadoRepository.save(empleado);
        }

        // Retorna null en caso de que el ID proporcionado no coincida con ningún registro
        return null;
    }

    /**
     * Elimina un empleado de la base de datos utilizando su identificador.
     * * @param id Identificador único del empleado que se desea remover.
     */
    public void eliminarEmpleado(Long id) {
        // Ejecuta la eliminación física del registro en MySQL a través de JPA
        empleadoRepository.deleteById(id);
    }
}