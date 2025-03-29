const { Schema, model } = require("mongoose");
const SCHEMA_DEFINITION_PROPERTY = require('../../constant/schemaConstants')
const creatorSchema = new Schema({
    creatorId:SCHEMA_DEFINITION_PROPERTY.requiredStringUnique,
    name: SCHEMA_DEFINITION_PROPERTY.requiredString,
    username: SCHEMA_DEFINITION_PROPERTY.requiredString,
    email: SCHEMA_DEFINITION_PROPERTY.requiredStringUnique,
    password: SCHEMA_DEFINITION_PROPERTY.requiredString,
    bio: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    profilePicture:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    socialLinks: {
        youtube: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
        instagram:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
        twitter: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
        tiktok: SCHEMA_DEFINITION_PROPERTY.optionalNullString
    },
    contentCategories: SCHEMA_DEFINITION_PROPERTY.requiredString, 
    followersCount: {
        youtube:  SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
        instagram:SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
        twitter:SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
        tiktok:SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
    
    }, 
    verified: SCHEMA_DEFINITION_PROPERTY.optionalBoolean, 
    createdAt: { type: Date, default: Date.now }

})

const CreatorModel = model("Creator",creatorSchema)

module.exports = {CreatorModel}
