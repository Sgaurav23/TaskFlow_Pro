import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './UserProfile.css';

const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${state.user._id}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch({ type: 'LOGOUT' });
      // Redirect to the login page or show a message
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Add a safeguard to ensure user is defined
  if (!state.user) {
    return <p>Loading...</p>; // Or any other loading state you prefer
  }

  return (
    <div className="user-profile">
      <h2>{state.user.name}</h2>
      <p>{state.user.email}</p>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default UserProfile;
