const mongoose = require('mongoose');
const User = require('./User');
const Metroflog = require('./Metroflog');

const URL_MONGO = 'mongodb+srv://JesusAlberto:Nadiaamor12@cluster0-saasj.mongodb.net/cinta-roja?retryWrites=true';

mongoose.connect(URL_MONGO,{useNewUrlParser:true},(err)=>{
    if(!err) console.log('Conexión a mongo exitosa');
});

module.exports = {
    User,
    Metroflog
}