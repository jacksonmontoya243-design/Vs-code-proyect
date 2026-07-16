import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMensaje('');
        setCargando(true);

        try {
            const res = await axios.post('/api/auth/login', {
                username,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);

            navigate('/dashboard');
        } catch (error) {
            setMensaje('Usuario o contrasena incorrectos');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-page">
            <section className="login-panel" aria-label="Inicio de sesion">
                <div className="login-brand">
                    <div className="brand-mark" aria-hidden="true">CA</div>
                    <div>
                        <p className="eyebrow">Control de asistencia</p>
                        <h1>Ingreso seguro</h1>
                    </div>
                </div>

                <p className="login-copy">
                    Accede al panel administrativo para consultar empleados, roles y registros de asistencia.
                </p>

                <form className="login-form" onSubmit={handleLogin}>
                    <label>
                        Usuario
                        <input
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </label>

                    <label>
                        Contrasena
                        <input
                            type="password"
                            placeholder="Ingresa tu contrasena"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </label>

                    {mensaje && <p className="login-message">{mensaje}</p>}

                    <button type="submit" className="primary-button" disabled={cargando}>
                        {cargando ? 'Validando...' : 'Ingresar'}
                    </button>
                </form>
            </section>

            <aside className="login-summary" aria-label="Resumen del sistema">
                <p className="eyebrow">Panel empresarial</p>
                <h2>Gestion centralizada para equipos operativos.</h2>
                <div className="summary-list">
                    <div><span>01</span>Consulta rapida de empleados activos.</div>
                    <div><span>02</span>Seguimiento de roles administrativos.</div>
                    <div><span>03</span>Base preparada para registro por QR.</div>
                </div>
            </aside>
        </div>
    );
};

export default Login;
