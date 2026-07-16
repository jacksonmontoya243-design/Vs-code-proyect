import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Empleados.css';

const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [nombre, setNombre] = useState('');
    const [documento, setDocumento] = useState('');
    const [cargo, setCargo] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const api = axios.create({
        baseURL: '/api/empleados',
        headers: { Authorization: `Bearer ${token}` }
    });

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        try {
            const res = await api.get('/');
            setEmpleados(res.data);
        } catch (error) {
            console.error('Error al cargar empleados:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datos = { nombre, documento, cargo };
            if (editandoId) {
                await api.put(`/${editandoId}`, datos);
            } else {
                await api.post('/', datos);
            }
            setNombre('');
            setDocumento('');
            setCargo('');
            setEditandoId(null);
            cargarEmpleados();
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    const editar = (emp) => {
        setNombre(emp.nombre);
        setDocumento(emp.documento);
        setCargo(emp.cargo);
        setEditandoId(emp.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar este empleado?')) return;
        try {
            await api.delete(`/${id}`);
            cargarEmpleados();
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    const cancelarEdicion = () => {
        setNombre('');
        setDocumento('');
        setCargo('');
        setEditandoId(null);
    };

    const empleadosFiltrados = empleados.filter(emp =>
        emp.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        emp.documento?.includes(busqueda) ||
        emp.cargo?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="employees-page">
            <header className="employees-header">
                <div>
                    <p className="eyebrow">Talento humano</p>
                    <h1>Gestion de empleados</h1>
                    <p>Administra el personal registrado en el sistema.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Link to="/dashboard" className="back-link">Volver</Link>
                    <button
                        className="back-link"
                        style={{ background: '#b42318' }}
                        onClick={() => { localStorage.clear(); navigate('/'); }}
                    >
                        Salir
                    </button>
                </div>
            </header>

            <section className="employees-table-card" style={{ marginBottom: 24 }}>
                <form onSubmit={handleSubmit} style={{
                    display: 'flex', gap: 12, padding: 24, flexWrap: 'wrap',
                    borderBottom: '1px solid #e4e8ef'
                }}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                        style={{
                            flex: 1, minWidth: 180, padding: '10px 14px',
                            border: '1px solid #d6dee8', borderRadius: 8,
                            fontSize: 14
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Documento"
                        value={documento}
                        onChange={e => setDocumento(e.target.value)}
                        required
                        style={{
                            flex: 1, minWidth: 140, padding: '10px 14px',
                            border: '1px solid #d6dee8', borderRadius: 8,
                            fontSize: 14
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Cargo"
                        value={cargo}
                        onChange={e => setCargo(e.target.value)}
                        required
                        style={{
                            flex: 1, minWidth: 140, padding: '10px 14px',
                            border: '1px solid #d6dee8', borderRadius: 8,
                            fontSize: 14
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px 24px', border: 'none', borderRadius: 8,
                            background: editandoId ? '#f59e0b' : '#123c69',
                            color: '#fff', fontWeight: 700, cursor: 'pointer'
                        }}
                    >
                        {editandoId ? 'Actualizar' : 'Agregar'}
                    </button>
                    {editandoId && (
                        <button
                            type="button"
                            onClick={cancelarEdicion}
                            style={{
                                padding: '10px 24px', border: 'none', borderRadius: 8,
                                background: '#738196', color: '#fff', fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </section>

            <section className="employees-table-card">
                <div className="table-toolbar">
                    <h2>Listado general</h2>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        style={{
                            padding: '8px 14px', border: '1px solid #d6dee8',
                            borderRadius: 8, fontSize: 14, width: 220
                        }}
                    />
                    <span>{empleadosFiltrados.length} registros</span>
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
                            {empleadosFiltrados.map(emp => (
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.nombre}</td>
                                    <td>{emp.documento}</td>
                                    <td>{emp.cargo}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                className="qr-view-btn"
                                                onClick={() => window.open(`/qr/empleado_${emp.id}.png`, '_blank')}
                                            >
                                                QR
                                            </button>
                                            <button
                                                className="qr-view-btn"
                                                style={{ background: '#f59e0b', borderColor: '#f59e0b', color: '#fff' }}
                                                onClick={() => editar(emp)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="qr-view-btn"
                                                style={{ background: '#dc2626', borderColor: '#dc2626', color: '#fff' }}
                                                onClick={() => eliminar(emp.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {empleadosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="empty-state">
                                        No hay empleados para mostrar.
                                    </td>
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
