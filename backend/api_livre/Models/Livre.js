import { model, Schema } from "mongoose";

const LivreSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    titre: { type: String, required: true },
    description: { type: String },
    auteur: { type: String, required: true },
  },
  { _id: false }
);

LivreSchema.set("primaryKey", "code");

export default model("livre", LivreSchema);
