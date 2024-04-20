import React, { useState } from 'react';
import './login.css'; // Import the Login component's CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={signin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>
      <span>
        Don't have an account? Register <a href="register">Here</a>
      </span>
    </div>
  );
};

export default Login;
