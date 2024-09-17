import express from "express";
import { createDividend, getAllDividends, updateDividend, deleteDividend, getOneDividend } from "../controllers/dividend.controller.js";

const dividendRouter = express.Router();

dividendRouter
    .post("/dividend", createDividend)
    .get("/dividend", getAllDividends)
    .get("/dividend/:id",updateDividend)
    .put("/dividend/:id", deleteDividend)
    .delete("/dividend/:id",getOneDividend);

export { dividendRouter };
