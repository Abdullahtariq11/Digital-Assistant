import React, { useContext, useEffect, useState } from 'react';
import './Projects.css';
import { FaTasks, FaHourglassHalf, FaCheckCircle, FaPauseCircle, FaClipboardList } from 'react-icons/fa';
import AuthContext from '../AuthContext';

export default function Projects() {
    const{user}=useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  console.log(user.id);
  const handleChange = (e) => {
    setSelectedProjectId(parseInt(e.target.value));
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map((task) =>
      task.id === parseInt(taskId) ? { ...task, status: status } : task
    );
    setTasks(updatedTasks);
    updateTaskStatus(taskId, status);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5115/UpdateStatus/${selectedProjectId}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStatus),
      });

      if (!response.ok) {
        console.log(taskId + ' ' + selectedProjectId + ' ' + newStatus);
      }

      const responseData = await response.json();
    } catch (error) {
      console.error('Failed to update task status:', error.message);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:5115/Project/GetbyId/${user.id}`);
        const responseData = await response.json();
        const data = responseData['$values'] || [];
        setProjects(data);
      } catch (error) {
        console.log('Failed to fetch projects');
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async (projectId) => {
      if (projectId) {
        try {
          const response = await fetch(`http://localhost:5115/Task/GetbyProjectId/${projectId}`);
          const responseData = await response.json();
          const data = responseData['$values'] || [];
          setTasks(data);
        } catch (error) {
          console.log('Failed to fetch tasks');
        }
      }
    };
    fetchTasks(selectedProjectId);
  }, [selectedProjectId]);

  return (
    <div className="projects-container">
      <div className="project-topbar">
        <div className="selection">
          <label htmlFor="SelectProject">Select Project: </label>
          <select onChange={handleChange} value={selectedProjectId || ''}>
            <option value="">Select a Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="projectBoard">
        {selectedProjectId && (
          <>
            <div
              className="not-started common"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'Not Started')}
            >
              <h4><FaClipboardList /> Not Started</h4>
              {tasks
                .filter((task) => task.status === 'Not Started' || task.status === 'Not started')
                .map((task) => (
                  <div key={task.$id} draggable="true" onDragStart={(e) => handleDragStart(e, task.id)}>
                    <FaTasks /><span>{task.name}</span>
                  </div>
                ))}
            </div>

            <div
              className="in-progress common"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'In Progress')}
            >
              <h4><FaHourglassHalf /> In Progress</h4>
              {tasks.filter((task) => task.status === 'In Progress').map((task) => (
                <div key={task.$id} draggable="true" onDragStart={(e) => handleDragStart(e, task.id)}>
                  <FaTasks /><span>{task.name}</span>
                </div>
              ))}
            </div>

            <div
              className="completed common"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'Completed')}
            >
              <h4><FaCheckCircle /> Completed</h4>
              {tasks.filter((task) => task.status === 'Completed').map((task) => (
                <div key={task.$id} draggable="true" onDragStart={(e) => handleDragStart(e, task.id)}>
                  <FaTasks /><span>{task.name}</span>
                </div>
              ))}
            </div>

            <div
              className="on-hold common"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'On Hold')}
            >
              <h4><FaPauseCircle /> On Hold</h4>
              {tasks.filter((task) => task.status === 'On Hold').map((task) => (
                <div key={task.$id} draggable="true" onDragStart={(e) => handleDragStart(e, task.id)}>
                  <FaTasks /><span>{task.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
