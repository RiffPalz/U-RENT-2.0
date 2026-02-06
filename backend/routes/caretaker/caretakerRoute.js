import express from "express";
import {
  loginCaretaker,
  fetchCaretakerProfile,
  saveCaretakerProfile,
} from "../../controllers/caretaker/caretakerController.js";
import caretakerAuth from "../../middleware/caretakerAuth.js";

const caretakerRouter = express.Router();

// Login endpoint
caretakerRouter.post("/login", loginCaretaker);

// Profile endpoints (protected by caretakerAuth middleware)
caretakerRouter.get("/profile", caretakerAuth, fetchCaretakerProfile);
caretakerRouter.patch("/profile/update", caretakerAuth, saveCaretakerProfile);

export default caretakerRouter;
