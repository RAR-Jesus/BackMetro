const mongoose = require('mongoose');
const metroSchema = new mongoose.Schema({
    usuario:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Usuario'
            }
        ]
    },
    texto: String,
    imagen: String,    
    comentarios:[{
        texto: String,
        usuario:{
            type:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                }
            ]
        }
    }]
},{timestamps: true});

const Metroflog = mongoose.model('Metroflog',metroSchema);
module.exports = Metroflog