import "./App.css"
import { Button } from "@chakra-ui/react";
import {Route, Router} from "react-router-dom"
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage"
import Home from "./pages/Home";
import Navbr from "./components/Navbar/Navbr";
import YoutuberInfo from "./pages/YoutuberInfo";



function App() {
  return (
    // <Router>
    <div className="App">
        <Navbr/>
       <Route path="/home" exact><Home/></Route>
      <Route path="/" exact><Homepage/></Route>
      <Route path="/chats" exact><ChatPage/></Route>
      <Route path="/Channels" exact><YoutuberInfo/></Route>
    </div>
    // </Router>
  );
}

export default App;
