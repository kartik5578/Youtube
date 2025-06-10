const { Schema, model, Mongoose } = require("mongoose");
const SCHEMA_DEFINITION_PROPERTY = require('../../constant/schemaConstants')

const contractSchema = new Schema({
    contractId:SCHEMA_DEFINITION_PROPERTY.requiredStringUnique,
    organizationWalletAddress:SCHEMA_DEFINITION_PROPERTY.requiredString,
    creatorWalletAddress:SCHEMA_DEFINITION_PROPERTY.requiredString,
    organizationId:SCHEMA_DEFINITION_PROPERTY.requiredString,
    creatorId:SCHEMA_DEFINITION_PROPERTY.requiredString,
    videoUrl:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    deposit:SCHEMA_DEFINITION_PROPERTY.requiredNumber,
    startDate:SCHEMA_DEFINITION_PROPERTY.requiredDate,
    duration:SCHEMA_DEFINITION_PROPERTY.requiredDate,
    maxlimit:SCHEMA_DEFINITION_PROPERTY.requiredNumber,
    contractStatus:SCHEMA_DEFINITION_PROPERTY.requiredString
})

const ContractModel = model("contracts",contractSchema)
module.exports = {ContractModel}