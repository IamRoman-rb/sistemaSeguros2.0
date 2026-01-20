import { Router } from "express";
import {
  getProvincias,
  createProvincia,
  updateProvincia,
  deleteProvincia,
} from "../controllers/provincia.controller.js";
const router = Router();
router.get("/", getProvincias);
router.post("/", createProvincia);
router.put("/", updateProvincia);
router.delete("/", deleteProvincia);

export default router;
