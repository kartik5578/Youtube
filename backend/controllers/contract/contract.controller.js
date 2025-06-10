const { ContractModel } = require("../../models/Contract/contract.schema");


const addContrat = async (req, res) => {
  try {
    const  data = req.body;
    const user = ContractModel.create(data);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Error Adding Contract:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      error: `Internal Server Error ${error.message}`,
    });
  }
};

const getContract = async (req, res) => {
  try {
    const  data = req.body;
    if(!data){
        res.satus(400).json({
            success:false,
            error:"Search data required"
        })
    }
    if(data.organizationId){
        const contracts = await ContractModel.find(organizationId)
        res.status(200).json({
            success:true,
            data:contracts
        })
    }
    if(data.creatorId){
        const contracts = await ContractModel.find(creatorId)
        res.status(200).json({
            success:true,
            data:contracts
        })
    }
    res.status(400).json({
        success:false,
        error:"Search Field Required either OrganizationId or CreatorId"
    })
  } catch (error) {
    console.log("Error Adding Contract:", error);
    return res.status(500).json({
        success: false,
        error: `Internal Server Error ${error.message}`,
      });
  }
};


const updateContract = async(req,res)=>{
    try {
        const contractId  = req.body.contractId; 
        const updatedData = req.body.updateData; 
    
        const updatedContract = await ContractModel.findOneAndUpdate(
          { contractId },  
          updatedData,    
          { new: true } 
        );
    
 
        if (!updatedContract) {
          return res.status(404).json({
            message: 'Contract not found',
          });
        }

        return res.status(200).json({
          message: 'Contract updated successfully',
          contract: updatedContract,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ 
          message: 'Failed to update contract.',
          error: error.message,
        });
      }
}

module.exports ={addContrat,getContract,updateContract}