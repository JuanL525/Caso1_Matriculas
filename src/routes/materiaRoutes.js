import express from "express";

import {
    agregarMateria,
    obtenerMaterias,
    obtenerMateria,
    actualizarMateria,
    eliminarMateria
} from '../controllers/materiaController.js';

const router = express.Router();

router
    .route("/")
    .post(agregarMateria)
    .get(obtenerMaterias);

router
    .route("/:id")
    .get(obtenerMateria)
    .put(actualizarMateria)
    .delete(eliminarMateria)

export default router;
