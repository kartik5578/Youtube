import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Image from '../assets/Youtube.svg';
import { Button, useToast } from '@chakra-ui/react';

function Navbr() {

    const [account, setAccount] = useState(null);
    const toast = useToast();
  
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);


        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      } else {
        toast({
          title: "MetaMask not detected. Please install MetaMask.",
          position: "top-t",
          isClosable: true,
          duration: 3000,
          status: "warning",
        });
       
      }
    };

  return (
    <nav className="navbr  flex justify-between items-center w-full px-4">
    <img src={Image} alt='Logo' className='w-[168px] py-5'/>
    <div className="navlst space-x-4 text-custom-text font-thin leading-loose">
      <Link to="/home" className="" as={Link}>Home</Link>
      <Link to="/Channels" className="" >YouTube Channels</Link>
      <Link to="/chats" className="">Chat</Link>
      <Link to="/Profile" className="">Profiles</Link>
      <Button color={'white'} backgroundColor={'green'} onClick={connectWallet}>
      {account ? "Connected: " + account.substring(0, 4) + "..." + account.substring(account.length - 4) : "Connect Wallet"}
      </Button>
       
     
    </div>
  </nav>
  )
}

export default Navbr

