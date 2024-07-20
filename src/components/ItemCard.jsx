import React from 'react'
import Image from '../assets/Ellipse 8.png';
// max-w-xs mx-auto
const ItemCard = () => {
  return (
    <div className='w-fit grad h-fit justify-center p-6 border border-custom-bg rounded-lg'>
      <div className="card flex-col space-y-2 bg-transparent">
        <img src={Image} className="card-img-top mx-auto rounded-full w-24 h-24 mb-4" alt="..."/>
        <p className="card-name  text-green-300 bg-transparent"> @Mr.Beast</p>
        <hr className=''/>
        <div className="card-body bg-transparent ">
        <div className='flex flex-col justify-start items-start'>
        <p className="text-green-300">Niche: <span className="text-white ">Entertainment</span></p>
        <p className="text-green-300">Subscribers: <span className="text-white">100,000+</span></p>
        <p className="text-green-300">Average Views: <span className="text-white">3M - 10M</span></p>
        </div>
        {/* <div className="col-md-6">
        </div>
        <div className="col-md-6">
            <label for="inputName" className="form-label text-green-300">Subscribers :</label> Niche
        </div>
        <div className="col-md-6">
            <label for="inputName" className="form-label text-green-300">Average views :</label> Niche
        </div> */}
        {/* <div className='mt-3'>
          <a href="#" className="btn btn-primary border px-6 py-2 border border-custom-bg rounded-lg">OPEN</a>
        </div> */}
        <button className="mt-4 bg-transparent border border-custom-bg text-white hover:bg-green-500">
          OPEN
        </button>
           
        </div>
        
        </div>
    </div>
  )
}

export default ItemCard

