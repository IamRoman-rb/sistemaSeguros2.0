import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await prisma.vehiculo.findMany({
      include: { marca: true, fotos: true },
    });
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving vehiculos" });
  }
};

export const getVehiculoById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehiculo = await prisma.vehiculo.findUnique({
      where: { id: parseInt(id) },
      include: {
        marca: true,
        fotos: true,
        poliza_vehiculos: { include: { poliza: true } },
      },
    });
    if (!vehiculo) {
      return res.status(404).json({ error: "Vehiculo not found" });
    }
    res.json(vehiculo);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving vehiculo" });
  }
};

export const createVehiculo = async (req, res) => {
  const { patente, modelo, anio, suma, chasis, motor, id_marca } = req.body;
  try {
    const newVehiculo = await prisma.vehiculo.create({
      data: { patente, modelo, anio, suma, chasis, motor, id_marca },
    });
    res.status(201).json(newVehiculo);
  } catch (error) {
    res.status(500).json({ error: "Error creating vehiculo" });
  }
};
export const updateVehiculo = async (req, res) => {
  const { patente, modelo, anio, suma, chasis, motor, id_marca } = req.body;
  try {
    const updatedVehiculo = await prisma.vehiculo.update({
      where: { id: parseInt(id) },
      data: { patente, modelo, anio, suma, chasis, motor, id_marca },
    });
    res.json(updatedVehiculo);
  } catch (error) {
    res.status(500).json({ error: "Error updating vehiculo" });
  }
};

export const deleteMarca = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.vehiculo.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting vehiculo" });
  }
};
