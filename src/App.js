import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import { GREEN_ENERGY_CONTRACT_ADDRESS, GREEN_ENERGY_TOKEN_ABI } from "./contractAbis/greenEnergy";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Compensate from "./components/compensate/Compensate";
import { AuthProvider } from './components/header/AuthContext';
import Profile from './Profile';
import VerifyEmail from './VerifyEmail';
import Login from './Login';
import Register from './Register';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MainPage from "./mainPage";

function App() {
  const [instance, setInstance] = useState();
  const [web3Instance, setWeb3Instance] = useState();
  const [account, setAccount] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const createInstance = async () => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (accounts) => {
            setAccount(accounts[0]);

            const web3 = new Web3(window.ethereum);
            setWeb3Instance(web3);

            window.ethereum.on("accountsChanged", (accounts) =>
              setAccount(accounts[0] || '')
            );

            const getInstance = new web3.eth.Contract(
              GREEN_ENERGY_TOKEN_ABI,
              GREEN_ENERGY_CONTRACT_ADDRESS
            );
            setInstance(getInstance);
          })
          .catch(console.error);
      }
    };

    createInstance();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        {instance && <Header instance={instance} account={account} />}
        <div className="container">
          {instance && (
            <Switch>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/verify-email" component={VerifyEmail} />
                <Route exact path="/profile" component={Profile} currentUser={currentUser} />
                <Route path="/buyGet" render={() => <BuyGet instance={instance} web3={web3Instance} account={account} />} exact />
                <Route path="/compensate" render={() => <Compensate instance={instance} account={account} web3={web3Instance} />} />
              </Switch>
            </Switch>
          )}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
