import React, { useEffect, useState } from 'react';
import './Projects.css';
import data from "../assets/MOCK_DATA.json";

export default function Projects() {
    const [projectsTask, setProjectsTask] = useState([]);
    useEffect(()=>{
        setProjectsTask(data);
        
    },[])

    const [selectedProjectId, setSelectedProjectId] = useState(1);

    const handleChange = (e) => {
        setSelectedProjectId(parseInt(e.target.value));
    }

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, status) => {
        const taskId = e.dataTransfer.getData('taskId');
        const updatedTasks = projectsTask.map(project => {
            if (project.project_id === selectedProjectId) {
                return {
                    ...project,
                    tasks: project.tasks.map(task =>
                        task.id === parseInt(taskId) ? { ...task, status: status } : task
                    )
                };
            }
            return project;
        });
        setProjectsTask(updatedTasks);
    };

    if (!projectsTask || projectsTask.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="projects-container">
            <div className="project-topbar">
                <div className="selection">
                    <label htmlFor="SelectProject">Select Project: </label>
                    <select onChange={handleChange} value={selectedProjectId}>
                        
                        {projectsTask.map((dat) => (
                            <option key={dat.project_id} value={dat.project_id}>{dat.project_name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="projectBoard">
                
                {selectedProjectId && (
                    <>
                        <div
                            className="not-started common"
                            onDragOver={(e) => handleDragOver(e)}
                            onDrop={(e) => handleDrop(e, 'Not Started')}
                        >
                            <h4>Not Started</h4>
                            {projectsTask.find(project => project.project_id === selectedProjectId).tasks
                                .filter((task) => task.status === 'Not Started')
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        draggable="true"
                                        onDragStart={(e) => handleDragStart(e, task.id)}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                        </div>

                        <div
                            className="in-process common"
                            onDragOver={(e) => handleDragOver(e)}
                            onDrop={(e) => handleDrop(e, 'In Progress')}
                        >
                            <h4>In Progress</h4>
                            {projectsTask.find(project => project.project_id === selectedProjectId).tasks
                                .filter((task) => task.status === 'In Progress')
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        draggable="true"
                                        onDragStart={(e) => handleDragStart(e, task.id)}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                        </div>

                        <div
                            className="completed common"
                            onDragOver={(e) => handleDragOver(e)}
                            onDrop={(e) => handleDrop(e, 'Completed')}
                        >
                            <h4>Completed</h4>
                            {projectsTask.find(project => project.project_id === selectedProjectId).tasks
                                .filter((task) => task.status === 'Completed')
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        draggable="true"
                                        onDragStart={(e) => handleDragStart(e, task.id)}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                        </div>

                        <div
                            className="on-hold common"
                            onDragOver={(e) => handleDragOver(e)}
                            onDrop={(e) => handleDrop(e, 'On Hold')}
                        >
                            <h4>On Hold</h4>
                            {projectsTask.find(project => project.project_id === selectedProjectId).tasks
                                .filter((task) => task.status === 'On Hold')
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        draggable="true"
                                        onDragStart={(e) => handleDragStart(e, task.id)}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
