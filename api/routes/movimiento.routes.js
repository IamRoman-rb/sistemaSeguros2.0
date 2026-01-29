import { Router } from "express";
import {
  getMovimientos,
  getMovimientoById,
  createMovimiento,
  updateMovimiento,
  deleteMovimiento,
} from "../controllers/movimiento.controller.js";
import {
  movimientoCreateValidation,
  movimientoUpdateValidation,
  movimientoDeleteValidation,
} from "../validations/movimiento.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getMovimientos);
router.get("/:id", getMovimientoById);
router.post("/", [movimientoCreateValidation, validate], createMovimiento);
router.put("/", [movimientoUpdateValidation, validate], updateMovimiento);
router.delete("/", [movimientoDeleteValidation, validate], deleteMovimiento);
export default router;
