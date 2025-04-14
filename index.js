import dotenv from 'dotenv'
import mongoose from 'mongoose';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());

const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

const PORT = 3000;

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    edad:{type: Number, required: true},
    email:{type: String, required: true},
});


const Usuario = new mongoose.model("Usuario", usuarioSchema);

app.get('/usuarios', async (req, res) => {
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios);
    }catch (error){
        res.status(500).json({error: "Get error usuarios"})
    }
});

app.post('/usuarios', async (req, res) =>{
    try{
        const nuevoUsuario = new Usuario(req.body);
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json({usuarioGuardado});
    }catch(error) {
        console.error('Error al guardar el usuario:', error); 
        res.status(400).json({error: "Post err usuarios", details: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
  });