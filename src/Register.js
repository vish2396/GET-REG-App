import { auth } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuthValue } from './components/header/AuthContext';
import './App.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { setTimeActive } = useAuthValue();

  const history = useHistory();

  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false;
        setError('Passwords do not match');
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    setError('');
    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user);
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              history.push('/verify-email');
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => setError(err.message));
      setUsername('');
      setEmail('');
      setFirstname('');
      setLastname('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="center-container">
      <div className="auth">
        <h1>Register</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={register} name="registration_form">
          <input 
            type='text'
            value={username}
            placeholder='Enter your username'
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='text'
            value={firstname}
            placeholder='First name'
            required
            onChange={(e) => setFirstname(e.target.value)}
          />

          <input
            type='text'
            value={lastname}
            placeholder='Last name'
            required
            onChange={(e) => setLastname(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            value={confirmPassword}
            required
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>
        <span>
          Already have an account? <Link to="/login">Login</Link> {/* Link to Login.js */}
        </span>
      </div>
    </div>
  );
}

export default Register;
