import React from 'react'
import { useState } from 'react';
import auth from '../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const signin =(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
           
        }).catch((error)=>{
            
        });
    }
    return (
        <div className='container'>
            <h2>
                Create Account
            </h2>
            <form onSubmit={signin}>
            <label htmlFor="email">Email</label>
                <input type="email" className='form-control' 
                    required
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' 
                    required
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} />
                <button type='submit'>REGISTER</button>
            </form>
            <span>Don't have an account? Register
                <a href="register"> Here</a>
            </span>
        </div>
    )
}

export default Register