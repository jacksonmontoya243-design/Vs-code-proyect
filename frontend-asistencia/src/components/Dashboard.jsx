import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        empleados: 0,
        admins: 0,
        supervisores: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/empleados/count-stats');

                setStats({
                    empleados: res.data.empleados || 0,
                    admins: res.data.admins || 0,
                    supervisores: res.data.supervisores || 0
                });
            } catch (error) {
                console.error('Error al cargar estadisticas:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard-shell">
            <aside className="sidebar">
                <div className="brand">
                    <div className="brand-icon">CA</div>
                    <div>
                        <h2>AsistenciaPro</h2>
                        <span>Panel administrativo</span>
                    </div>
                </div>

                <nav className="side-nav" aria-label="Navegacion principal">
                    <li>
                        <Link to="/dashboard" className="active">
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/empleados">
                            <span>Empleados</span>
                        </Link>
                    </li>
                </nav>

                <button className="logout-btn" onClick={() => navigate('/')}>
                    Cerrar sesion
                </button>
            </aside>

            <main className="main-content">
                <header className="page-header">
                    <div>
                        <p className="eyebrow">Resumen general</p>
                        <h1>Control de asistencia</h1>
                        <p>Monitorea empleados, permisos y accesos desde un tablero claro y centralizado.</p>
                    </div>
                    <button 
                        className="secondary-button"
                        onClick={() => navigate('/scanner')}
                    >
                        Abrir escaner QR
                    </button>
                </header>

                <section className="stats-grid" aria-label="Indicadores principales">
                    <article className="stat-card">
                        <span className="stat-label">Total empleados</span>
                        <strong>{stats.empleados}</strong>
                        <p>Personas registradas en el sistema.</p>
                    </article>
                    <article className="stat-card">
                        <span className="stat-label">Administradores</span>
                        <strong>{stats.admins}</strong>
                        <p>Usuarios con permisos de gestion.</p>
                    </article>
                    <article className="stat-card">
                        <span className="stat-label">Supervisores</span>
                        <strong>{stats.supervisores}</strong>
                        <p>Responsables de seguimiento operativo.</p>
                    </article>
                </section>

                <section className="work-panel">
                    <div>
                        <p className="eyebrow">Proximo modulo</p>
                        <h2>Registro por codigo QR</h2>
                        <p>El espacio queda preparado para activar el escaner y consultar registros recientes sin saturar el tablero.</p>
                    </div>
                    <Link to="/empleados" className="text-link">Ver empleados</Link>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
