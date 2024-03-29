import React from "react";
import Button from 'react-bootstrap/Button';
import "./Navbar.css";
import { useState } from "react";
import HomeInitial from "./HomeInitial";
import LoginLayout from "../Layouts/LoginLayout";


function Navbar() {
    const [key, setKey] = useState("home");

    return (
        <div className="navbar-class">
            <div className="navbar-container">

                <div className="navLinks">
                    <ul className="navLinks-container">
                        <li data-value={"home"} onClick={(e) => setKey(e.target.dataset.value)}>Home</li>

                    </ul>
                </div>
                <Button value={"button"} onClick={(e) => setKey(e.target.value)} variant="outline-light">Get Started</Button>
            </div>
            {key === "home" &&
                <div>
                    <HomeInitial/>

                </div>
            }
            {key === "button" &&
                <div>
                    <LoginLayout/>
                </div>
            }
        </div>
    )
};
export default Navbar;