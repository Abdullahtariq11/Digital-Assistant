import React from 'react';
import './ProjectCreateModal.css';
import ProjectCreate from '../Components/ProjectCreate';

export default function ProjectCreateModal({ show, handleClose }) {
  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button-modal" onClick={handleClose}>X</button>
        <ProjectCreate />
      </div>
    </div>
  );
}
