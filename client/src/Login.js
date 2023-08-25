import React, { useState } from "react";
import { useUserContext } from "./UserContext";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signupUsername, setSignupUsername] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [signUpForm, setSignUpForm] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [signUpError, setSignUpError] = useState(false)

    const { setUser } = useUserContext()

    const loginCredentials = {
        username: username,
        password: password
    }

    const signupCredentials = {
        username: signupUsername,
        password: signupPassword
    }

    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    function onSignupUsernameChange(event) {
        setSignupUsername(event.target.value)
    }

    function onSignupPasswordChange(event) {
        setSignupPassword(event.target.value)
    }

    function showSignUpForm() {
        setSignUpForm(!signUpForm)
        setSignUpError(false)
    }

    function signup(event) {
        event.preventDefault()
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupCredentials)
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(createdUser => {
                    setUser(createdUser)
                    setSignUpForm(false)
                })
            } else {
                res.json().then(res => {
                    setSignUpError(res)
                })
            }
        })
    }

    function login(event) {
        event.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(loggedInUser => {
                setUser(loggedInUser)
            })
            } else {
                res.json().then(res => {
                    setLoginError(res)
                })
            }
        })
    }

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card bg-dark">
                <div className="card-body">
                    <h4 className="card-title text-white">Destination Tracker</h4>
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="username" className="text-white">Username</label>
                            <input type="username" className="form-control" id="username" value={username} onChange={onUsernameChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-white">Password</label>
                            <input type="password" className="form-control text-muted" id="passowrd" value={password} onChange={onPasswordChange}></input>
                        </div>
                        <br></br>
                            <button type="submit" className="btn btn-success">Login</button>
                            <br></br>
                            {loginError ? <p key={loginError.error} className="text-danger text-center mt-3">{loginError.error}</p> : null}
                    </form>
                    <div>
                        <div>
                        <button className="btn btn-info" onClick={showSignUpForm}>Signup</button>
                        </div>
                        {signUpForm ? <form onSubmit={signup}>
                            <label htmlFor="createdUsername" className="text-white">Your Username</label>
                            <input type="username" id="createdUsername" className="form-control" value={signupUsername} onChange={onSignupUsernameChange}></input>
                            <label htmlFor="createdPassword" className="text-white">Your Password</label>
                            <input type="password" id="createdPassword" className="form-control text-muted" value={signupPassword} onChange={onSignupPasswordChange}></input>
                            <br></br>
                            <button type="submit" className="btn btn-success">Create Account</button>
                            <br></br>
                            {signUpError ? signUpError.errors.map(message => <p key={message} className="text-danger text-center mt-3">{message}</p>) : null}
                        </form> : null}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login