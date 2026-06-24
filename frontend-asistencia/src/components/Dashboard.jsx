import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // CORRECCIÓN: Importación necesaria
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        empleados: 0,
        admins: 0,
        supervisores: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/empleados/count-stats');

                // Aquí asignamos el objeto recibido directamente
                // Asegúrate de que las llaves coincidan con las que ves en el console.log
                setStats({
                    empleados: res.data.empleados || 0,
                    admins: res.data.admins || 0,
                    supervisores: res.data.supervisores || 0
                });

            } catch (error) {
                console.error("Error al cargar estadísticas:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="dashboard"> {/* CORRECCIÓN: Contenedor padre obligatorio */}

            {/* SIDEBAR */}
            <div className="sidebar">
                <div className="logo">
                    <i className="fa-solid fa-qrcode"></i>
                    <h2>AsistenciaPro</h2>
                </div>

                <ul>
                    <li>
                        <Link to="/">
                            <i className="fa-solid fa-house"></i> Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/empleados">
                            <i className="fa-solid fa-users"></i> Empleados
                        </Link>
                    </li>
                </ul>

                <button className="logout-btn">
                    <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
                </button>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="main-content">
                <div className="topbar">
                    <div className="hero-banner">
                        <div className="hero-info">
                            <h1>Sistema Inteligente de Control de Asistencia</h1>
                            <p>Administra empleados, registra asistencias mediante QR.</p>
                            <button className="hero-btn"><i className="fa-solid fa-qrcode"></i> Abrir escáner QR</button>
                        </div>
                        <div className="hero-image">
                            <img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" alt="QR" />
                        </div>
                    </div>
                </div>

                {/* TARJETAS DINÁMICAS */}
                <div className="cards">
                    <div className="card blue">
                        <i className="fa-solid fa-users"></i>
                        <h3>Total empleados</h3>
                        <span>{stats.empleados}</span>
                    </div>
                    <div className="card purple">
                        <i className="fa-solid fa-user-shield"></i>
                        <h3>Administradores</h3>
                        <span>{stats.admins}</span>
                    </div>
                    <div className="card green">
                        <i className="fa-solid fa-user-check"></i>
                        <h3>Supervisores</h3>
                        <span>{stats.supervisores}</span>
                    </div>
                </div>
            </div>
        </div> // Cierre del contenedor padre .dashboard
    );
};

export default Dashboard;