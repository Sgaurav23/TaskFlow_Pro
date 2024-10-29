import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskStats = ({ tasks }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: []
    }]
  });

  useEffect(() => {
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = tasks.filter(task => !task.status || task.status === 'pending').length; // Handle missing status

    setChartData({
      labels: ['Completed Tasks', 'Pending Tasks'],
      datasets: [{
        label: 'Tasks',
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#28a745', '#dc3545']
      }]
    });
  }, [tasks]);

  return (
    <div>
      <h3>Task Statistics</h3>
      {chartData.labels.length > 0 && <Bar data={chartData} />}
    </div>
  );
};

TaskStats.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string, // Ensure status is optional but handled
    userId: PropTypes.string.isRequired
  })).isRequired
};

export default TaskStats;
