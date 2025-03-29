const {asyncHandler,asyncApiHandler}= require("../asyncHandler")
const {getCreatorList,getCreator,addCreator}= require("../../controllers/creator/creator.controller")

const listAllCreatorshandler= async(req,res)=>{
    return  asyncApiHandler(getCreatorList)
    }
const getSingleCreatorHandler=async(req,res)=>{ await asyncApiHandler(getCreator)}
const addCreatorHandler = async(req,res)=>{await asyncApiHandler(addCreator)}
module.exports = {listAllCreatorshandler,getSingleCreatorHandler,addCreatorHandler}