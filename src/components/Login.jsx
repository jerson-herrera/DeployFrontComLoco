import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexto/AuthContext';
import "../css/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext); // Usa la función login del contexto
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegación

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

      const { token, role } = response.data;

      // Almacenar el token usando la función login del contexto
      login(token);

      // Redirige al dashboard correspondiente según el rol
      if (role === 'admin') {
        navigate('/dashboardAdmin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error || 'Error al iniciar sesión. Inténtalo de nuevo.'
      );
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      {/* <h2>Iniciar Sesión</h2> */}
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
