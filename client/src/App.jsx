import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Pages from "./pages";
import "./App.css";
import React from "react";
import LoginForm from "./components/Modal/LoginForm";

import { Web3Provider } from "./web3context/walletContext";

function App() {
  const [isShowLogin, setIsShowLogin] = React.useState(false);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  return (
    <Web3Provider>
      <Navbar handleLoginClick={handleLoginClick} />
      <Pages />
      <LoginForm
        isShowLogin={isShowLogin}
        handleClose={() => setIsShowLogin(false)}
      />
      <Footer />
    </Web3Provider>
  );
}

export default App;
