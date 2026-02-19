import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js'
import materiaRoutes from './routes/materiaRoutes.js'
import estudianteRoutes from './routes/estudianteRoutes.js'
import matrciulaRoutes from './routes/matriculaRoutes.js'

const app = express();

const whitelist = [ 'http://127.0.0.1:5501', 'http://localhost:5501', 'http://127.0.0.1:4000', 'http://localhost:4000' ];

const corsOptions = {
    origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error('No permitido por CORS'));
    }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

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


