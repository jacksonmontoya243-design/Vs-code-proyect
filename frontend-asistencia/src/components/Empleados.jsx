import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Empleados.css';

const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        try {
            const respuesta = await axios.get('/api/empleados');
            setEmpleados(respuesta.data);
        } catch (error) {
            console.error('Error al conectar con Spring Boot:', error);
        }
    };

    return (
        <main className="employees-page">
            <header className="employees-header">
                <div>
                    <p className="eyebrow">Talento humano</p>
                    <h1>Gestion de empleados</h1>
                    <p>Consulta la informacion basica del personal registrado.</p>
                </div>
                <Link to="/dashboard" className="back-link">Volver al tablero</Link>
            </header>

            <section className="employees-table-card">
                <div className="table-toolbar">
                    <h2>Listado general</h2>
                    <span>{empleados.length} registros</span>
                </div>

                <div className="table-wrap">
                    <table className="employees-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Documento</th>
                                <th>Cargo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.nombre}</td>
                                    <td>{emp.documento}</td>
                                    <td>{emp.cargo}</td>
                                    <td>
                                        <button 
                                            className="qr-view-btn"
                                            onClick={() => window.open(`/qr/empleado_${emp.id}.png`, '_blank')}
                                        >
                                            Ver QR
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {empleados.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="empty-state">No hay empleados para mostrar.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default Empleados;
