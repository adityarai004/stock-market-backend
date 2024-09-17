import express from "express";
import { createIpo, getAllIpo, updateIpo, deleteIpo, getOne } from "../controllers/ipo.controller.js";

const ipoRouter = express.Router();

ipoRouter
    .post("/ipo", createIpo)
    .get("/ipo", getAllIpo)
    .get("/ipo/:id",getOne)
    .put("/ipo/:id", updateIpo)
    .delete("/ipo/:id",deleteIpo);

export { ipoRouter };
