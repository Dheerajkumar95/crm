import mongoose from "mongoose";
import { gfs, gridFSBucket, upload } from "../lib/db.js";

const fileRoutes = (app) => {
  // Upload file with accountId in metadata
  app.post(
    "/api/files/upload/:accountId",
    upload.single("file"),
    (req, res) => {
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });
      res.json({ message: "File uploaded", file: req.file });
    }
  );

  // List files by accountId
  app.get("/api/files/account/:accountId", async (req, res) => {
    try {
      const files = await gfs.files
        .find({ "metadata.accountId": req.params.accountId })
        .toArray();

      const mapped = files.map((f) => ({
        filename: f.filename,
        contentType: f.contentType,
        length: f.length,
        uploadDate: f.uploadDate,
        id: f._id,
        accountId: f.metadata?.accountId,
      }));

      res.json(mapped);
    } catch (err) {
      res.status(500).json({ message: "Error fetching files" });
    }
  });

  // View file
  app.get("/api/files/:accountId/:filename", async (req, res) => {
    try {
      const file = await gfs.files.findOne({
        filename: req.params.filename,
        "metadata.accountId": req.params.accountId,
      });
      if (!file) return res.status(404).json({ message: "File not found" });

      res.set("Content-Type", file.contentType || "application/octet-stream");
      res.set("Content-Disposition", `inline; filename="${file.filename}"`);
      gridFSBucket.openDownloadStreamByName(file.filename).pipe(res);
    } catch (err) {
      res.status(500).json({ message: "Error streaming file" });
    }
  });

  // Download file
  app.get("/api/files/:accountId/:filename/download", async (req, res) => {
    try {
      const file = await gfs.files.findOne({
        filename: req.params.filename,
        "metadata.accountId": req.params.accountId,
      });
      if (!file) return res.status(404).json({ message: "File not found" });

      res.set("Content-Type", file.contentType || "application/octet-stream");
      res.set("Content-Disposition", `attachment; filename="${file.filename}"`);
      gridFSBucket.openDownloadStreamByName(file.filename).pipe(res);
    } catch (err) {
      res.status(500).json({ message: "Error downloading file" });
    }
  });

  // Delete file
  app.delete("/api/files/:accountId/:id", async (req, res) => {
    try {
      const file = await gfs.files.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
        "metadata.accountId": req.params.accountId,
      });
      if (!file) return res.status(404).json({ message: "File not found" });

      await gridFSBucket.delete(file._id);
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting file" });
    }
  });
};

export default fileRoutes;
