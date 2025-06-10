const axios = require('axios');
const   getPlaylits= async(req,res)=>{
    try{
        const data= req.body
        if(!data.channelId){
            res.status(400).json({
                success:false,
                errro:"channelId is required"
            })
        }
        const url = `${process.env.YOUTUBE_API_BASE_URL}playlists?key=${process.env.YOUTUBE_API_KEY}&part=contentDetails,id,localizations,player,snippet,status&channelId=${data.channelId}&maxResults=50`
        if(data.pageToken){
            url+=`&pageToken=${data.pageToken}`
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
              },
        }
        const youtubeRes = await axios.get(url) 
        if(youtubeRes.status==200 && (youtubeRes.data.pageInfo.totalResults>0)){
            return res.status(200).json({
                success:true,
                data:youtubeRes.data
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

const getPlayListItems=async(req,res)=>{
    try{
        const data= req.body
        if(!data.playlistId){
            res.status(400).json({
                success:false,
                errro:"Youtube handle is required"
            })
        }  
        const url = `${process.env.YOUTUBE_API_BASE_URL}playlistItems?key=${process.env.YOUTUBE_API_KEY}&part=contentDetails,topicDetails,contentOwnerDetails,statistics,status,brandingSettings,contentDetails&forHandle=${data.forHandle}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
              },
        }
        const youtubeRes = await axios.get(url) 
        if(youtubeRes.status==200){
            return res.status(200).json({
                success:true,
                data:youtubeRes.data
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

module.exports={getPlayListItems,getPlaylits}