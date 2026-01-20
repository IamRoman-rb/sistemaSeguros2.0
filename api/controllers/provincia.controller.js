import prisma from "../db.js";

export const getProvincias = async (req, res) => {
  try {
    const provincias = await prisma.provincia.findMany({
      include: { localidades: true },
    });
    res.json(provincias);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving provincias" });
  }
};

export const createProvincia = async (req, res) => {
  const { provincia } = req.body;
  try {
    const newProvincia = await prisma.provincia.create({
      data: { provincia },
    });
    res.status(201).json(newProvincia);
  } catch (error) {
    res.status(500).json({ error: "Error creating provincia" });
  }
};
export const updateProvincia = async (req, res) => {
  const { provincia, id } = req.body;
  try {
    const updatedProvincia = await prisma.provincia.update({
      where: { id: parseInt(id) },
      data: { provincia },
    });
    res.json(updatedProvincia);
  } catch (error) {
    res.status(500).json({ error: "Error updating provincia" });
  }
};

export const deleteProvincia = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.provincia.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting provincia" });
  }
};
