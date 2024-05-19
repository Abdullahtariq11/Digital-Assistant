import React, { useState } from "react";
import Topbar from "./Topbar";
import ProjectOverview from "./ProjectOverview";
import "./MainComponent.css";
import Introductory from "./Introductory";
import ProjectCreateModal from "../Components/ProjectCreateModal";

function MainComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="main-component">
     
      <div className="main-content">
        <div className="left-column">
          <div className="intro">
            <Introductory />
          </div>
          <button className="open-modal-button" onClick={handleShow}>
            Create Project
          </button>
        </div>
        <div className="overview">
          <ProjectOverview />
        </div>
      </div>
      <ProjectCreateModal show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default MainComponent;
