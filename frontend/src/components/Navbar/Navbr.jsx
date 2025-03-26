import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../assets/Youtube.svg';

function Navbr() {
  return (
    <nav className="navbr flex justify-between items-center w-full px-4">
    <img src={Image} className='logo w-[168px] '/>
    <div className="navlst space-x-4 text-custom-text font-thin leading-loose">
      <Link to="/home" className="" as={Link}>Home</Link>
      <Link to="/Channels" className="">YouTube Channels</Link>
      <Link to="/chats" className="">Chat</Link>
      <Link to="/Profile" className="">Profiles</Link>
    </div>
  </nav>
  )
}

export default Navbr

