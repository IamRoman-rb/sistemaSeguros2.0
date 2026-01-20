import prisma from "../db.js";

/*
model poliza {
  numero         String      @id @unique
  emision        DateTime    @default(now())
  inicio         DateTime    @default(now())
  fin            DateTime    @default(now())
  periodo        Int
  cuotas         Int
  premio         Float
  valido         Boolean     @default(true)
  id_tipo_poliza Int
  id_cliente     Int
  id_sucursal    Int
  id_empleado    Int
  tipo_poliza    tipo_poliza @relation(fields: [id_tipo_poliza], references: [id])
  cliente        cliente     @relation(fields: [id_cliente], references: [dni])
  sucursal       sucursal    @relation(fields: [id_sucursal], references: [id])
  empleado       empleado    @relation(fields: [id_empleado], references: [id])
  poliza_coberturas poliza_cobertura[]
  poliza_vehiculos poliza_vehiculo[]
  pagos          pago[]
}

model poliza_vehiculo {
  id Int @id @default(autoincrement())
  numero_poliza String
  patente_vehiculo String
  poliza poliza @relation(fields: [numero_poliza], references: [numero])
  vehiculo vehiculo @relation(fields: [patente_vehiculo], references: [patente])
  @@unique([numero_poliza, patente_vehiculo])
}

model poliza_cobertura {
  id Int @id @default(autoincrement())
  numero_poliza String
  id_cobertura Int
  poliza poliza @relation(fields: [numero_poliza], references: [numero])
  cobertura cobertura @relation(fields: [id_cobertura], references: [id])
  @@unique([numero_poliza, id_cobertura])
}

model tipo_poliza {
  id      Int      @id @default(autoincrement())
  tipo    String   @unique
  polizas poliza[]
}


*/

export const getPolizas = async (req, res) => {
  try {
    const polizas = await prisma.poliza.findMany({
      include: {
        tipo_poliza: true,
        cliente: true,
        sucursal: true,
        empleado: true,
        poliza_coberturas: { include: { cobertura: true } },
        poliza_vehiculos: { include: { vehiculo: true } },
        pagos: true,
      },
    });
    res.json(polizas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving polizas" });
  }
};

export const getPolizaId = async (req, res) => {
  const { numero } = req.params;
  try {
    const poliza = await prisma.poliza.findUnique({
      where: { numero },
      include: {
        tipo_poliza: true,
        cliente: true,
        sucursal: true,
        empleado: true,
        poliza_coberturas: { include: { cobertura: true } },
        poliza_vehiculos: { include: { vehiculo: true } },
        pagos: true,
      },
    });
    if (!poliza) {
      return res.status(404).json({ error: "Poliza not found" });
    }
    res.json(poliza);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving poliza" });
  }
};

export const getTipoPolizas = async (req, res) => {
  try {
    const tipoPolizas = await prisma.tipo_poliza.findMany();
    res.json(tipoPolizas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tipo polizas" });
  }
};

export const createPoliza = async (req, res) => {
  const {
    numero,
    emision,
    inicio,
    fin,
    periodo,
    cuotas,
    premio,
    valido,
    id_tipo_poliza,
    id_cliente,
    id_sucursal,
    id_empleado,
  } = req.body;
  try {
    const newPoliza = await prisma.poliza.create({
      data: {
        numero,
        emision: new Date(emision),
        inicio: new Date(inicio),
        fin: new Date(fin),
        periodo,
        cuotas,
        premio,
        valido,
        id_tipo_poliza,
        id_cliente,
        id_sucursal,
        id_empleado,
      },
    });
    res.status(201).json(newPoliza);
  } catch (error) {
    res.status(500).json({ error: "Error creating poliza" });
  }
};

export const createTipoPoliza = async (req, res) => {
  const { tipo } = req.body;
  try {
    const newTipoPoliza = await prisma.tipo_poliza.create({
      data: {
        tipo,
      },
    });
    res.status(201).json(newTipoPoliza);
  } catch (error) {
    res.status(500).json({ error: "Error creating tipo poliza" });
  }
};

export const updatePoliza = async (req, res) => {
  const {
    numero,
    emision,
    inicio,
    fin,
    periodo,
    cuotas,
    premio,
    valido,
    id_tipo_poliza,
    id_cliente,
    id_sucursal,
    id_empleado,
  } = req.body;
  try {
    const updatedPoliza = await prisma.poliza.update({
      where: { numero },
      data: {
        emision: new Date(emision),
        inicio: new Date(inicio),
        fin: new Date(fin),
        periodo,
        cuotas,
        premio,
        valido,
        id_tipo_poliza,
        id_cliente,
        id_sucursal,
        id_empleado,
      },
    });
    res.json(updatedPoliza);
  } catch (error) {
    res.status(500).json({ error: "Error updating poliza" });
  }
};

export const updateTipoPoliza = async (req, res) => {
  const { id, tipo } = req.body;
  try {
    const updatedTipoPoliza = await prisma.tipo_poliza.update({
      where: { id: parseInt(id) },
      data: { tipo },
    });
    res.json(updatedTipoPoliza);
  } catch (error) {
    res.status(500).json({ error: "Error updating tipo poliza" });
  }
};

export const deletePoliza = async (req, res) => {
  const { numero } = req.body;
  try {
    await prisma.poliza.update({
      where: { numero },
      data: { valido: false },
    });
    res.json({ message: "Poliza deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting poliza" });
  }
};

export const deleteTipoPoliza = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.tipo_poliza.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Tipo poliza deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting tipo poliza" });
  }
};

export const addVehiculoToPoliza = async (req, res) => {
  const { numero_poliza, patente_vehiculo } = req.body;
  try {
    const newPolizaVehiculo = await prisma.poliza_vehiculo.create({
      data: {
        numero_poliza,
        patente_vehiculo,
      },
    });
    res.status(201).json(newPolizaVehiculo);
  } catch (error) {
    res.status(500).json({ error: "Error adding vehiculo to poliza" });
  }
};

export const removeVehiculoFromPoliza = async (req, res) => {
  const { numero_poliza, patente_vehiculo } = req.body;
  try {
    const deletedPolizaVehiculo = await prisma.poliza_vehiculo.deleteMany({
      where: {
        numero_poliza: numero_poliza,
        patente_vehiculo: patente_vehiculo,
      },
    });
    res.json(deletedPolizaVehiculo);
  } catch (error) {
    res.status(500).json({ error: "Error removing vehiculo from poliza" });
  }
};

export const deletePolizaVehiculo = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.poliza_vehiculo.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Poliza vehiculo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting poliza vehiculo" });
  }
};

export const deletePolizaCobertura = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.poliza_cobertura.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Poliza cobertura deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting poliza cobertura" });
  }
};

export const getPolizasByCliente = async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const clientePolizas = await prisma.poliza.findMany({
      where: { id_cliente: parseInt(id_cliente) },
      include: {
        tipo_poliza: true,
        sucursal: true,
        empleado: true,
        poliza_coberturas: { include: { cobertura: true } },
        poliza_vehiculos: { include: { vehiculo: true } },
        pagos: true,
      },
    });
    res.json(clientePolizas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving polizas for cliente" });
  }
};

export const getPolizasByEmpleado = async (req, res) => {
  const { id_empleado } = req.params;
  try {
    const empleadoPolizas = await prisma.poliza.findMany({
      where: { id_empleado: parseInt(id_empleado) },
      include: {
        tipo_poliza: true,
        cliente: true,
        sucursal: true,
        poliza_coberturas: { include: { cobertura: true } },
        poliza_vehiculos: { include: { vehiculo: true } },
        pagos: true,
      },
    });
    res.json(empleadoPolizas);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving polizas for empleado" });
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
