import React, { useEffect, useContext, useCallback, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import UserProfile from '../components/UserProfile';
import TaskStats from '../components/TaskStats';
import './Dashboard.css';

const Dashboard = () => {
  const { state, dispatch } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      console.log('Token used for fetching tasks:', state.token);
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      console.log('Fetched tasks:', res.data);
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [state.token]);

  const fetchUserData = useCallback(async () => {
    try {
      const userRes = await axios.get('http://localhost:5000/api/auth/user', {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      console.log('Fetched user data:', userRes.data);
      dispatch({ type: 'LOGIN', payload: { token: state.token, user: userRes.data } });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [state.token, dispatch]);

  useEffect(() => {
    fetchTasks();
    fetchUserData(); // Fetch user data
  }, [fetchTasks, fetchUserData]);

  return (
    <div className="dashboard">
      <h2>Welcome to TaskFlow_Pro</h2>
      <div className="dashboard-sections">
        <div className="tasks">
          <AddTask onTaskAdded={fetchTasks} />
          <TaskList tasks={tasks} fetchTasks={fetchTasks} /> {/* Ensure tasks are correctly passed */}
        </div>
        <div className="profile">
          <UserProfile />
        </div>
        <div className="stats">
          <TaskStats tasks={tasks} /> {/* Pass tasks to TaskStats */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
