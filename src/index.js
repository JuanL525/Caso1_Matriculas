import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js'
import materiaRoutes from './routes/materiaRoutes.js'
import estudianteRoutes from './routes/estudianteRoutes.js'
import matrciulaRoutes from './routes/matriculaRoutes.js'

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  credentials: false
}));

app.options('*', cors());

app.use(express.json());

conectarDB();

app.get('/', (req, res) => {
    res.send('Bienvenido a la API del Sistema de Matrículas');
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/matriculas/', matrciulaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});