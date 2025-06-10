const { Schema, model, Mongoose } = require("mongoose");
const SCHEMA_DEFINITION_PROPERTY = require('../../constant/schemaConstants')

const  organizationSchema = new Schema({
    organizationId:SCHEMA_DEFINITION_PROPERTY.requiredStringUnique,
    email:SCHEMA_DEFINITION_PROPERTY.requiredStringUnique,
    name:SCHEMA_DEFINITION_PROPERTY.requiredString,
    password:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    walletAddress:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    websiteUrl:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    contractCount:SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
    contracts:SCHEMA_DEFINITION_PROPERTY.optionalStringArray,
})

const OrganizationModel = model("Organization",organizationSchema)

module.exports ={OrganizationModel}