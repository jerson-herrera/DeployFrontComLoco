import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexto/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import "../css/DashboardAdmin.css"

const DashboardAdmin = () => {
    const { token } = useAuth();
    const [registros, setRegistros] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    // Función para obtener los intentos de todos los usuarios con premio
    const obtenerTodosIntentos = async () => {
        try {
            const response = await axios.get('http://localhost:3003/intentos/getTodosIntentosGanadores', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRegistros(response.data);
        } catch (err) {
            console.error('Error al obtener los intentos:', err);
            setError('Error al cargar los registros.');
        }
    };

    useEffect(() => {
        obtenerTodosIntentos(); 
    }, []);

    // Función para manejar la salida
    const handleLogout = () => {
        navigate('/'); // Redirige al login
    };

    return (
        <div>
            <h2>Usuarios ganadores</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Código</th>
                        <th>Premio</th>
                        <th>Nombre </th>
                        <th>Correo </th>
                        <th>Celular </th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, index) => (
                        <tr key={index}>
                            <td>{registro.fecha}</td>
                            <td>{registro.codigo}</td>
                            <td>{registro.premio}</td>
                            <td>{registro.usuario?.Nombre || 'N/A'}</td>
                            <td>{registro.usuario?.Correo || 'N/A'}</td>
                            <td>{registro.usuario?.Celular || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleLogout} className="logout-button">
                Salir
            </button>
        </div>
    );
};

export default DashboardAdmin;
