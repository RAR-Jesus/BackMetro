const express = require('express');
const {User} = require('./metroflog/index3');
const {Metroflog} = require('./metroflog/index3');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//Ver si el server jala
app.get('/',(req,res)=>{
    console.log("Server on")
    res.send("Conexión exitosa")
})

//nuevo usuario
app.post('/crearUser',(req,res)=>{
    const newUser = User(req.body);
    newUser.save((err,user)=>{
        err ? res.status(400).send(err) : res.status(200).send(newUser)
    })
})
//nueva publicacion
app.post('/crearPost',(req,res)=>{
    const newPost = Metroflog(req.body)
    newPost.save((err,post)=>{
        err ? res.status(400).send(err) : res.status(200).send(newPost)
    });
});
//crear comentario en una publicacion
app.post('/crearComentario/:idPublicacion',(req,res)=>{
    const {idPublicacion} = req.params
    Metroflog.findByIdAndUpdate(idPublicacion,
        {$push:{comentarios:[req.body]}},
        {new:true})
        .exec()
        .then((comentario)=>{
            res.status(200).send(comentario)
        }).catch((err)=>{
            res.status(400).send(err)
        });
});
//Obtener un usuario
app.get('/obtenerUsuario/:idUsuario',(req,res)=>{
    User.findById(req.params.idUsuario)
        .exec()
        .then((user)=>{
            res.status(200).send(user);
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
});
 //Obtener todos los comentarios
 app.get('/obtenerComentarios/:idPublicacion',(req,res)=>{
    Metroflog.findById(req.params.idPublicacion)
    .populate('comentarios.usuario')
    .exec()
    .then((post)=>{
        res.status(200).send(post.comentarios)
        
    }).catch((err)=>{
        res.status(400).send(err)
    })
});
//Obtener todas las publicaciones
app.get('/obtenerPublicaciones',(req,res)=>{
    Metroflog.find()
        .populate('usuario')
        .populate('comentarios.usuario')
        .exec()
        .then((post)=>{
            res.status(200).send(post);
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
});

app.listen(port,()=>{
    console.log(`Server on ${port}`);
});