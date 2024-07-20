import React from 'react'
import FilterSidebar from '../components/FilterSidebar'
import ItemCard from '../components/ItemCard'

const Channels = () => {
  return (
    <div className=' w-full  h-fit flex space-x-6 p-10 justify-center '>
        <div className='left-side grad  w-2/5 border border-custom-bg rounded-lg w-1/5 p-4'>
             <div className='p-6'>
             <FilterSidebar />
             </div>
            
        </div>


        <div className='right-side w-4/5  flex flex-wrap justify-center gap-8'>
        
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
        </div>
    </div>

  )
}

export default Channels


