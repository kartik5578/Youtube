const {
  OrganizationModel,
} = require("../../models/Organization/organization.schema");

const gerOrganizationProfile = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      res.status(400).json({
        success: false,
        error:
          "Not enough information for retreival.OrganizationId or email required",
      });
    }
    if (data.organizationId) {
      const organizationProfile = await OrganizationModel.findOne({
        organizationId,
      });
      if (!organizationProfile) {
        res.status(400).json({
          success: false,
          error: "Invalid OrganizationId",
        });
      }
      res.status(200).json({
        success: false,
        data: organizationProfile,
      });
    }
    if (data.email) {
      const organizationProfile = await OrganizationModel.findOne({ email });
      if (!organizationProfile) {
        res.status(400).json({
          success: false,
          error: "Invalid Organization email",
        });
      }
      res.status(200).json({
        success: false,
        data: organizationProfile,
      });
    }
    res.status(400).json({
      success: false,
      error:
        "Not enough information for retreival.OrganizationId or email required",
    });
  } catch (error) {
    console.log("Error getting Organization Profile :", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const addOrganizationProfile = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !data.organizationId || !data.email) {
      res.status(400).json({
        success: false,
        error: "OrganizationId and email required",
      });
    }
    const organizationProfile = OrganizationModel.create(data);
    if (!organizationProfile) {
      res.status(400).json({
        success: false,
        error: "Failed to create Organization Profile",
      });
    }
    res.status(200).json({
      success: true,
      data: organizationProfile,
    });
  } catch (error) {
    console.log("Error Adding Organization Profile:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const updateOrganizationProfile = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || (!data.organizationId && !data.enail)) {
      res.status(400).json({
        success: false,
        error:
          "Not enough information for Updation.OrganizationId or email required",
      });
    }
    if (data.upateContracts) {
      const organizationId = data.organizationId;
      const newOrganizationProfile = await OrganizationModel.findOneAndUpdate(
        { organizationId },
        { $push: { contracts: data.updateData.contractId } },
        { new: true }
      );
      if (!newOrganizationProfile) {
        res.status(400).json({
          success: false,
          error: "Failed to add contract",
        });
      }
      res.status(200).json({
        success: true,
        data: newOrganizationProfile,
      });
    }
    if (data.organizationId) {
      const organizationId = data.organizationId;
      const newOrganizationProfile = await OrganizationModel.findOneAndUpdate(
        { organizationId },
        { $set: data.updateData },
        { new: true }
      );
      if (!newOrganizationProfile) {
        res.status(400).json({
          success: false,
          error: "Failed to update data check provide correct parameters",
        });
      }
      res.status(200).json({
        success: true,
        data: newOrganizationProfile,
      });
    }
    if (data.email) {
      const email = data.email;
      const newOrganizationProfile = await OrganizationModel.findOneAndUpdate(
        { email },
        { $set: data.updateData },
        { new: true }
      );
      if (!newOrganizationProfile) {
        res.status(400).json({
          success: false,
          error: "Failed to update data check provide correct parameters",
        });
      }
      res.status(200).json({
        success: true,
        data: newOrganizationProfile,
      });
    }
    res.status(400).json({
      success: false,
      error:
        "Not enough information for retreival.OrganizationId or email required",
    });
  } catch (error) {
    console.log("Error Updating Organization Profile:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
