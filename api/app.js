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

import empleadoRoutes from "./routes/empleado.routes.js";
app.use("/empleados", empleadoRoutes);

import empresaRoutes from "./routes/empresa.routes.js";
app.use("/empresas", empresaRoutes);

import fotoRoutes from "./routes/foto.routes.js";
app.use("/fotos", fotoRoutes);

import localidadRoutes from "./routes/localidad.routes.js";
app.use("/localidades", localidadRoutes);

import marcaRoutes from "./routes/marca.routes.js";
app.use("/marcas", marcaRoutes);

import metodoRoutes from "./routes/metodo.routes.js";
app.use("/metodos", metodoRoutes);

import movimientoRoutes from "./routes/movimiento.routes.js";
app.use("/movimientos", movimientoRoutes);

import pagoRoutes from "./routes/pago.routes.js";
app.use("/pagos", pagoRoutes);

import polizasRoutes from "./routes/polizas.routes.js";
app.use("/polizas", polizasRoutes);

import provinciaRoutes from "./routes/provincia.routes.js";
app.use("/provincias", provinciaRoutes);

import riesgoRoutes from "./routes/riesgo.routes.js";
app.use("/riesgos", riesgoRoutes);

import rolRoutes from "./routes/rol.routes.js";
app.use("/roles", rolRoutes);

import sucursalRoutes from "./routes/sucursal.routes.js";
app.use("/sucursales", sucursalRoutes);

import vehiculoRoutes from "./routes/vehiculo.routes.js";
app.use("/vehiculos", vehiculoRoutes);
