import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import "../css/Register.css"

const Register = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [formData, setFormData] = useState({
    Nombre: '',
    FechaNacimiento: '',
    Cedula: '',
    Correo: '',
    Celular: '',
    Ciudad: '',
    Password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData); // Añade esto para depuración
    try {
      const response = await axios.post('http://localhost:3003/users/createUser', formData);
      setSuccess('Registro exitoso!');
      setError(null);
    } catch (err) {
      setError('Error en el registro: ' + (err.response?.data?.message || err.message));
      setSuccess(null);
    }
  };

  const handleBackToLogin = () => {
    navigate('/'); // Redirige a la página de inicio de sesión
  };

  return (
    <div>
      <h2>Página de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="FechaNacimiento"
            value={formData.FechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cédula:</label>
          <input
            type="text"
            name="Cedula"
            value={formData.Cedula}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="Correo"
            value={formData.Correo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Celular:</label>
          <input
            type="text"
            name="Celular"
            value={formData.Celular}
            onChange={handleChange}
            required
            pattern="[0-9]{10}" // Para asegurar que son 10 dígitos
          />
        </div>
        <div>
          <label>Ciudad:</label>
          <input
            type="text"
            name="Ciudad"
            value={formData.Ciudad}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button onClick={handleBackToLogin}>Volver a Login</button> {/* Botón para volver a login */}
    </div>
  );
};

export default Register;

