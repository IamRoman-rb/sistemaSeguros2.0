import prisma from "../db.js";

export const getActividades = async (req, res) => {
  try {
    const actividades = await prisma.actividad.findMany({
      include: { empleado: true, tipo_actividad: true },
    });
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving actividades" });
  }
};

export const getActividadById = async (req, res) => {
  const { id } = req.params;
  try {
    const actividad = await prisma.actividad.findUnique({
      where: { id: parseInt(id) },
      include: { empleado: true, tipo_actividad: true },
    });
    if (!actividad) {
      return res.status(404).json({ error: "Actividad not found" });
    }
    res.json(actividad);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving actividad" });
  }
};

export const createActividad = async (req, res) => {
  const { descripcion, id_empleado, id_tipo_actividad } = req.body;
  try {
    const newActividad = await prisma.actividad.create({
      data: { descripcion, id_empleado, id_tipo_actividad },
    });
    res.status(201).json(newActividad);
  } catch (error) {
    res.status(500).json({ error: "Error creating actividad" });
  }
};

export const updateActividad = async (req, res) => {
  const { id, descripcion, id_empleado, id_tipo_actividad } = req.body;
  try {
    const updatedActividad = await prisma.actividad.update({
      where: { id: parseInt(id) },
      data: { descripcion, id_empleado, id_tipo_actividad },
    });
    res.json(updatedActividad);
  } catch (error) {
    res.status(500).json({ error: "Error updating actividad" });
  }
};

export const deleteActividad = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.actividad.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting actividad" });
  }
};

export const getTiposActividad = async (req, res) => {
  try {
    const tipos = await prisma.tipo_actividad.findMany();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tipos de actividad" });
  }
};

export const createTipoActividad = async (req, res) => {
  const { tipo } = req.body;
  try {
    const newTipo = await prisma.tipo_actividad.create({
      data: { tipo },
    });
    res.status(201).json(newTipo);
  } catch (error) {
    res.status(500).json({ error: "Error creating tipo de actividad" });
  }
};

export const deleteTipoActividad = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.tipo_actividad.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting tipo de actividad" });
  }
};
