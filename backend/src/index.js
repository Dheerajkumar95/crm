import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import fileRoutes from "./controllers/fileController.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import opportunityActivitiesRoutes from "./routes/oppActivitiesRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import opportunityProductsRoutes from "./routes/opportunityProductRoutes.js";
import proposalRoutes from "./routes/proposal.js";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", true);

await connectDB();

fileRoutes(app);
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/opportunitiesactivities", opportunityActivitiesRoutes);
app.use("/api/opportunityProducts", opportunityProductsRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
