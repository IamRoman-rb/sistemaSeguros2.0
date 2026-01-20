import { Router } from "express";
import {
  getMetodos,
  getMetodoById,
  createMetodo,
  updateMetodo,
  deleteMetodo,
} from "../controllers/metodo.controller.js";
const router = Router();
router.get("/", getMetodos);
router.get("/:id", getMetodoById);
router.post("/", createMetodo);
router.put("/", updateMetodo);
router.delete("/", deleteMetodo);
export default router;
