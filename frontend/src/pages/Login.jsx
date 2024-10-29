import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Response data:', res.data);
      dispatch({ type: 'LOGIN', payload: { user: res.data.user, token: res.data.token } });
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="card">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Go to Register</Link>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Login;