import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import "../css/DashboardAdmin.css";

const DashboardAdmin = () => {
    const [ganadores, setGanadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const fetchGanadores = async () => {
            try {
                const response = await axios.get('http://localhost:3003/codes/getUsersGanadores'); // Ajusta la URL según tu backend
                setGanadores(response.data);
            } catch (error) {
                setError('Error al obtener los ganadores');
            } finally {
                setLoading(false);
            }
        };

        fetchGanadores();
    }, []);

    // Función para manejar la salida
    const handleLogout = () => {
        // Aquí puedes agregar la lógica para limpiar el contexto o el localStorage si es necesario
        navigate('/'); // Redirige a la página de inicio
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Ganadores</h1>
            {ganadores.length === 0 ? (
                <p>No hay ganadores registrados</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Fecha de Uso</th>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Celular</th>
                            <th>Código Ganador</th>
                            <th>Premio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ganadores.map((ganador) => (
                            <tr key={ganador._id}>
                                <td>{new Date(ganador.FechaUso).toLocaleDateString()}</td>
                                <td>{ganador.usuario?.Nombre}</td>
                                <td>{ganador.usuario?.Cedula}</td>
                                <td>{ganador.usuario?.Celular}</td>
                                <td>{ganador.Codigo}</td>
                                <td>{ganador.Premio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={handleLogout} className="logout-button">
                Salir
            </button>
        </div>
    );
};

export default DashboardAdmin;
