import express from "express";
import { createRights, getAllRights, updateRights, deleteRights, getOneRight } from "../controllers/rights.controller.js";

const rightsRouter = express.Router();

rightsRouter
    .post("/rights", createRights)
    .get("/rights", getAllRights)
    .get("/rights/:id", getOneRight)
    .put("/rights/:id", updateRights)
    .delete("/rights/:id",deleteRights);

export { rightsRouter };
