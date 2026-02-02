import { Router } from "express";
import {
  getRiesgos,
  getRiesgoId,
  getCoberturasByRiesgo,
  createRiesgo,
  updateRiesgo,
  deleteRiesgo,
  addCoberturaToRiesgo,
  removeCoberturaFromRiesgo,
} from "../controllers/riesgo.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  riesgoCreateValidation,
  riesgoUpdateValidation,
  riesgoDeleteValidation,
  addCoberturaToRiesgoValidation,
  removeCoberturaFromRiesgoValidation,
} from "../validations/riesgo.js";
const router = Router();
router.get("/", getRiesgos);
router.get("/:id", getRiesgoId);
router.get("/coberturas/:id", getCoberturasByRiesgo);
router.post("/", [riesgoCreateValidation, validate], createRiesgo);
router.put("/", [riesgoUpdateValidation, validate], updateRiesgo);
router.delete("/:id", [riesgoDeleteValidation, validate], deleteRiesgo);
router.post(
  "/add/cobertura",
  [addCoberturaToRiesgoValidation, validate],
  addCoberturaToRiesgo,
);
router.delete(
  "/remove/cobertura",
  [removeCoberturaFromRiesgoValidation, validate],
  removeCoberturaFromRiesgo,
);
export default router;
