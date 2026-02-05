import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/database.js';
import connectCloudinary from './config/cloudinary.js';

import adminRoutes from "./routes/admin/adminRoutes.js";
import caretakerRoutes from "./routes/caretaker/caretakerRoute.js";
import userRoutes from "./routes/userRoutes.js";


import createDefaultAdmin from "./seeders/defaultAdmin.js";
import createDefaultCaretaker from "./seeders/defaultCaretaker.js";

// APP CONFIG
const app = express();
const PORT = process.env.PORT || 5000;  
connectCloudinary();


/* ===================== MIDDLEWARES ===================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API ENDPOINTS
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/caretaker", caretakerRoutes);

//Root Route
app.get('/', (req, res) => {
  res.send("API is working!");
});


// SERVER + DB STARTUP
const startServer = async () => {
  try {
    await connectDB(); // Make sure DB is ready before starting server
    await createDefaultAdmin();
    await createDefaultCaretaker();
    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Stop the process if DB fails
  }
};

startServer();