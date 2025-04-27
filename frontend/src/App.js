import "./App.css"
import { Button } from "@chakra-ui/react";
import {Route, Router} from "react-router-dom"
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage"
import Home from "./pages/Home";
import Navbr from "./components/Navbar/Navbr";
import YoutuberInfo from "./pages/YoutuberInfo";
import ChannelList from "./pages/ChannelList";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";



function App() {
  return (
    // <Router>
    <div className="App">
        <Navbr/>
       <Route path="/profile" exact><ProfilePage/></Route>
       <Route path="/home" exact><LandingPage/></Route>
      <Route path="/" exact><Homepage/></Route>
      <Route path="/chats" exact><ChatPage/></Route>
      <Route path="/Channels" exact><ChannelList/></Route>
    </div>
    // </Router>
  );
}

export default App;
