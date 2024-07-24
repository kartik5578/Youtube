import React from 'react';
import Image from '../assets/Monkey-mage.png';

const Profile = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <div className='prof-pic w-40'>
        <img src={Image} alt='prof-img'className=''/>
      </div>
      <div className="prof-info text-start mt-5 text-white space-y-5">
          <div className="text-xl font-semibold">NAME: <span className='font-thin'> Entertainment</span></div>
          <div className="text-xl font-semibold">CHANNEL ID: <span className='font-thin'> Entertainment</span></div>
          <div className="text-xl font-semibold">NICHE: <span className='font-thin'> Entertainment</span></div>
          <div className="text-xl font-semibold">DESCRIPTION: <span className='font-thin'> Entertainment</span></div>
        </div>
        <button className="mt-4 bg-transparent border border-custom-bg text-white hover:bg-green-500">
          OPEN
        </button>
    </div>
  )
}

export default Profile
