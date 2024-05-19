import React, { useContext, useState } from 'react'
import './Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../AuthContext';


function Sidebar(props) {
    const{logout}=useContext(AuthContext);
    const [isOpen,setIsOpen]=useState(true);
    const toggleSidebar=()=>{setIsOpen(!isOpen)}
    return (
        <div className={`sidebar-container ${isOpen ? '': "close"} `}>
            <div className="side-menu">
                <ul>
                    <div className='upper-side'>
                        <li onClick={()=>{props.selectTab("main")}}>
                            <DashboardIcon />
                            <span className={`${isOpen ? '': "span-hide"}`} >Dashboard</span>
                        </li>
                        <li onClick={()=>{props.selectTab("task")}}> 
                            <TaskIcon />
                            <span className={`${isOpen ? '': "span-hide"}`}>Projects</span>
                        </li>
                        <li onClick={()=>{props.selectTab("project")}}> 
                            <AssignmentIcon />
                            <span className={`${isOpen ? '': "span-hide"}`}>Project Board</span>
                        </li >
                        <li onClick={()=>{
                            props.setLogin(false);
                            logout();
                            }}> 
                            <LogoutIcon />
                            <span className={`${isOpen ? '': "span-hide"}`}>Sign Out</span>
                        </li >
                    </div>
                    <div className="bottom-side">
                        <li onClick={toggleSidebar}>
                            <ViewSidebarIcon />
                            <span className={`${isOpen ? '': "span-hide"}`}>Toggle sidebar</span>
                        </li>
                    </div>

                </ul>
            </div>
        </div>
    )
};
export default Sidebar;
