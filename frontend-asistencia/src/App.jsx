import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Asegúrate de que esta ruta sea correcta
import Empleados from './components/Empleados'; // Asegúrate de que esta ruta sea correcta

function App() {
    return (
        <Router>
            <Routes>
                {/* Aquí definimos que la raíz "/" sea el Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Y "/empleados" sea la lista */}
                <Route path="/empleados" element={<Empleados />} />
            </Routes>
        </Router>
    );
}

export default App;