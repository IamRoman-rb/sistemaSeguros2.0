import { Router } from "express";
import {
  getMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
} from "../controllers/marca.controller.js";
const router = Router();
router.get("/", getMarcas);
router.post("/", createMarca);
router.put("/", updateMarca);
router.delete("/", deleteMarca);
export default router;
