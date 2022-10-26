import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Pages from "./pages"
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
  return(
    <>
    <Navbar/>
    <Pages/>
    </>
  )
}

export default App;
