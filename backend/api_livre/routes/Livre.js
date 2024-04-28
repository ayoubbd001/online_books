import express from "express";
import mongoose from "mongoose";
import Livre from "../Models/Livre.js";
// import dotenv from "dotenv";

const routes = express.Router();

routes.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    // const { code, titre, description, auteur } = req.body;
    // console.log(req.body);

    // return res.send(req.body);
    const newLivre = new Livre({
      _id: new mongoose.Types.ObjectId(),
      code: 1,
      titre: "livre 1",
      description: "livre content 1",
      auteur: "ayoub",
    });

    const savedLivre = await newLivre.save();

    res.status(201).json(savedLivre);
  } catch (error) {
    console.error("Error creating livre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

routes.get("/:livreId", (req, res) => {
  let livreId = req.params.livreId;

  Livre.find(livreId).then((li) => {
    if (li) {
      return res.status(200).json({ livre: li });
    } else {
      return res.status(404).json({ msg: "livre not found !" });
    }
  });
});

export default routes;
