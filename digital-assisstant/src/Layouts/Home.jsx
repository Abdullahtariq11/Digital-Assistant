import React from "react";
import "./Home.css";
import Navbar from "../Components/Navbar";
import FooterHome from "../Components/FooterHome";


function Home({setLogin}) {
  

    return (
        <div className="Home">
            <div className="home-container">
                <div className="half right-side">
                    <h1 className="pacifico-regular">FocusCraft</h1>
                    <p className="nanum-myeongjo-regular">Bringing Your Plans to Life, Effortlessly.</p>
                </div>
                <div className="half left-side"> 
                    <div className="navContained">
                        <Navbar setLogin={setLogin}/> 
                    </div> 
                    <div className="footerContained">
                        <FooterHome/> 
                    </div>
                        
                </div>   
            </div>
        </div>
    );
}

export default Home;
