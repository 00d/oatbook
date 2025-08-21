import express from "express";
import { getAllOats, getOat, createOat, updateOat, deleteOat } from "../controllers/oatController.js";
const router = express.Router();

router.get("/", getAllOats);
router.get("/:id", getOat);

router.post("/", createOat);

router.put("/:id", updateOat);

router.delete("/:id", deleteOat);

export default router;
