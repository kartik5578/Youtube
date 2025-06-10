
const axios = require('axios');

const getChannelInfo= async(req,res)=>{
    try{
        const data= req.body
        if(!data.forHandle){
            res.status(400).json({
                success:false,
                errro:"Youtube handle is required"
            })
        }
        const url = `${process.env.YOUTUBE_API_BASE_URL}channels?key=${process.env.YOUTUBE_API_KEY}&part=contentDetails,topicDetails,contentOwnerDetails,statistics,status,brandingSettings,contentDetails,snippet&forHandle=${data.forHandle}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
              },
        }
        const youtubeRes = await axios.get(url) 
        const channelInfo=youtubeRes.data.items[0]

        if(youtubeRes.status==200){
            return res.status(200).json({
                success:true,
                data:{
                    name:channelInfo.snippet.title,
                    description:channelInfo.snippet.description,
                    photo:channelInfo.snippet.thumbnails.medium.url,
                    subscribers:channelInfo.statistics.subscriberCount,
                    avgViews:Math.round(channelInfo.statistics.viewCount/channelInfo.statistics.videoCount),
                    videos:channelInfo.statistics.videoCount
                }
            })
        }
        return res.status(400).json({
            success:true,
            error:"Not received channel details , check channelId or Api key"
   })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:`Internal Server Error, ${error.message}`
        })
    }
}

module.exports={getChannelInfo}