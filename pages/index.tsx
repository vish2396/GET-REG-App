import React from "react";
import Head from "next/head";
import { useMetamask } from "../hooks/use-metamask";

const Home = () => {
  const { account, connectToMetamask } = useMetamask();

  const handleConnect = () => {
    connectToMetamask();
  };

  return (
    <div>
      <Head>
        <title>Green Energy Tracker</title>
        <meta name="description" content="Track your green energy usage" />
      </Head>
      {account.length === 0 ? (
        <button onClick={handleConnect}>Connect</button>
      ) : (
        account
      )}
    </div>
  );
};

export default Home;