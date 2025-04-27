const axios = require("axios")
const { asyncHandler } = require("../../Handlers/asyncHandler")

const getVideoStatistics = async (req,res)=>{
    const {data}=req.body
    try{
    if(!data.videoId){
        res.status(400).json({
            success:false,
            error:"VideoId is required"
        })
    }
    const url = `${process.env.YOUTUBE_API_BASE_URL}videos?part=statistics,contentDetails&key=${process.env.YOUTUBE_API_KEY}&id=${data.videoId}`
    //console.log(url);
    const config = {
        headers: {
            'Content-Type': 'application/json',
          },
    }
    const youtubeRes = await axios.get(url) 
   // console.log(youtubeRes);
    if(youtubeRes.status==200){
        return res.status(200).json({
            success:true,
            data:youtubeRes.data
        })
    }
   return res.status(400).json({
            success:true,
            error:"Not received video details , check videoId or Api key"
   })

    }
    catch(error){
        console.log("Error retreving Video details:",error.message)
        return res.status(500).json({
            success:false,
            error:"Internal Server Error"
        })
    }
}

module.exports={getVideoStatistics}