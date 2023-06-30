import React, { useEffect, useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import './header.css';
import { BiWalletAlt } from 'react-icons/bi';
import { AiOutlineFire } from 'react-icons/ai';
import { RiRegisteredFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa'; // Import the user icon from react-icons
import { useAuthValue } from './AuthContext';

const Header = ({ instance, account }) => {
  const [balance, setBalance] = useState(0);
  const [footprint, setFootprint] = useState(0);
  const { currentUser } = useAuthValue();
  const history = useHistory(); // Add useHistory hook

   // Reset balance when currentUser changes
   useEffect(() => {
    setBalance(0);
  }, [currentUser]);

  // Subscribing to updates regarding balance and footprint
  useEffect(() => {
    if (instance !== undefined) {
      updateBalances();
      const interval = setInterval(updateBalances, 2000);
      return () => clearInterval(interval);
    }
  }, [instance]);

  const updateBalances = async () => {
    const _balance = await instance.methods.balanceOf(account).call();
    const _footprint = await instance.methods.getFootPrint(account).call();

    if (_balance !== balance || _footprint !== footprint) {
      setBalance(_balance / 10 ** 18);
      setFootprint(_footprint / 10 ** 18);
    }
  };

  const handleProfileClick = () => {
    history.push('/Profile'); // Redirect to the Profile component
  };

  return (
    <nav>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row header">
          <div>
            <Link
              to="/"
              className="btn register-button"
              style={{ backgroundColor: 'skyblue', color: 'white', textDecoration: 'none' }}
            >
              <RiRegisteredFill style={{ marginRight: '5px' }} /> Home
            </Link>
          </div>
          <NavLink to="/buyGet" className="btn link" exact activeClassName="link-active">
            Buy GET tokens
          </NavLink>
          <NavLink to="/compensate" className="btn link" activeClassName="link-active">
            Compensate Footprint
          </NavLink>
        </div>
        <div className="d-flex flex-row-reverse header">
          <div className="d-flex align-items-center" style={{ fontWeight: '700', marginRight: '20px' }}>
            <span className="balances" style={{ backgroundColor: '#009879', marginRight: '10px' }}>
              <BiWalletAlt /> Balance: {balance} GET
            </span>
            <span className="balances" style={{ backgroundColor: 'tomato', marginRight: '10px' }}>
              <AiOutlineFire /> Footprint: {footprint}
            </span>
            
            <button
                className="btn link"
                onClick={handleProfileClick}
                style={{ backgroundColor: 'skyblue', color: 'white', marginRight: '10px' }}>
                <FaUser /> {/* Replace the text with the user icon */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
