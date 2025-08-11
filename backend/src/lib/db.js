import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

let gfs;
let gridFSBucket;
let upload;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const db = mongoose.connection.db;
    const bucketName = "uploads";
    gridFSBucket = new mongoose.mongo.GridFSBucket(db, { bucketName });
    gfs = {
      files: db.collection(`${bucketName}.files`),
      chunks: db.collection(`${bucketName}.chunks`),
    };

    // Storage with accountId in metadata
    const storage = new GridFsStorage({
      url: process.env.MONGODB_URI,
      file: (req, file) => {
        return {
          filename: Date.now() + "-" + file.originalname,
          bucketName,
          metadata: {
            accountId: req.params.accountId || null, // Save from URL param
          },
        };
      },
    });

    upload = multer({ storage });

    return { gfs, gridFSBucket, upload };
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};

export { gfs, gridFSBucket, upload };
