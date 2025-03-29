import { ethers } from "ethers";
import abi from "./abi.json"; // Save your ABI in an external JSON file
import Bytecode from "./bytecode.json"; // Save bytecode from Remix or Hardhat

const CONTRACT_ABI = abi;
const CONTRACT_BYTECODE = Bytecode.bytecode;

export const deployContract = async (youtuber, videoLink, pricePerThousandViews, duration, deposit) => {
    try {

        if (!window.ethereum) {
            alert("MetaMask not found. Please install it.");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE, signer);
       const priceInWei = ethers.parseEther(pricePerThousandViews.toString()); // Convert ETH to Wei
    //    const priceInWei = pricePerThousandViews.toString();
        
        const contract = await factory.deploy(youtuber, videoLink, priceInWei, duration, { value: ethers.parseEther(deposit.toString()) });
        await contract.waitForDeployment();
        
        const deployedAddress = await contract.getAddress();
        return deployedAddress;
    } catch (error) {
        console.error("Deployment error:", error);
        alert("Contract deployment failed.");
    }
};
