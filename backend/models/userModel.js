const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name :{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pic:{
        type: String,
        default:"https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=740&t=st=1718537225~exp=1718537825~hmac=84e6865b6173c613533f72428307a67281effeaaa494f8f8796bfd6ae36cb517"
    }
}, {
    timestamps:true,
});

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model( "User", userSchema)

module.exports = User;