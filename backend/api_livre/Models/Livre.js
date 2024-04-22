import { model, Schema } from "mongoose";

const LivreSchema = new Schema({
  code: { type: String, required: true, unique: true },
  titre: { type: String, required: true },
  description: { type: String },
  auteur: { type: String, required: true },
});

export default model("livre", LivreSchema);
