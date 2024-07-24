import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './src/Pages/Homepage'
import NavBar from './src/components/Navbar';
import Channels from './src/Pages/Channels';
import Profile from './src/Pages/Profile';


function App() {

  return (
    
    <BrowserRouter>
    <NavBar />
    <Routes>
     
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/Channels" element={<Channels/>}></Route>
        <Route path='/Profile' element={<Profile/>}></Route>
        {/* <Route path="/ProfilePage" element={<ProfilePage/>}></Route> */}
        
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
