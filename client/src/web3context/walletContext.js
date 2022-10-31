import React, { useEffect } from "react";

import Web3 from "web3";

const defaultValue = null;
const WalletContext = React.createContext(defaultValue);

const { Provider, Consumer } = WalletContext;

const Web3Provider = ({ children }) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [wallet, setWallet] = React.useState(null);
  const [network_id, setNetwork] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);

  const getUserAddress = async () => {
    //makes a request to connect metamask with a wallet and saves the selected wallet address in state variable
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const accountAddress = accounts[0];
      setWallet(accountAddress);
      console.log("Address: ", accountAddress);
      return accountAddress;
    } catch {
      return null;
    }
  };

  const getMainBalance = async () => {
    //makes a request to get wallet balance
    let address = await getUserAddress();
    let balance = await web3.eth.getBalance(address);
    let mainBalance = web3.utils.fromWei(balance);
    return mainBalance;
  };

  const getNetwork = async () => {
    //makes a request to get network ID
    let chainID;
    chainID = await web3.eth.getChainId();
    return chainID;
  };

  const connect = async () => {
    //init web3

    if (typeof window.web3 !== "undefined" && !web3) {
      setWeb3(new Web3(window.web3.currentProvider));
    }
    const setValues = async () => {
      if (web3) {
        const address = await getUserAddress();
        setIsConnected(address != null);
        const balance = await getMainBalance();
        setBalance(balance);
        const network_id = await getNetwork();
        setNetwork(network_id);
      }
    };
    await setValues();
  };

  return (
    <Provider
      value={{
        wallet,
        network_id,
        balance,
        isConnected,
        connect,
      }}
    >
      {children}
    </Provider>
  );
};

export { Web3Provider, WalletContext };
