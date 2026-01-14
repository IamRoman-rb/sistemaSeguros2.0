import { Router } from "express";
import {
  getClientes,
  getClienteId,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/cliente.controller.js";
import {
  clienteCreationValidation,
  clienteUpdateValidation,
  clienteDeleteValidation,
} from "../validations/cliente.js";
import { validate } from "../middlewares/validate.js";
const router = Router();

router.get("/", getClientes);
router.get("/:dni", getClienteId);
router.post("/", [clienteCreationValidation, validate], createCliente);
router.put("/", [clienteUpdateValidation, validate], updateCliente);
router.delete("/", [clienteDeleteValidation, validate], deleteCliente);
