import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';

import usuarioRoutes from './routes/usuarioRoutes.js'
import materiaRoutes from './routes/materiaRoutes.js'
import estudianteRoutes from './routes/estudianteRoutes.js'
import matrciulaRoutes from './routes/matriculaRoutes.js'

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

//Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/matriculas/', matrciulaRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


