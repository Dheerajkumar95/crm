const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./lib/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
connectDB();

// Routes
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/opportunities", require("./routes/opportunityRoutes"));
app.use("/api/cases", require("./routes/caseRoutes"));
app.use("/api/contracts", require("./routes/contractRoutes"));
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
