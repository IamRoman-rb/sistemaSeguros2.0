import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getSucursales = async (req, res) => {
  try {
    const sucursales = await prisma.sucursal.findMany();
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving sucursales" });
  }
};

export const getSucursalId = async (req, res) => {
  const { id } = req.params;
  try {
    const sucursal = await prisma.sucursal.findUnique({
      where: { id: parseInt(id) },
      include: { empleados: true, polizas: true },
    });
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal not found" });
    }
    res.json(sucursal);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving sucursal" });
  }
};

export const createSucursal = async (req, res) => {
  const { sucursal } = req.body;
  try {
    const newSucursal = await prisma.sucursal.create({
      data: {
        sucursal,
      },
    });
    res.status(201).json(newSucursal);
  } catch (error) {
    res.status(500).json({ error: "Error creating sucursal" });
  }
};

export const updateSucursal = async (req, res) => {
  const { id, sucursal } = req.body;
  try {
    const updatedSucursal = await prisma.sucursal.update({
      where: { id: parseInt(id) },
      data: {
        sucursal,
      },
    });
    res.json(updatedSucursal);
  } catch (error) {
    res.status(500).json({ error: "Error updating sucursal" });
  }
};

export const deleteSucursal = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sucursal.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Sucursal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting sucursal" });
  }
};
