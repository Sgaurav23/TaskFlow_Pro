import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);
