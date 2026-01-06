import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
/*
model pago {
  id          Int      @id @default(autoincrement())
  fecha       DateTime @default(now())
  importe     Float
  observacion String?
  valido      Boolean  @default(true)
  id_empleado Int
  id_poliza   String
  id_metodo   Int
  metodo      metodo   @relation(fields: [id_metodo], references: [id])
  empleado    empleado @relation(fields: [id_empleado], references: [id])
  poliza      poliza   @relation(fields: [id_poliza], references: [numero])
}
*/
export const getPagos = async (req, res) => {
  try {
    const pagos = await prisma.pago.findMany({
      include: { empleado: true, metodo: true, poliza: true },
    });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving pagos" });
  }
};

export const getPagoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pago = await prisma.pago.findUnique({
      where: { id: parseInt(id) },
      include: { empleado: true, metodo: true, poliza: true },
    });
    if (!pago) {
      return res.status(404).json({ error: "Pago not found" });
    }
    res.json(pago);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving pago" });
  }
};

export const createPago = async (req, res) => {
  const { importe, observacion, id_empleado, id_poliza, id_metodo } = req.body;
  try {
    const newPago = await prisma.pago.create({
      data: { importe, observacion, id_empleado, id_poliza, id_metodo },
    });
    res.status(201).json(newPago);
  } catch (error) {
    res.status(500).json({ error: "Error creating pago" });
  }
};

export const updatePago = async (req, res) => {
  const { id, importe, observacion, id_empleado, id_poliza, id_metodo } =
    req.body;
  try {
    const updatedPago = await prisma.pago.update({
      where: { id: parseInt(id) },
      data: { importe, observacion, id_empleado, id_poliza, id_metodo },
    });
    res.json(updatedPago);
  } catch (error) {
    res.status(500).json({ error: "Error updating pago" });
  }
};

export const deletePago = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.pago.update({
      where: { id: parseInt(id) },
      data: { valido: false },
    });
    res.json({ message: "Pago deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting pago" });
  }
};
