const mongoose = require("mongoose");
const { Types } = mongoose;

const requiredString = {
    type: String,
    required: true,
    
};
const requiredStringUnique = {
    type: String,
    required: true,
    unique:true
};


const requiredStringArray = {
    type: [String],
    required: true
};

const optionalStringArray = {
    type: [String],
    default: []
};

const optionalNullString = {
    type: String,
    default: ""
};

const requiredNumber = {
    type: Number,
    required: true
};

const requiredMap = {
    type: Map,
    of: Number,
    required: true
};

const optionalNullNumber = {
    type: Number,
    default: 0
};

const optionalNullDate = {
    type: Date,
    default: null
};

const requiredDate = {
    type: Date,
    required: true
};

const optionalNullObjectId = {
    type: Types.ObjectId,
    default: null
};

const requiredObjectId = {
    type: Types.ObjectId,
    required: true
};

const optionalBoolean = {
    type: Boolean,
    default: false
};

const requiredBoolean = {
    type: Boolean,
    required: false
};

const optionalNullObject = {
    type: Object,
    default: null
};

const schemaDefinitionProperty = {
    requiredString,
    requiredStringUnique,
    requiredStringArray,
    optionalStringArray,
    optionalBoolean,
    requiredNumber,
    requiredMap,
    optionalNullNumber,
    optionalNullString,
    requiredDate,
    requiredObjectId,
    optionalNullDate,
    optionalNullObjectId,
    requiredBoolean,
    optionalNullObject
};

const SCHEMA_DEFINITION_PROPERTY = schemaDefinitionProperty;
module.exports = SCHEMA_DEFINITION_PROPERTY;
