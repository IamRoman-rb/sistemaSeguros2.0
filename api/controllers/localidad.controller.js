import prisma from "../db.js";

export const getLocalidades = async (req, res) => {
  try {
    const localidades = await prisma.localidad.findMany({
      include: { provincia: true },
    });
    res.json(localidades);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving localidades" });
  }
};

export const createLocalidad = async (req, res) => {
  const { localidad, id_provincia } = req.body;
  try {
    const newLocalidad = await prisma.localidad.create({
      data: { localidad, id_provincia },
    });
    res.status(201).json(newLocalidad);
  } catch (error) {
    res.status(500).json({ error: "Error creating localidad" });
  }
};

export const updateLocalidad = async (req, res) => {
  const { localidad, id_provincia, id } = req.body;
  try {
    const updatedLocalidad = await prisma.localidad.update({
      where: { id: parseInt(id) },
      data: { localidad, id_provincia },
    });
    res.json(updatedLocalidad);
  } catch (error) {
    res.status(500).json({ error: "Error updating localidad" });
  }
};

export const deleteLocalidad = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.localidad.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting localidad" });
  }
};
