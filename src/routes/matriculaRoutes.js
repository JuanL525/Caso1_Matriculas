import express from "express";
import checkAuth from "../middleware/checkAuth.js";

import {
    agregarMatricula,
    obtenerMatricula,
    obtenerMatriculas,
    eliminarMatricula,
    actualizarMatricula
} from '../controllers/matriculaController.js';

const router = express.Router();

router
    .route("/")
    .post(checkAuth, agregarMatricula)
    .get(checkAuth, obtenerMatriculas);

router
    .route("/:id")
    .get(checkAuth, obtenerMatricula)
    .put(checkAuth, actualizarMatricula)
    .delete(checkAuth, eliminarMatricula)

export default router;
