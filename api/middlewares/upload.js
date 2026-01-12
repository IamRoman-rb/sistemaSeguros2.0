import multer from "multer";
import { join, extname } from "node:path";

// Función para limpiar el nombre del archivo
const sanitizeFileName = (file) => {
  const originalName = file.originalname;
  const extension = extname(originalName);
  const filename = originalName.replace(extension, ""); // Quitar la extensión
  const sanitizedName = filename.replace(/[^a-zA-Z0-9.]/g, "_"); // Reemplazar caracteres especiales con guiones bajos
  return sanitizedName + extension; // Agregar la extensión al final
};

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(process.cwd(), "uploads/")); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const sanitizedName = sanitizeFileName(file);
    cb(null, Date.now() + "_" + sanitizedName); // Nombre del archivo
  },
});

// Instancia de Multer
const upload = multer({ storage: storage });

export default upload;
