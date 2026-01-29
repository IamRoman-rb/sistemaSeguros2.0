import { Router } from "express";
import {
  getMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
} from "../controllers/marca.controller.js";
import {
  marcaCreateValidation,
  marcaUpdateValidation,
  marcaDeleteValidation,
} from "../validations/marca.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getMarcas);
router.post("/", [marcaCreateValidation, validate], createMarca);
router.put("/", [marcaUpdateValidation, validate], updateMarca);
router.delete("/", [marcaDeleteValidation, validate], deleteMarca);
export default router;
