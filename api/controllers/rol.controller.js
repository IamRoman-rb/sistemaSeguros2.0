import prisma from "../db.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.rol.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving roles" });
  }
};

export const getRolId = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await prisma.rol.findUnique({
      where: { id: parseInt(id) },
      include: { empleados: true },
    });
    if (!rol) {
      return res.status(404).json({ error: "Rol not found" });
    }
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving rol" });
  }
};

export const createRol = async (req, res) => {
  const { rol } = req.body;
  try {
    const newRol = await prisma.rol.create({
      data: {
        rol,
      },
    });
    res.status(201).json(newRol);
  } catch (error) {
    res.status(500).json({ error: "Error creating rol" });
  }
};

export const updateRol = async (req, res) => {
  const { id, rol } = req.body;
  try {
    const updatedRol = await prisma.rol.update({
      where: { id: parseInt(id) },
      data: { rol },
    });
    res.json(updatedRol);
  } catch (error) {
    res.status(500).json({ error: "Error updating rol" });
  }
};

export const deleteRol = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.rol.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting rol" });
  }
};
