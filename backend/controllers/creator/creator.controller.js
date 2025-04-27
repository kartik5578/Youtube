const { CreatorModel } = require("../../models/Creator/creator.schema");

const getCreatorList = async (req, res) => {
  try {
    let { number } = req.body;
    if (!number) number = 0;
    const pageSize = 10;

    number = parseInt(number) || 0;
    const creators = await CreatorModel.find().skip(number).limit(pageSize);

    res.status(200).json({
      success: true,
      data: creators,
      nextNumber: creators.length === pageSize ? number + pageSize : null,
    });
  } catch(error) {
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
  }catch(error) {
    console.log("Error retreving Creator Infomation:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const addCreator = async (req, res) => {
  const { data } = req.body;
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

module.exports = { getCreatorList, getCreator, addCreator };
