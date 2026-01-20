import prisma from "../db.js";

/*
model cobertura {
  id          Int       @id @default(autoincrement())
  cobertura   String    @unique
  descripcion String?
  cobertura_empresas cobertura_empresa[]
  cobertura_riesgos cobertura_riesgo[]
  poliza_coberturas poliza_cobertura[]
}

model cobertura_riesgo {
  id Int @id @default(autoincrement())
  id_cobertura Int
  id_riesgo Int
  cobertura cobertura @relation(fields: [id_cobertura], references: [id])
  riesgo riesgo @relation(fields: [id_riesgo], references: [id])
  @@unique([id_cobertura, id_riesgo])
}

model riesgo {
  id         Int         @id @default(autoincrement())
  riesgo     String      @unique
  cobertura_riesgos cobertura_riesgo[]
}

*/

export const getRiesgos = async (req, res) => {
  try {
    const riesgos = await prisma.riesgo.findMany({
      include: {
        cobertura_riesgos: { include: { cobertura: true } },
      },
    });
    res.json(riesgos);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving riesgos" });
  }
};

export const getRiesgoId = async (req, res) => {
  const { id } = req.params;
  try {
    const riesgo = await prisma.riesgo.findUnique({
      where: { id: parseInt(id) },
      include: {
        cobertura_riesgos: { include: { cobertura: true } },
      },
    });
    if (!riesgo) {
      return res.status(404).json({ error: "Riesgo not found" });
    }
    res.json(riesgo);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving riesgo" });
  }
};

export const createRiesgo = async (req, res) => {
  const { riesgo } = req.body;
  try {
    const newRiesgo = await prisma.riesgo.create({
      data: { riesgo },
    });
    res.status(201).json(newRiesgo);
  } catch (error) {
    res.status(500).json({ error: "Error creating riesgo" });
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

export const getCoberturasByRiesgo = async (req, res) => {
  const { id_riesgo } = req.params;
  try {
    const riesgoCoberturas = await prisma.cobertura_riesgo.findMany({
      where: { id_riesgo: parseInt(id_riesgo) },
      include: { cobertura: true },
    });
    res.json(riesgoCoberturas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving coberturas for riesgo" });
  }
};

export const removeCoberturaFromRiesgo = async (req, res) => {
  const { id_riesgo, id_cobertura } = req.body;
  try {
    const deletedCoberturaRiesgo = await prisma.cobertura_riesgo.deleteMany({
      where: {
        id_riesgo: parseInt(id_riesgo),
        id_cobertura: parseInt(id_cobertura),
      },
    });
    res.json(deletedCoberturaRiesgo);
  } catch (error) {
    res.status(500).json({ error: "Error removing cobertura from riesgo" });
  }
};

export const updateRiesgo = async (req, res) => {
  const { id, riesgo } = req.body;
  try {
    const updatedRiesgo = await prisma.riesgo.update({
      where: { id: parseInt(id) },
      data: { riesgo },
    });
    res.json(updatedRiesgo);
  } catch (error) {
    res.status(500).json({ error: "Error updating riesgo" });
  }
};

export const deleteRiesgo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRiesgo = await prisma.riesgo.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedRiesgo);
  } catch (error) {
    res.status(500).json({ error: "Error deleting riesgo" });
  }
};
