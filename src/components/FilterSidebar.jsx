import { FaSearch } from 'react-icons/fa'; 
import React from 'react';

const FilterSidebar = () => {
  return (
    <div className=" text-white w-full rounded-lg spsce-y-2">
      <div className="mb-4 flex items-center text-white space-x-3 border border-cyan-400 rounded-lg p-1">
      <FaSearch className="ml-2" />
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded bg-transparent placeholder-gray-400"
        />
      </div>
      
      <div className="mb-4 mt-2">
        <h3 className="mb-2 font-semibold  text-left">Niche</h3>
        <div className="flex flex-wrap gap-2">
          {['Education', 'Entertainment', 'Gaming', 'Infotainment', 'Travel', 'Tech', 'Sports', 'News', 'Fashion & Beauty', 'Music'].map(niche => (
            <button
              key={niche}
              className="px-3 py-1 bg-transparent border border-custom-bg rounded-full hover:bg-green-700 "
            >
              {niche}
            </button>
          ))}
        </div>
      </div>
      <hr/>
      <div className="mb-4 mt-2">
        <h3 className="mb-3 font-semibold text-left">Subscribers</h3>
        <div className="flex flex-wrap gap-2">
          {['< 5K', '5K - 10K', '10K - 25K', '25K - 50K', '50K - 100K', '100K - 200K', '200K - 500K', '500K - 1M', '1M - 2M', '2M - 5M', '5M - 10M', '> 10M'].map(subs => (
            <button
              key={subs}
              className="px-3 py-1 bg-transparent border border-custom-bg rounded-full hover:bg-green-700"
            >
              {subs}
            </button>
          ))}
        </div>
      </div>
      <hr className='bg-gray-500'/>
      <div className="mb-4 mt-2">
        <h3 className="mb-3 font-semibold text-left">Average Views</h3>
        <div className="flex flex-col justify-center items-start">
        <span className="ml-2 mb-2">1K - 10M+</span>
          <input type="range" min="1" max="10" className="w-full h-1 bg-green-400" />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
