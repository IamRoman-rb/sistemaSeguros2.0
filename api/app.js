import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
const file = fileURLToPath(import.meta.url);
const dir = join(dirname(file), "uploads");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dir));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

import actividadRoutes from "./routes/actividad.routes.js";
app.use("/actividades", actividadRoutes);

import clienteRoutes from "./routes/cliente.routes.js";
app.use("/clientes", clienteRoutes);

import coberturaRoutes from "./routes/cobertura.routes.js";
app.use("/coberturas", coberturaRoutes);
