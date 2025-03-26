const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();
console.log(process.env.MONGOURI)
const uri = process.env.MONGOURI;

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Mongoose Connected: ' + conn.connection.host);
    } catch(err){
        console.log(`Error: ${err.message}`)
        process.exit()
    }
};

module.exports = connectDB;
