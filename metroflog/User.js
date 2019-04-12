const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    edad: Number,
    sexo: {
        type:String,
        enum: ['M','F']
    },
    email: String,
},{timestamps: true});

const User = mongoose.model('User',userSchema);
module.exports = User