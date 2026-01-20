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
const router = Router();

router.get("/", getPolizas);
router.get("/:numero", getPolizaId);
router.get("/cliente/:clienteId", getPolizasByCliente);
router.get("/empleado/:empleadoId", getPolizasByEmpleado);
router.get("/tipo", getTipoPolizas);
router.post("/", createPoliza);
router.put("/", updatePoliza);
router.delete("/", deletePoliza);
router.post("/tipo", createTipoPoliza);
router.put("/tipo", updateTipoPoliza);
router.delete("/tipo", deleteTipoPoliza);
router.post("/cobertura", addCoberturaToPoliza);
router.post("/vehiculo", addVehiculoToPoliza);
router.delete("/cobertura", removeCoberturaFromPoliza);
router.delete("/vehiculo", removeVehiculoFromPoliza);

export default router;
