import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Pages from "./pages"
import "./App.css";
import React from "react";
import LoginForm from "./components/Modal/LoginForm";
// function App() {
//   return (
//     <EthProvider>
//       <div id="App">
//         <div className="container">
//           <Intro />
//           <hr />
//           <Setup />
//           <hr />
//           <Demo />
//           <hr />
//           <Footer />
//         </div>
//       </div>
//     </EthProvider>
//   );
// }
function App(){
  const [isShowLogin, setIsShowLogin] = React.useState(false);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };
  return(
    <>
    <Navbar handleLoginClick={handleLoginClick} />
    <Pages/>
    <LoginForm isShowLogin={isShowLogin} handleClose={()=>setIsShowLogin(false)}/> 
    <Footer/>
    </>
  )
}

export default App;
