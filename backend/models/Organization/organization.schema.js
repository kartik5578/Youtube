const { Schema, model, Mongoose } = require("mongoose");
const SCHEMA_DEFINITION_PROPERTY = require('../../constant/schemaConstants')

const  organizationSchema = new Schema({
    organizationId:SCHEMA_DEFINITION_PROPERTY.requiredStringUnique,
    email:SCHEMA_DEFINITION_PROPERTY.requiredStringUnique,
    password:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    walledAddress:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    websiteUrl:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    crontactCount:SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
    contracts:SCHEMA_DEFINITION_PROPERTY.optionalStringArray,
})

const OrganizationModel = model("Organization",organizationSchema)

module.exports ={OrganizationModel}