import React, { useContext, useState } from 'react';
import "./LoginPage.css";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import AuthContext from '../AuthContext';

function LoginLayout({ setLogin }) {
    const { user, login } = useContext(AuthContext);
    const [tab, setTab] = useState("signup");
    const [message, setMessage] = useState(null);
    const [loginData, setLogindata] = useState({
        username: "",
        password: ""
    });
    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
        name: ""
    });

    const handleTab = () => {
        let tabdata = tab === "login" ? "signup" : "login";
        setTab(tabdata);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if (tab === "login") {
            try {
                const response = await axios.post("http://localhost:5115/User/login", {
                    email: loginData.username,
                    password: loginData.password
                });
                if (response.status === 200) {
                    let data = response.data;
                    setMessage("success");
                    setLogin(true);
                    login(data);
                }
            } catch (error) {
                setMessage("danger");
                setLogin(false);
            }
        } else if (tab === "signup") {
            try {
                const response = await axios.post("http://localhost:5115/User/signup", {
                    name: signupData.name,
                    email: signupData.email,
                    password: signupData.password
                });
                if (response.status === 200) {
                    setMessage("success");
                    setSignupData({
                        email: "",
                        password: "",
                        name: ""
                    });
                }
            } catch (error) {
                setMessage("danger");
            }
        }
    }

    const closeMessage = () => {
        setMessage(null);
    }

    return (
        <div className='loginContainer'>
            <h4>Login to start managing the project.</h4>
            {tab === "login" && <form className='loginForm'>
                <h3 className="nanum-myeongjo-regular">Welcome Back</h3>
                <fieldset>
                    <span className='username'>Username:</span>
                    <input type="email" value={loginData.username} minLength={10} required onChange={(e) => { setLogindata(prevState => ({ ...prevState, username: e.target.value })) }} />
                </fieldset>
                <fieldset>
                    <span className='password'>Password:</span>
                    <input type="password" value={loginData.password} minLength={8} required onChange={(e) => { setLogindata(prevState => ({ ...prevState, password: e.target.value })) }} />
                </fieldset>
                <Button onClick={submitForm} className='button' variant="outline-light">Login</Button>
                <p>Don't have an account? <span className='logTab' onClick={handleTab}>Signup</span></p>
            </form>}
            {tab === "signup" && <form className='loginForm'>
                <h3 className="nanum-myeongjo-regular">Join us today</h3>
                <fieldset>
                    <span className='signupField'>Name:</span>
                    <input type="text" value={signupData.name} minLength={10} required onChange={(e) => { setSignupData(prevState => ({ ...prevState, name: e.target.value })) }} />
                </fieldset>
                <fieldset>
                    <span className='signupField'>Email:</span>
                    <input type="email" value={signupData.email} minLength={10} required onChange={(e) => { setSignupData(prevState => ({ ...prevState, email: e.target.value })) }} />
                </fieldset>
                <fieldset>
                    <span className='signupField'>Password:</span>
                    <input type="password" value={signupData.password} minLength={8} required onChange={(e) => { setSignupData(prevState => ({ ...prevState, password: e.target.value })) }} />
                </fieldset>
                <Button onClick={submitForm} className='button' variant="outline-light">Signup</Button>
                <p>Already have an account? <span className='logTab' onClick={handleTab}>Login</span></p>
            </form>}
            {message && <div className='overlay1'>
                <Alert key={message} variant={message} onClose={closeMessage} dismissible>
                    {tab === "login" ? (message === "success" ? ("Login Successful") : ("Invalid username or password")) : (message === "success" ? ("Signup Successful") : ("Invalid data entry"))}
                </Alert>
            </div>}
        </div>
    );
}

export default LoginLayout;
