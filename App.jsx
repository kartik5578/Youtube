import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './src/Pages/Homepage'
import Footer from './src/components/Footer';
import NavBar from './src/components/Navbar';
import Channels from './src/Pages/Channels';


function App() {

  return (
    
    <BrowserRouter>
    <NavBar />
    <Routes>
     
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/Channels" element={<Channels/>}></Route>
        {/* <Route path="/profile" component={Profile} /> */}
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
