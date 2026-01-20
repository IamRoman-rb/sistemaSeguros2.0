import prisma from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving clientes" });
  }
};

export const getClienteId = async (req, res) => {
  const { dni } = req.params;
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { dni: parseInt(dni) },
    });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente not found" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving cliente" });
  }
};

export const createCliente = async (req, res) => {
  const { dni, nombre, nacimiento, direccion, telefono, id_localidad } =
    req.body;
  try {
    const newCliente = await prisma.cliente.create({
      data: {
        dni: parseInt(dni),
        nombre,
        nacimiento: new Date(nacimiento),
        direccion,
        telefono,
        id_localidad: parseInt(id_localidad),
      },
    });
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(500).json({ error: "Error creating cliente" });
  }
};

export const updateCliente = async (req, res) => {
  const { dni, nombre, nacimiento, direccion, telefono, id_localidad } =
    req.body;
  try {
    const updatedCliente = await prisma.cliente.update({
      where: { dni: parseInt(dni) },
      data: {
        nombre,
        nacimiento: new Date(nacimiento),
        direccion,
        telefono,
        id_localidad: parseInt(id_localidad),
      },
    });
    res.json(updatedCliente);
  } catch (error) {
    res.status(500).json({ error: "Error updating cliente" });
  }
};

export const deleteCliente = async (req, res) => {
  const { dni } = req.body;
  try {
    await prisma.cliente.delete({
      where: { dni: parseInt(dni) },
    });
    res.json({ message: "Cliente deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting cliente" });
  }
};
