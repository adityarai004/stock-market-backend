import express from "express";
import { createSME, getAllSME, updateSME, deleteSME, getSMEById } from "../controllers/sme.controller.js";

const smeRouter = express.Router();

smeRouter
    .post("/sme", createSME)
    .get("/sme", getAllSME)
    .get("/sme/:id",getSMEById)
    .put("/sme/:id", updateSME)
    .delete("/sme/:id",deleteSME);

export { smeRouter };
