import "./App.css"
import { Button } from "@chakra-ui/react";
import {Route, Router} from "react-router-dom"
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage"
import Home from "./pages/Home";
import Navbr from "./components/Navbar/Navbr";



function App() {
  return (
    // <Router>
    <div className="App">
        <Navbr/>
       <Route path="/home" exact><Home/></Route>
      <Route path="/" exact><Homepage/></Route>
      <Route path="/chats" exact><ChatPage/></Route>
    </div>
    // </Router>
  );
}

export default App;
