import Image from '../assets/Monkey-mage.png';

const HeroSection = () => {
  return (
    <div className='herosec flex justify-between items-center'>
      <div className='text-left text-white max-w-lg'>
        <h1 className='uppercase font-bold'>Find Your 
            <br/>
            <span className='text-custom-green'>Perfect</span>
            <br/>
            Creator
        </h1>
        <p className='font-normal mt-6'>Find  the creators that best suits your company without need to pay
        much with ease of few clicks.</p>
        <button className="mt-4 px-4 py-2 bg-[#02C173] text-white rounded">Explore</button>
      </div>
      <div>
        <img src={Image} alt="Monkey with headphones" className="w-3/5 h-auto rounded-full p-4" />
      </div>
    </div>
  )
}

export default HeroSection
