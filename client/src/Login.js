import React from "react";
import { useState } from "react";

function Login({ onUserChange }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signupUsername, setSignupUsername] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [signUpForm, setSignUpForm] = useState(false)

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
                    console.log(createdUser)
                    onUserChange(createdUser)
                })
            } else {
                console.log(res)
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
        .then(res => res.json())
        .then(loggedInUser => {
            onUserChange(loggedInUser)
        })
    }

    return (
        <div>
            <div>
                <form onSubmit={login}>
                    <input type="text" id="username" value={username} onChange={onUsernameChange}></input>
                    <label htmlFor="username" >Username</label>
                    <input type="text" id="passowrd" value={password} onChange={onPasswordChange}></input>
                    <label htmlFor="password">Password</label>
                    <button type="submit" className="btn btn-dark" >Login</button>
                </form>
                <button className="btn btn-info" onClick={showSignUpForm}>Signup</button>
            </div>
            <div>
                {signUpForm ? <form onSubmit={signup}>
                    <input type="text" id="createdUsername" value={signupUsername} onChange={onSignupUsernameChange}></input>
                    <label htmlFor="createdUsername" >Your Username</label>
                    <input type="text" id="createdPassword" value={signupPassword} onChange={onSignupPasswordChange}></input>
                    <label htmlFor="createdPassword" >Your Password</label>
                    <button type="submit" className="btn btn-dark">Create Account</button>
                </form> : null}
            </div>
        </div>
    )
}

export default Login