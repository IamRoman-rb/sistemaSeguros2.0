import { Router } from "express";
import {
  getMetodos,
  getMetodoById,
  createMetodo,
  updateMetodo,
  deleteMetodo,
} from "../controllers/metodo.controller.js";
import {
  metodoCreateValidation,
  metodoUpdateValidation,
  metodoDeleteValidation,
} from "../validations/metodo.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getMetodos);
router.get("/:id", getMetodoById);
router.post("/", [metodoCreateValidation, validate], createMetodo);
router.put("/", [metodoUpdateValidation, validate], updateMetodo);
router.delete("/", [metodoDeleteValidation, validate], deleteMetodo);
export default router;
