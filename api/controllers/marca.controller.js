import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getMarcas = async (req, res) => {
  try {
    const marcas = await prisma.marca.findMany();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving marcas" });
  }
};

export const createMarca = async (req, res) => {
  const { marca } = req.body;
  try {
    const newMarca = await prisma.marca.create({
      data: { marca },
    });
    res.status(201).json(newMarca);
  } catch (error) {
    res.status(500).json({ error: "Error creating marca" });
  }
};
export const updateMarca = async (req, res) => {
  const { marca, id } = req.body;
  try {
    const updatedMarca = await prisma.marca.update({
      where: { id: parseInt(id) },
      data: { marca },
    });
    res.json(updatedMarca);
  } catch (error) {
    res.status(500).json({ error: "Error updating marca" });
  }
};

export const deleteMarca = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.marca.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting marca" });
  }
};
