import React from "react";
import { useState } from "react";

function Login({ onUserChange }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const credentials = {
        username: username,
        password: password
    }

    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    function signup(event) {
        event.preventDefault()
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(createdUser => {
            onUserChange(createdUser)
        })
    }

    function login(event) {
        event.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(loggedInUser => {
            onUserChange(loggedInUser)
        })
  }

    
    return (
        <div>
            <h1>Login Page</h1>

        </div>
    )
}

export default Login