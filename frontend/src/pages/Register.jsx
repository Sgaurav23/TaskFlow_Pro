import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './login.css'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Response data:', res.data);
      localStorage.setItem('token', res.data.token);
      const userRes = await axios.get('http://localhost:5000/api/auth/user', {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });
      console.log('User data:', userRes.data);
      dispatch({ type: 'LOGIN', payload: { token: res.data.token, user: userRes.data } });
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Register;
