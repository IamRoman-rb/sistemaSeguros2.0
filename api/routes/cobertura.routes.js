import { Router } from "express";
import {
  getCoberturas,
  getCoberturaId,
  createCobertura,
  getEmpresasByCobertura,
  createCobertura,
  updateCobertura,
  deleteCobertura,
  addCoberturaToEmpresa,
  removeCoberturaFromEmpresa,
  addCoberturaToRiesgo,
  removeCoberturaFromRiesgo,
  addCoberturaToPoliza,
  removeCoberturaFromPoliza,
} from "../controllers/cobertura.controller.js";
import {
  coberturaCreateValidation,
  coberturaUpdateValidation,
  coberturaDeleteValidation,
  coberturaAddEmpresaValidation,
  coberturaRemoveEmpresaValidation,
  coberturaAddRiesgoValidation,
  coberturaRemoveRiesgoValidation,
  coberturaAddPolizaValidation,
  coberturaRemovePolizaValidation,
} from "../validations/cobertura.js";
import { validate } from "../middlewares/validate.js";
const router = Router();

router.get("/", getCoberturas);
router.get("/:id", getCoberturaId);
router.post("/", [coberturaCreateValidation, validate], createCobertura);
router.put("/:id", [coberturaUpdateValidation, validate], updateCobertura);
router.delete("/:id", [coberturaDeleteValidation, validate], deleteCobertura);
router.get("/empresas/:id", getEmpresasByCobertura);
router.post(
  "/empresa/:id",
  [coberturaAddEmpresaValidation, validate],
  addCoberturaToEmpresa,
);
router.delete(
  "/empresa/:id",
  [coberturaRemoveEmpresaValidation, validate],
  removeCoberturaFromEmpresa,
);
router.post(
  "/riesgo/:id",
  [coberturaAddRiesgoValidation, validate],
  addCoberturaToRiesgo,
);
router.delete(
  "/riesgo/:id",
  [coberturaRemoveRiesgoValidation, validate],
  removeCoberturaFromRiesgo,
);
router.post(
  "/poliza/:id",
  [coberturaAddPolizaValidation, validate],
  addCoberturaToPoliza,
);
router.delete(
  "/poliza/:id",
  [coberturaRemovePolizaValidation, validate],
  removeCoberturaFromPoliza,
);

export default router;
