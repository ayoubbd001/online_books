import mongoose, { model, Schema } from "mongoose";

const LivreSchema = new Schema({
  code: { type: Number, required: true, unique: true },
  titre: { type: String, required: true },
  description: { type: String },
  auteur: { type: String, required: true },
});

LivreSchema.set("primaryKey", "code");

export default model("livre", LivreSchema);
