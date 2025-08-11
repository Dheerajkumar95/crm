import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import fileRoutes from "./controllers/fileController.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

await connectDB();

fileRoutes(app);
app.use("/api/leads", leadRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
