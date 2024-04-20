import React, { useState } from 'react';
import Addprod from './addprod';


const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (username === 'mina store admin' && password === 'l8S#d2K@X9:9!') {
      setFormSubmitted(true);
    } else {
      setErrorMessage('Invalid username or wrong password. Please try again.');
      setFormSubmitted(false);
    }
  };

  return (
    <div className='admin-form'>
      {formSubmitted ? (
        <Addprod />
      ) : (
        <form onSubmit={submit}>
          <label>username :</label>
          <input
            type='text'
            placeholder='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <button type='submit'>submit</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Admin;
