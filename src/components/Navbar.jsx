import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/Youtube.svg';

const NavBar = () => {
  return (
    <nav className="navbar flex justify-between items-center w-full px-4">
      <img src={Image} className='logo w-[168px] '/>
      <div className="space-x-4 text-custom-text font-thin leading-loose">
      {/* <a href="#channels" className="">YouTube Channels</a>
      <a href="#profile" className="">Profile</a> */}
        <Link to="/" className="" as={Link}>Home</Link>
        <Link to="/Channels" className="">YouTube Channels</Link>
        <Link to="/Profile" className="">Profiles</Link>
      </div>
    </nav>
  );
};

export default NavBar;