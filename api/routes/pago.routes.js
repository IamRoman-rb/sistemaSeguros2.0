import { Router } from "express";
import {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago,
} from "../controllers/pago.controller.js";
import {
  pagoCreateValidation,
  pagoUpdateValidation,
  pagoDeleteValidation,
} from "../validations/pago.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getPagos);
router.get("/:id", getPagoById);
router.post("/", [pagoCreateValidation, validate], createPago);
router.put("/", [pagoUpdateValidation, validate], updatePago);
router.delete("/", [pagoDeleteValidation, validate], deletePago);

export default router;
