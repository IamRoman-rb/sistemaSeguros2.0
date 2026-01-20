import { Router } from "express";
import {
  getLocalidades,
  createLocalidad,
  updateLocalidad,
  deleteLocalidad,
} from "../controllers/localidad.controller.js";
const router = Router();
router.get("/", getLocalidades);
router.post("/", createLocalidad);
router.put("/", updateLocalidad);
router.delete("/", deleteLocalidad);
export default router;
