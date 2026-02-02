import { Router } from "express";
import {
  getPolizas,
  getPolizaId,
  getPolizasByCliente,
  getPolizasByEmpleado,
  getTipoPolizas,
  createPoliza,
  updatePoliza,
  deletePoliza,
  createTipoPoliza,
  updateTipoPoliza,
  deleteTipoPoliza,
  addCoberturaToPoliza,
  addVehiculoToPoliza,
  removeCoberturaFromPoliza,
  removeVehiculoFromPoliza,
} from "../controllers/polizas.controller.js";

import { validate } from "../middlewares/validate.js";
import {
  polizaCreateValidation,
  polizaUpdateValidation,
  polizaDeleteValidation,
  tipoPolizaCreateValidation,
  tipoPolizaUpdateValidation,
  tipoPolizaDeleteValidation,
  polizaVehiculoAddValidation,
  polizaVehiculoRemoveValidation,
} from "../validations/poliza.js";
import {
  coberturaAddPolizaValidation,
  coberturaRemovePolizaValidation,
} from "../validations/cobertura.js";
const router = Router();

router.get("/", getPolizas);
router.get("/:numero", getPolizaId);
router.get("/cliente/:clienteId", getPolizasByCliente);
router.get("/empleado/:empleadoId", getPolizasByEmpleado);
router.get("/tipo", getTipoPolizas);
router.post("/", [polizaCreateValidation, validate], createPoliza);
router.put("/", [polizaUpdateValidation, validate], updatePoliza);
router.delete("/", [polizaDeleteValidation, validate], deletePoliza);
router.post("/tipo", [tipoPolizaCreateValidation, validate], createTipoPoliza);
router.put("/tipo", [tipoPolizaUpdateValidation, validate], updateTipoPoliza);
router.delete(
  "/tipo",
  [tipoPolizaDeleteValidation, validate],
  deleteTipoPoliza,
);
router.post(
  "/cobertura",
  [coberturaAddPolizaValidation, validate],
  addCoberturaToPoliza,
);
router.post(
  "/vehiculo",
  [polizaVehiculoAddValidation, validate],
  addVehiculoToPoliza,
);
router.delete(
  "/cobertura",
  [coberturaRemovePolizaValidation, validate],
  removeCoberturaFromPoliza,
);
router.delete(
  "/vehiculo",
  [polizaVehiculoRemoveValidation, validate],
  removeVehiculoFromPoliza,
);

export default router;
