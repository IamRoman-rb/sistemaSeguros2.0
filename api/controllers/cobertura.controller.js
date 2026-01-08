import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
/*
model cobertura {
  id          Int       @id @default(autoincrement())
  cobertura   String    @unique
  descripcion String?
  cobertura_empresas cobertura_empresa[]
  cobertura_riesgos cobertura_riesgo[]
  poliza_coberturas poliza_cobertura[]
}

model cobertura_empresa {
  id Int @id @default(autoincrement())
  id_cobertura Int
  id_empresa Int
  cobertura cobertura @relation(fields: [id_cobertura], references: [id])
  empresa empresa @relation(fields: [id_empresa], references: [id])
  @@unique([id_cobertura, id_empresa])
}

model cobertura_riesgo {
  id Int @id @default(autoincrement())
  id_cobertura Int
  id_riesgo Int
  cobertura cobertura @relation(fields: [id_cobertura], references: [id])
  riesgo riesgo @relation(fields: [id_riesgo], references: [id])
  @@unique([id_cobertura, id_riesgo])
}

model poliza_cobertura {
  id Int @id @default(autoincrement())
  numero_poliza String
  id_cobertura Int
  poliza poliza @relation(fields: [numero_poliza], references: [numero])
  cobertura cobertura @relation(fields: [id_cobertura], references: [id])
  @@unique([numero_poliza, id_cobertura])
}
*/

export const getCoberturas = async (req, res) => {
  try {
    const coberturas = await prisma.cobertura.findMany({
      include: {
        cobertura_empresas: { include: { empresa: true } },
        cobertura_riesgos: { include: { riesgo: true } },
        poliza_coberturas: { include: { poliza: true } },
      },
    });
    res.json(coberturas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving coberturas" });
  }
};

export const getCoberturaId = async (req, res) => {
  const { id } = req.params;
  try {
    const cobertura = await prisma.cobertura.findUnique({
      where: { id: parseInt(id) },
      include: {
        cobertura_empresas: { include: { empresa: true } },
        cobertura_riesgos: { include: { riesgo: true } },
        poliza_coberturas: { include: { poliza: true } },
      },
    });
    if (!cobertura) {
      return res.status(404).json({ error: "Cobertura not found" });
    }
    res.json(cobertura);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving cobertura" });
  }
};

export const getEmpresasByCobertura = async (req, res) => {
  const { id_cobertura } = req.params;
  try {
    const coberturaEmpresas = await prisma.cobertura_empresa.findMany({
      where: { id_cobertura: parseInt(id_cobertura) },
      include: { empresa: true },
    });
    res.json(coberturaEmpresas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving empresas for cobertura" });
  }
};

export const createCobertura = async (req, res) => {
  const { cobertura, descripcion } = req.body;
  try {
    const newCobertura = await prisma.cobertura.create({
      data: { cobertura, descripcion },
    });
    res.status(201).json(newCobertura);
  } catch (error) {
    res.status(500).json({ error: "Error creating cobertura" });
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

export const addCoberturaToRiesgo = async (req, res) => {
  const { id_riesgo, id_cobertura } = req.body;
  try {
    const newCoberturaRiesgo = await prisma.cobertura_riesgo.create({
      data: {
        id_riesgo,
        id_cobertura,
      },
    });
    res.status(201).json(newCoberturaRiesgo);
  } catch (error) {
    res.status(500).json({ error: "Error adding cobertura to riesgo" });
  }
};

export const addCoberturaToPoliza = async (req, res) => {
  const { numero_poliza, id_cobertura } = req.body;
  try {
    const newPolizaCobertura = await prisma.poliza_cobertura.create({
      data: {
        numero_poliza,
        id_cobertura,
      },
    });
    res.status(201).json(newPolizaCobertura);
  } catch (error) {
    res.status(500).json({ error: "Error adding cobertura to poliza" });
  }
};

export const updateCobertura = async (req, res) => {
  const { id, cobertura, descripcion } = req.body;
  try {
    const updatedCobertura = await prisma.cobertura.update({
      where: { id: parseInt(id) },
      data: { cobertura, descripcion },
    });
    res.json(updatedCobertura);
  } catch (error) {
    res.status(500).json({ error: "Error updating cobertura" });
  }
};

export const deleteCobertura = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.cobertura.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Cobertura deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting cobertura" });
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

export const removeCoberturaFromRiesgo = async (req, res) => {
  const { id_riesgo, id_cobertura } = req.body;
  try {
    const deletedCoberturaRiesgo = await prisma.cobertura_riesgo.deleteMany({
      where: {
        id_riesgo: id_riesgo,
        id_cobertura: id_cobertura,
      },
    });
    res.json(deletedCoberturaRiesgo);
  } catch (error) {
    res.status(500).json({ error: "Error removing cobertura from riesgo" });
  }
};

export const removeCoberturaFromPoliza = async (req, res) => {
  const { numero_poliza, id_cobertura } = req.body;
  try {
    const deletedPolizaCobertura = await prisma.poliza_cobertura.deleteMany({
      where: {
        numero_poliza: numero_poliza,
        id_cobertura: id_cobertura,
      },
    });
    res.json(deletedPolizaCobertura);
  } catch (error) {
    res.status(500).json({ error: "Error removing cobertura from poliza" });
  }
};
