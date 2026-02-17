import express from "express";

import {
    agregarEstudiante,
    obtenerEstudiantes,
    obtenerEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} from '../controllers/estudianteController.js';

const router = express.Router();

router
    .route("/")
    .post(agregarEstudiante)
    .get(obtenerEstudiantes);

router
    .route("/:id")
    .get(obtenerEstudiante)
    .put(actualizarEstudiante)
    .delete(eliminarEstudiante)

export default router;
