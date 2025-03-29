const {generateToken}= require("../utils/jwtUtils")
const generateJwtToken= async(req,res)=>{
    try{
        const {data}=req.body
        const token = generateToken({ userId: data.creatorId, email: data.email });
        if(token){
            return res.status(200).json({
                success:true,
                token:token
            })
        }
        res.status(400).json({
            success:false,
            error:"Error in token generation"
        })
    }
    catch(error){
        console.log("Error generating token :",error);
        res.status(500).json({
            success:false,
            error:"Internal server error"
        })
    }
}

module.exports = {generateJwtToken}