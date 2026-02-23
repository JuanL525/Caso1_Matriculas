import express from "express";
/*import checkAuth from "../middleware/checkAuth.js";*/

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
    .post(agregarMatricula)
    .get(obtenerMatriculas);

router
    .route("/:id")
    .get(obtenerMatricula)
    .put(actualizarMatricula)
    .delete(eliminarMatricula)

export default router;
