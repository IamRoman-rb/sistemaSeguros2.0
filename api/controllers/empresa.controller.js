import prisma from "../db.js";

/*
model empresa {
  id         Int         @id @default(autoincrement())
  empresa    String      @unique
  cobertura_empresas cobertura_empresa[]
}

*/

export const getEmpresas = async (req, res) => {
  try {
    const empresas = await prisma.empresa.findMany({
      include: {
        cobertura_empresas: {
          include: { cobertura: true },
        },
      },
    });
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving empresas" });
  }
};

export const getEmpresaId = async (req, res) => {
  const { id } = req.params;
  try {
    const empresa = await prisma.empresa.findUnique({
      where: { id: parseInt(id) },
      include: {
        cobertura_empresas: {
          include: { cobertura: true },
        },
      },
    });
    if (!empresa) {
      return res.status(404).json({ error: "Empresa not found" });
    }
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving empresa" });
  }
};

export const createEmpresa = async (req, res) => {
  const { empresa } = req.body;
  try {
    const newEmpresa = await prisma.empresa.create({
      data: { empresa },
    });
    res.status(201).json(newEmpresa);
  } catch (error) {
    res.status(500).json({ error: "Error creating empresa" });
  }
};

export const addCoberturaToEmpresa = async (req, res) => {
  const { id_empresa, id_cobertura } = req.body;
  try {
    const newCoberturaEmpresa = await prisma.cobertura_empresa.create({
      data: {
        id_empresa,
        id_cobertura,
      },
    });
    res.status(201).json(newCoberturaEmpresa);
  } catch (error) {
    res.status(500).json({ error: "Error adding cobertura to empresa" });
  }
};

export const updateEmpresa = async (req, res) => {
  const { id, empresa } = req.body;
  try {
    const updatedEmpresa = await prisma.empresa.update({
      where: { id: parseInt(id) },
      data: { empresa },
    });
    res.json(updatedEmpresa);
  } catch (error) {
    res.status(500).json({ error: "Error updating empresa" });
  }
};

export const removeCoberturaFromEmpresa = async (req, res) => {
  const { id_empresa, id_cobertura } = req.body;
  try {
    const deletedCoberturaEmpresa = await prisma.cobertura_empresa.deleteMany({
      where: {
        id_empresa: id_empresa,
        id_cobertura: id_cobertura,
      },
    });
    res.json(deletedCoberturaEmpresa);
  } catch (error) {
    res.status(500).json({ error: "Error removing cobertura from empresa" });
  }
};

export const deleteEmpresa = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.empresa.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Empresa deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting empresa" });
  }
};
