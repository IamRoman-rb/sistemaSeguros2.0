import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
/*
model metodo {
  id     Int    @id @default(autoincrement())
  metodo String @unique
  pagos  pago[]
}
*/

export const getMetodos = async (req, res) => {
  try {
    const metodos = await prisma.metodo.findMany();
    res.json(metodos);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving metodos" });
  }
};

export const getMetodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const metodo = await prisma.metodo.findUnique({
      where: { id: parseInt(id) },
    });
    if (!metodo) {
      return res.status(404).json({ error: "Metodo not found" });
    }
    res.json(metodo);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving metodo" });
  }
};

export const createMetodo = async (req, res) => {
  const { metodo } = req.body;
  try {
    const newMetodo = await prisma.metodo.create({
      data: { metodo },
    });
    res.status(201).json(newMetodo);
  } catch (error) {
    res.status(500).json({ error: "Error creating metodo" });
  }
};

export const updateMetodo = async (req, res) => {
  const { id, metodo } = req.body;
  try {
    const updatedMetodo = await prisma.metodo.update({
      where: { id: parseInt(id) },
      data: { metodo },
    });
    res.json(updatedMetodo);
  } catch (error) {
    res.status(500).json({ error: "Error updating metodo" });
  }
};

export const deleteMetodo = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.metodo.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting metodo" });
  }
};
