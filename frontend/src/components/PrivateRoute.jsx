import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
   const { state } = useContext(UserContext);
   return state.user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
