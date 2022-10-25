import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";

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
  function Home(){
    return (
      <div>
        <h3>Home</h3>
        <div>
        <h1>HomePage for our App</h1>  
        </div>
      </div>
    )
  }

  function Projects(){
    return (
      <div>
        <h3>Projects</h3>
        <div>
        <h1>Projects for our App</h1>  
        </div>
      </div>
    )
  }
  function AboutUs(){
    return (
      <div>
        <h3>Projects</h3>
        <div>
        <h1>Projects for our App</h1>  
        </div>
      </div>
    )
  }
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/Projects' component={Projects} />
        <Route path='/AboutUs' component={AboutUs} />
      </Routes>
    </Router>
  )
}

export default App;
