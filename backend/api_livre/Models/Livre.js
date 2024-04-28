import mongoose, { model, Schema } from "mongoose";

const LivreSchema = new Schema({
  code: { type: Number, required: true, unique: true }, // Define code field as primary key
  titre: { type: String, required: true },
  description: { type: String },
  auteur: { type: String, required: true },
});

// Set the code field as the primary key
LivreSchema.set("primaryKey", "code");

export default model("livre", LivreSchema);
