import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthValue } from './components/header/AuthContext';
import './forms.css';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setTimeActive } = useAuthValue();
  const {authenticated} = useAuthValue();

  const login = (e) => {
    e.preventDefault();
    setError('');

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setTimeActive(true);
        // Handle successful login
        history.push('/buyGet')
      })
      .catch((err) => setError(err.message));

    setEmail('');
    setPassword('');
  };

  return (
    <div className="center-container">
      <div className="auth">
        <h1>Welcome to the Green Energy Token App!</h1>
        <h2>User Login</h2>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
      {authenticated && (
        <div className="functions">
          <NavLink to="/buyGet" className="btn link" exact activeClassName="link-active">
            Buy GET tokens
          </NavLink>
          <NavLink to="/compensate" className="btn link" activeClassName="link-active">
            Compensate Footprint
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Login;
