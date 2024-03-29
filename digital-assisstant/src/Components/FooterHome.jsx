import React from 'react'
import './FooterHome.css'
import fbicon from '../assets/facebook.png';
import Linkicon from '../assets/linkedin-logo.png';


function FooterHome() {
  return (
    <footer className='footerContainer'>
      <div className="left">
        <span>
          <p>© 2022-2024 Abdullah Tariq. All Rights Reserved.</p>
        </span>
      </div>
      <div className="right">
        <span className="contact">Contact us</span>
        <a href="https://www.linkedin.com/in/abdullah-tariq-499629171/">
          <img src={Linkicon} alt="linkedin icon" className="social-icon" />
        </a>

        <a href="https://www.facebook.com/abdullah.tariq11/">
          <img src={fbicon} alt="facebook icon" className="social-icon" />
        </a>

      </div>
    </footer>
  )
}
export default FooterHome;
