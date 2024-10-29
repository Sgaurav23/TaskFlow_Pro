// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import PrivateRoute from './components/PrivateRoute';

// const App = () => (
//    <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//    </Routes>
// );

// export default App;










import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { io } from 'socket.io-client';

const App = () => {
  const { state } = useContext(UserContext);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('connect', () => {
      console.log('connected to server');
    });
    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={state.token ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;











// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import PrivateRoute from './components/PrivateRoute';

// const App = () => (
//    <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//    </Routes>
// );

// export default App;
