package com.example.controlasistenciabackend.controller;

import com.example.controlasistenciabackend.entity.Empleado;
import com.example.controlasistenciabackend.repository.EmpleadoRepository;
import com.example.controlasistenciabackend.service.qrgeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "http://localhost:5173")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository repository;

    @Autowired
    private qrgeneratorService qrGeneratorService;

    @GetMapping
    public List<Empleado> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Empleado guardar(@RequestBody Empleado empleado) {
        Empleado nuevoEmpleado = repository.save(empleado);
        String datosQR = "http://192.168.1.6:8080/empleado/" + nuevoEmpleado.getId();
        qrGeneratorService.generarQR(datosQR, "empleado_" + nuevoEmpleado.getId());
        return nuevoEmpleado;
    }

    @PutMapping("/{id}")
    public Empleado actualizar(@PathVariable Long id, @RequestBody Empleado empleado) {
        return repository.findById(id).map(existente -> {
            existente.setNombre(empleado.getNombre());
            existente.setDocumento(empleado.getDocumento());
            existente.setCargo(empleado.getCargo());
            return repository.save(existente);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repository.deleteById(id);
    }
    @GetMapping("/count")
    public long obtenerTotalEmpleados() {
        return repository.count();
    }
    @GetMapping("/count-stats")
    public Map<String, Long> obtenerEstadisticas() {
        Map<String, Long> stats = new HashMap<>();
        // Cambia los textos de abajo según lo que tengas en tu BD
        stats.put("empleados", repository.countByCargo("Empleado"));
        stats.put("admins", repository.countByCargo("Administrador"));
        stats.put("supervisores", repository.countByCargo("Supervisor"));
        return stats;
    }
}