import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
/*
model movimiento {
  id          Int      @id @default(autoincrement())
  es_ingreso  Boolean  @default(true)
  motivo      String
  descripcion String?
  importe     Float
  fecha       DateTime @default(now())
  valido      Boolean  @default(true)
  id_empleado Int
  empleado    empleado @relation(fields: [id_empleado], references: [id])
}

*/

export const getMovimientos = async (req, res) => {
  try {
    const movimientos = await prisma.movimiento.findMany({
      include: { empleado: true },
    });
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving movimientos" });
  }
};

export const getMovimientoById = async (req, res) => {
  const { id } = req.params;
  try {
    const movimiento = await prisma.movimiento.findUnique({
      where: { id: parseInt(id) },
      include: { empleado: true },
    });
    if (!movimiento) {
      return res.status(404).json({ error: "Movimiento not found" });
    }
    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving movimiento" });
  }
};

export const createMovimiento = async (req, res) => {
  const { es_ingreso, motivo, descripcion, importe, id_empleado } = req.body;
  try {
    const newMovimiento = await prisma.movimiento.create({
      data: { es_ingreso, motivo, descripcion, importe, id_empleado },
    });
    res.status(201).json(newMovimiento);
  } catch (error) {
    res.status(500).json({ error: "Error creating movimiento" });
  }
};

export const updateMovimiento = async (req, res) => {
  const { id, es_ingreso, motivo, descripcion, importe, id_empleado } =
    req.body;
  try {
    const updatedMovimiento = await prisma.movimiento.update({
      where: { id: parseInt(id) },
      data: { es_ingreso, motivo, descripcion, importe, id_empleado },
    });
    res.json(updatedMovimiento);
  } catch (error) {
    res.status(500).json({ error: "Error updating movimiento" });
  }
};

export const deleteMovimiento = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.movimiento.update({
      where: { id: parseInt(id) },
      data: { valido: false },
    });
    res.json({ message: "Movimiento deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting movimiento" });
  }
};
