import { Router } from "express";
import {
  getRoles,
  getRolId,
  createRol,
  updateRol,
  deleteRol,
} from "../controllers/rol.controller.js";
const router = Router();
router.get("/", getRoles);
router.get("/:id", getRolId);
router.post("/", createRol);
router.put("/", updateRol);
router.delete("/", deleteRol);

export default router;
