import React, { useState,dangerouslySetInnerHTML } from 'react';
import Addprod from './addprod';
import styles from './Admin.module.css';

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
    <div >
      <div class={styles.background}>
        <div class={styles.shape}></div>
        <div class={styles.shape}></div>
      </div>

      {formSubmitted ? (
        <Addprod />
      ) : (
        <div>
        <form className={styles.admin} onSubmit={submit}>
          <h3 className={styles.admin}>Login Here</h3>
          <label for="username" className={styles.admin}>username :</label>
          <input
            className={styles.admin}
            type='text'
            placeholder='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor='password' className={styles.admin}>Password</label>
          <input
            className={styles.admin}
            type='password'
            placeholder='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <button type='submit' className={styles.admin}>Log In</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
