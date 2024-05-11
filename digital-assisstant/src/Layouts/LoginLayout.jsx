import React, { useState } from 'react'
import "./LoginPage.css"
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

function LoginLayout({setLogin}) {
    const [message, setMessage] = useState(null);
    const [loginData, setLogindata] = useState({
        username: "",
        password: ""
    });
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5115/User/login", {
                email: loginData.username,
                password: loginData.password
            })
            if (response.status === 200) {
                setMessage("success")
                setLogin(true);
            }

        } catch (error) {
            setMessage("danger")
            setLogin(false)
        }
    }
    const closeMessage = () => {
        setMessage(null);
      };
    return (
        <div className='loginContainer'>
            <h4>Login to start managing the project.</h4>
            <form className='loginForm'  >
                <h3 className="nanum-myeongjo-regular">Welcome Back</h3>
                <fieldset>
                    <span className='username'>
                        Username:
                    </span>
                    <input type="text" value={loginData.username} minLength={10} required onChange={(e) => { setLogindata(prevState => ({ ...prevState, username: e.target.value })) }} />
                </fieldset>
                <fieldset>
                    <span className='password'>
                        Password:
                    </span>
                    <input type="password" value={loginData.password} minLength={8} required  onChange={(e) => { setLogindata(prevState => ({ ...prevState, password: e.target.value })) }} />
                </fieldset>
                <Button onClick={submitForm} className='button' variant="outline-light">Login</Button>

            </form>
            {
                message &&
                <div className='overlay'>
                {(
                  <Alert key={message} variant={message} onClose={closeMessage} dismissible>
                    {message === "success" ? ("Login Successful") : ("Invalid username or password")}
                  </Alert>
                )}
              </div>
            }
        </div>
    )
}
export default LoginLayout;
