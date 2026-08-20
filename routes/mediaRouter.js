import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  uploadFile,
  deleteFile,
  uploadManyFiles,
  deleteManyFiles,
} from "../utils/cloudinary.js";

const mediaRouter = Router();

// Multer setup with disk storage to preserve original file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // Preserve the original file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Helper to remove temp files
function removeFiles(files) {
  files.forEach((file) => {
    fs.unlink(path.join(file.path), (err) => {
      if (err) console.error("Error deleting temp file:", file.path, err);
    });
  });
}

// Single file upload
mediaRouter.route("/single").post(upload.single("media"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const result = await uploadFile(req.file.path);
    removeFiles([req.file]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Single file delete
mediaRouter.route("/single").put(async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "No id provided" });
    const result = await deleteFile(id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Many files upload
mediaRouter.route("/many").post(upload.array("media"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });
    const filePaths = req.files.map((f) => f.path);
    const results = await uploadManyFiles(filePaths);
    removeFiles(req.files);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Many files delete
mediaRouter.route("/many").put(async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({ error: "No ids provided" });
    const results = await deleteManyFiles(ids);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default mediaRouter;
