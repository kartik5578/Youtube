const express= require('express')
const {generateJwtToken}= require("../../controllers/token.controller")
const router = express.Router()


router.post('/generatetoken',generateJwtToken)

module.exports = router