import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './TaskList.css';
import { UserContext } from '../context/UserContext';

const TaskList = ({ tasks, fetchTasks }) => {
  const [editTask, setEditTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showDescription, setShowDescription] = useState(null);
  const { state } = useContext(UserContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://descriptive-coffee-cardboard.glitch.me/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      fetchTasks();
      setFeedback('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      setFeedback('Error deleting task');
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleToggleDescription = (taskId, e) => {
    if (e.target.tagName !== 'BUTTON') {
      e.preventDefault();
      setShowDescription(showDescription === taskId ? null : taskId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://descriptive-coffee-cardboard.glitch.me/api/tasks/${editTask._id}`, { title, description }, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      fetchTasks();
      setEditTask(null);
      setTitle('');
      setDescription('');
      setFeedback('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      setFeedback('Error updating task');
    }
  };

  const handleMarkCompleted = async (id) => {
    try {
      await axios.put(`https://descriptive-coffee-cardboard.glitch.me/api/tasks/${id}`, { status: 'completed' }, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      fetchTasks(); // Refresh task list
      setFeedback('Task marked as completed');
    } catch (error) {
      console.error('Error marking task as completed:', error);
      setFeedback('Error marking task as completed');
    }
  };

  return (
    <div className="task-list">
      <h3>Task List</h3>
      {feedback && <p className="feedback">{feedback}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task._id} onClick={(e) => handleToggleDescription(task._id, e)}>
            <div>
              {task.title}
              {showDescription === task._id && <p>{task.description}</p>}
            </div>
            <button className="task-button" onClick={() => handleEdit(task)} title="Edit">
              ✏️
            </button>
            <button className="task-button" onClick={() => handleDelete(task._id)} title="Delete">
              🗑️
            </button>
            <button className="task-button" onClick={() => handleMarkCompleted(task._id)} disabled={task.status === 'completed'} title="Mark as Complete">
              {task.status === 'completed' ? '✔️' : '✅'}
            </button>
          </li>
        ))}
      </ul>
      {editTask && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button type="submit">Update Task</button>
        </form>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  fetchTasks: PropTypes.func.isRequired,
};

export default TaskList;
