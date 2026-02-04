import * as argon2 from "argon2";
import prisma from "../db.js";

/*
model empleado {
  id          Int          @id @default(autoincrement())
  nombre      String
  dni         Int          @unique
  clave       String
  id_sucursal Int
  id_rol      Int
  rol         rol          @relation(fields: [id_rol], references: [id])
  sucursal    sucursal     @relation(fields: [id_sucursal], references: [id])
  movimientos movimiento[]
  actividades actividad[]
  pagos       pago[]
  polizas     poliza[]
}
*/

export const getEmpleados = async (req, res) => {
  try {
    const empleados = await prisma.empleado.findMany();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving empleados" });
  }
};

export const getEmpleadoId = async (req, res) => {
  const { id } = req.params;
  try {
    const empleado = await prisma.empleado.findUnique({
      where: { id: parseInt(id) },
      include: { rol: true, sucursal: true },
    });
    if (!empleado) {
      return res.status(404).json({ error: "Empleado not found" });
    }
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving empleado" });
  }
};

export const createEmpleado = async (req, res) => {
  const { nombre, dni, clave, id_sucursal, id_rol } = req.body;
  let hashClave = await argon2.hash(clave);
  try {
    const newEmpleado = await prisma.empleado.create({
      data: {
        nombre,
        dni,
        clave: hashClave,
        id_sucursal,
        id_rol,
      },
    });
    res.status(201).json(newEmpleado);
  } catch (error) {
    res.status(500).json({ error: "Error creating empleado" });
  }
};

export const updateEmpleado = async (req, res) => {
  const { id, nombre, dni, clave, id_sucursal, id_rol } = req.body;
  const hashClave = await argon2d.hash(clave);
  try {
    const updatedEmpleado = await prisma.empleado.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        dni,
        clave: hashClave,
        id_sucursal,
        id_rol,
      },
    });
    res.json(updatedEmpleado);
  } catch (error) {
    res.status(500).json({ error: "Error updating empleado" });
  }
};
export const deleteEmpleado = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.empleado.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Empleado deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting empleado" });
  }
};

export const validateEmpleado = async (req, res) => {
  const { dni, clave } = req.body;
  try {
    const empleado = await prisma.empleado.findUnique({
      where: { dni: parseInt(dni) },
    });
    if (!empleado) {
      return res.status(401).json({ error: "Invalid DNI" });
    }
    const isValid = await argon2d.verify(empleado.clave, clave);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid clave" });
    }
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error validating empleado" });
  }
};
