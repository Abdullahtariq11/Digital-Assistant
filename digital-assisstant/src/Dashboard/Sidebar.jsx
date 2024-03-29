import React from 'react'
import './Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';


function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="sideHeading">
                <h1 className="pacifico-regular side-heading">FocusCraft</h1>
            </div>
            <div className="side-menu">
                <ul>
                    <div className='upper-side'>
                        <li>
                            <DashboardIcon />
                            Dashboard
                        </li>
                        <li>
                            <TaskIcon />
                            Tasks
                        </li>
                        <li>
                            <AssignmentIcon />
                            Projects
                        </li>
                    </div>
                    <div className="bottom-side">
                        <li>
                            <ViewSidebarIcon />
                            Toggle sidebar
                        </li>
                    </div>

                </ul>
            </div>
        </div>
    )
};
export default Sidebar;
