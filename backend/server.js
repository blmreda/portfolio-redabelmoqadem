const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", require("./src/routes/projectRoutes"));
app.use("/api/skills", require("./src/routes/skillRoutes"));
app.use("/api/contacts", require("./src/routes/contactRoutes"));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
