import express from "express";
import { createSplit, getAllSplits, updateSplit, deleteSplit, getOneSplit } from "../controllers/splits.controller.js";

const splitsRouter = express.Router();

splitsRouter
    .post("/splits", createSplit)
    .get("/splits", getAllSplits)
    .get("/splits/:id", getOneSplit)
    .put("/splits/:id", updateSplit)
    .delete("/splits/:id", deleteSplit);

export { splitsRouter };
