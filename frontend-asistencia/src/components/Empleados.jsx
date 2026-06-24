import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Empleados.css';

const Empleados = () => {
    // 1. Definimos el estado para almacenar la lista de empleados que viene de la API
    const [empleados, setEmpleados] = useState([]);

    // 2. useEffect ejecuta la carga inicial de datos cuando el componente se monta
    useEffect(() => {
        cargarEmpleados();
    }, []);

    // 3. Función asíncrona que consume el endpoint de nuestro backend en Java
    const cargarEmpleados = async () => {
        try {
            // Realizamos una petición GET al controlador de Spring Boot
            const respuesta = await axios.get('http://localhost:8080/api/empleados');
            // Guardamos los datos recibidos en el estado 'empleados'
            setEmpleados(respuesta.data);
        } catch (error) {
            console.error("Error al conectar con Spring Boot:", error);
        }
    };

    console.log("¿Se está cargando el componente?");

    return (
        <div className="container">
            <h2>Gestión de empleados</h2>
            <table id="tabla-empleados-especifica" className="tabla-empleados">
                <thead>
                <tr>
                    <th>ID</th><th>Nombre</th><th>Documento</th><th>Cargo</th>
                </tr>
                </thead>
                <tbody>
                {/* 4. Mapeamos el arreglo de empleados para crear una fila por cada registro */}
                {empleados.map((emp) => (
                    <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.nombre}</td>
                        <td>{emp.documento}</td>
                        <td>{emp.cargo}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Empleados;