import './profile.css';
import { useAuthValue } from './components/header/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useHistory } from 'react-router-dom';

function Profile() {
  const { currentUser } = useAuthValue();
  const history = useHistory(); // Access the history object

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        history.push('/'); // Redirect to the main page after sign out
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="center-container">
      <div className="profile">
        <h1>Profile</h1>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <p>
          <strong>Email verified: </strong>
          {currentUser?.emailVerified ? 'Yes' : 'No'}
        </p>
        <span onClick={handleSignOut}>Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
