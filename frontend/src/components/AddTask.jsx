import React, { useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { UserContext } from '../context/UserContext';
import './AddTask.css';

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { state } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { title, description }, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      console.log('Task added:', res.data);
      onTaskAdded();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className='add-task'>
        <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
    </div>
  );
};

AddTask.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

export default AddTask;
