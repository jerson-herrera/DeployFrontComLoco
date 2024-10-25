// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexto/AuthContext'; // Asegúrate de que la ruta sea correcta
import "../css/Login.css"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const { login } = useContext(AuthContext); // Usa la función login del contexto
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Maneja el cambio en los campos del formulario
  const handleChangeUsuario = (e) => setUsuario(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/users/loggin', {
        Usuario: usuario,
        Password: password,
      });

      // Almacenar el token en el contexto usando la función login
      login(response.data.token); // Suponiendo que el token está en response.data.token

      // Si la autenticación es exitosa, redirigir a dashboard o página de inicio
      navigate('/dashboard'); // Reemplaza con la ruta deseada
    } catch (error) {
      console.error(error);
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  // Función para manejar registro
  const handleRegister = () => {
    navigate('/register'); // Navega a la ruta de registro
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={handleChangeUsuario}
          className="input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChangePassword}
          className="input"
        />
        {error && <p className="error">{error}</p>}
        <div className="buttons">
          <button type="submit" className="button">
            Entrar
          </button>
          <button type="button" onClick={handleRegister} className="button">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
