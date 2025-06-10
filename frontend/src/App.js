import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import Navbr from "./components/Navbar/Navbr";
import YoutuberInfo from "./pages/YoutuberInfo";
import ChannelList from "./pages/ChannelList";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./components/Authentication/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbr />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/home" exact component={LandingPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/chats" exact component={ChatPage} />
          <Route path="/channels" exact component={ChannelList} />
          <Route path="/login" exact component={Login} />
          <Route path="/youtuber/:handle" component={YoutuberInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
