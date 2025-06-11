const { CreatorModel } = require("../../models/Creator/creator.schema");
const axios = require('axios');

const getCreatorList = async (req, res) => {
  try {
    let { number } = req.body;
    if (!number) number = 0;
    const pageSize = 10;

    number = parseInt(number) || 0;
    const creators = await CreatorModel.find()
      .skip(number)
      .limit(50)
      .select({ handlers: 1 });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const channelInformation = [];
    

for (const channel of creators) {
  const url = `${process.env.YOUTUBE_API_BASE_URL}channels?key=${process.env.YOUTUBE_API_KEY}&part=contentDetails,topicDetails,contentOwnerDetails,statistics,status,brandingSettings,contentDetails,snippet&forHandle=${channel.handlers.youtubehandle}`;

  try {
    const youtubeRes = await axios.get(url);
    const channelInfo = youtubeRes.data.items[0];

    if (youtubeRes.status === 200 && channelInfo) {
      const data = {
        username: channelInfo.snippet.title,
        description: channelInfo.snippet.description,
        photo: channelInfo.snippet.thumbnails.medium.url,
        subscribers: channelInfo.statistics.subscriberCount,
        averageViews: Math.round(channelInfo.statistics.viewCount / channelInfo.statistics.videoCount),
        videos: channelInfo.statistics.videoCount,
        handle:channel.handlers.youtubehandle
      };

      channelInformation.push(data);
    }
  } catch (error) {
    console.error(`Failed to fetch info for ${channel.handlers.youtubehandle}:`, error.message);
    continue;
  }
}

    res.status(200).json({
      success: true,
      data: channelInformation,
      nextNumber: creators.length === pageSize ? number + pageSize : null,
    });
  } catch (error) {
    console.log("Error retreving Creators:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getCreator = async (req, res) => {
  try {
    const { creatorId } = req.params;
    if (!creatorId) {
      return res.status(400).json({
        success: false,
        error: "CreatorID required",
      });
    }
    const creator = await CreatorModel.findOne({ creatorId: creatorId });
    if (!creator) {
      return res.status(400).json({
        success: false,
        error: "Invalid CreatorID",
      });
    }
    return res.status(200).json({
      success: true,
      data: creator,
    });
  } catch (error) {
    console.log("Error retreving Creator Infomation:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const addCreator = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data.creatorId) {
      return res.status(400).json({
        success: false,
        error: "CreatorID required",
      });
    }
    const result = await CreatorModel.create(data);

    if (result._id) {
      console.log("Document inserted successfully with ID:", result.insertedId);
      return res.status(200).json({
        success: true,
        data: result,
      });
    }

    console.log("Document insertion failed.");
    console.log(result);
    return res.status(400).json({
      success: false,
      error: "Document Insertion Failed",
    });
  } catch (error) {
    console.log("Error adding Creator :", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getCreatorUsingHandle = async (req, res) => {
  try {
    const { creatorHandle } = req.params;
    if (!creatorHandle) {
      return res.status(400).json({
        success: false,
        error: "CreatorID required",
      });
    }
    console.log(creatorHandle);
    const url = `${process.env.YOUTUBE_API_BASE_URL}channels?key=${process.env.YOUTUBE_API_KEY}&part=contentDetails,topicDetails,contentOwnerDetails,statistics,status,brandingSettings,contentDetails,snippet&forHandle=${creatorHandle}`;

    let data ={}
    const youtubeRes = await axios.get(url);
    const channelInfo = youtubeRes.data.items[0];

    if (youtubeRes.status === 200 && channelInfo) {
       data = {
        username: channelInfo.snippet.title,
        description: channelInfo.snippet.description,
        photo: channelInfo.snippet.thumbnails.medium.url,
        subscribers: channelInfo.statistics.subscriberCount,
        averageViews: Math.round(channelInfo.statistics.viewCount / channelInfo.statistics.videoCount),
        videos: channelInfo.statistics.videoCount,
        handle:creatorHandle,
        Views:channelInfo.statistics.viewCount
      };

    }
    else{
       throw new Error('Something went wrong fetching channel Info!');
    }
    const videoURl =`https://www.googleapis.com/youtube/v3/playlists?key=${process.env.YOUTUBE_API_KEY}&part=contentDetails,id,localizations,player,snippet,status&channelId=${channelInfo.id}&maxResults=5`
    console.log(videoURl);
    const videoRes = await axios.get(videoURl)
    let VideoData = videoRes.data.items
     if (videoRes.status === 200 && VideoData) {
   VideoData = VideoData.map((Playlist) => Playlist.player.embedHtml);
   data.Video=VideoData
     return res.status(200).json({
      success: true,
      data: data,
    });
  }
  else{
    res.status(404).json({
      success:false,
      error:"Videos Not found"
    })
  }
        
  } catch (error) {
    console.log("Error retreving Creator Infomation:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = { getCreatorList, getCreator, addCreator,getCreatorUsingHandle};