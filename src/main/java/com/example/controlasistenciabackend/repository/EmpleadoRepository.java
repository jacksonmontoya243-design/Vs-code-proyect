package com.example.controlasistenciabackend.repository;

import com.example.controlasistenciabackend.entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    // Este método permite filtrar por cargo
    long countByCargo(String cargo);
}