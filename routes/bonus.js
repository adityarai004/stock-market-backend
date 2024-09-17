import express from "express";
import {
  createBonus,
  getAllBonuses,
  getOneBonus,
  updateBonus,
  deleteBonus,
} from "../controllers/bonus.controller.js";

const bonusRouter = express.Router();

bonusRouter
  .post("/bonus", createBonus)
  .get("/bonus", getAllBonuses)
  .get("/bonus/:id", getOneBonus)
  .put("/bonus/:id", updateBonus)
  .delete("/bonus/:id", deleteBonus);

export { bonusRouter };
