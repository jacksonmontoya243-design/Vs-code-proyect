import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Empleados from './components/Empleados';
import Scanner from './components/Scanner';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/empleados" element={<Empleados />} />
                <Route path="/scanner" element={<Scanner />} />
            </Routes>
        </Router>
    );
}

export default App;