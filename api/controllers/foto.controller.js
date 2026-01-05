import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { unlink } from "node:fs/promises";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getFotos = async (req, res) => {
  try {
    const fotos = await prisma.foto.findMany();
    res.json(fotos);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving fotos" });
  }
};

export const createFoto = async (req, res) => {
  const { patente } = req.body;
  const archivos = req.files;
  const foto = archivos && archivos.length > 0 ? archivos[0].filename : null;
  try {
    if (!foto) {
      return res.status(400).json({ error: "No foto file uploaded" });
    }
    const existingVehiculo = await prisma.vehiculo.findUnique({
      where: { patente },
    });
    if (!existingVehiculo) {
      return res.status(404).json({ error: "Vehiculo not found" });
    }
    const newFoto = await prisma.foto.create({
      data: { foto, patente_vehiculo: existingVehiculo.patente },
    });
    res.status(201).json(newFoto);
  } catch (error) {
    res.status(500).json({ error: "Error creating foto" });
  }
};

export const updateFoto = async (req, res) => {
  const archivos = req.files;
  const foto = archivos && archivos.length > 0 ? archivos[0].filename : null;
  const { id } = req.body;
  try {
    if (!foto) {
      return res.status(400).json({ error: "No foto file uploaded" });
    }
    const currentFoto = await prisma.foto.findUnique({
      where: { id: parseInt(id) },
    });
    if (!currentFoto) {
      return res.status(404).json({ error: "Foto not found" });
    }
    // Delete the old foto file from the filesystem
    const file = fileURLToPath(import.meta.url);
    const dir = join(dirname(file), "uploads", currentFoto.foto);
    await unlink(dir);
    const updatedFoto = await prisma.foto.update({
      where: { id: parseInt(id) },
      data: { foto },
    });
    res.json(updatedFoto);
  } catch (error) {
    res.status(500).json({ error: "Error updating foto" });
  }
};

export const deleteFoto = async (req, res) => {
  const { id } = req.body;
  try {
    const currentFoto = await prisma.foto.findUnique({
      where: { id: parseInt(id) },
    });
    if (!currentFoto) {
      return res.status(404).json({ error: "Foto not found" });
    }
    // Delete the foto file from the filesystem
    const file = fileURLToPath(import.meta.url);
    const dir = join(dirname(file), "uploads", currentFoto.foto);
    await unlink(dir);
    await prisma.foto.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting foto" });
  }
};
