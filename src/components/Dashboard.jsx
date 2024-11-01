import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [codigo, setCodigo] = useState('');
    const [registros, setRegistros] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Función para obtener los intentos del usuario con premio
    const obtenerIntentos = async () => {
        try {
            const response = await axios.get('http://localhost:3003/intentos/getIntentosGanadores', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Filtrar registros donde el premio no sea null o vacío
            const registrosFiltrados = response.data.filter(registro => registro.premio);
            setRegistros(registrosFiltrados);
        } catch (err) {
            console.error('Error al obtener los intentos:', err);
            setError('Error al cargar los registros.');
        }
    };

    useEffect(() => {
        obtenerIntentos(); // Llama a la función al cargar el componente
    }, []);

    const handleCodigoChange = (e) => {
        const { value } = e.target;
        if (/^\d{0,4}$/.test(value)) {
            setCodigo(value);
        }
    };

    const handleRegistrarCodigo = async () => {
        const codigoNum = parseInt(codigo, 10);

        if (codigoNum < 1 || codigoNum > 1000) {
            setError('El código debe estar entre 0001 y 1000');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3003/intentos/createIntento',
                { codigo },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const premio = response.data.premio;
            const mensaje = response.data.mensaje;

            const nuevoRegistro = {
                fecha: new Date().toLocaleString(),
                codigo: response.data.nuevoIntento.codigo,
                premio: premio || 'Sin premio',
            };

            // Actualiza el mensaje de éxito según el premio
            setSuccess(mensaje);

            // Agrega el registro solo si tiene premio
            if (premio) {
                setRegistros(prev => [...prev, nuevoRegistro]);
            }

            setError(null);
            setCodigo('');
        } catch (err) {
            console.error(err);
            setError('Error al registrar el código: ' + (err.response?.data?.error || err.message));
            setSuccess(null);
        }
    };

    const handleSalir = () => {
        navigate('/'); // Redirige al login
    };

    return (
        <div>
            <h2>Registrar Código</h2>
            <div>
                <input
                    type="text"
                    value={codigo}
                    onChange={handleCodigoChange}
                    placeholder="Código (0001 - 1000)"
                    maxLength={4}
                />
                <button onClick={handleRegistrarCodigo}>Registrar</button>
                <button onClick={handleSalir}>Salir</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <h3>Registro de tus códigos con premio</h3>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Código</th>
                        <th>Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, index) => (
                        <tr key={index}>
                            <td>{registro.fecha}</td>
                            <td>{registro.codigo}</td>
                            <td>{registro.premio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
