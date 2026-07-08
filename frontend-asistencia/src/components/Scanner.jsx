import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import './Scanner.css';

const Scanner = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        });

        const onScanSuccess = (decodedText) => {
            scanner.clear();
            // El formato esperado es http://.../empleado/{id}
            // Pero para simplificar, si obtenemos una URL, intentamos navegar o procesar el ID
            console.log("QR Scanned:", decodedText);
            
            // Si la URL contiene /empleado/, extraemos el ID para mostrar información si fuera necesario
            // Por ahora, solo simulamos que el registro fue exitoso
            alert("Asistencia registrada para: " + decodedText);
            navigate('/dashboard');
        };

        const onScanFailure = (error) => {
            // console.warn(error);
        };

        scanner.render(onScanSuccess, onScanFailure);

        return () => {
            scanner.clear();
        };
    }, [navigate]);

    return (
        <div className="scanner-container">
            <div className="scanner-card">
                <header className="scanner-header">
                    <button className="back-link" onClick={() => navigate('/dashboard')}>
                        ← Volver al Dashboard
                    </button>
                    <h1>Escanear Código QR</h1>
                    <p>Coloque el código QR del empleado frente a la cámara</p>
                </header>
                
                <div id="reader"></div>
                
                <div className="scanner-footer">
                    <p>Asegúrese de tener buena iluminación</p>
                </div>
            </div>
        </div>
    );
};

export default Scanner;
