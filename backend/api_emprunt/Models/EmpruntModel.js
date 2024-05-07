import mongoose from "mongoose";

const EmpruntSchema = new mongoose.Schema({
  livre: {
    id: { type: String, required: true },
    titre: { type: String, required: true },
  },
  client: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  dateEmprunt: { type: Date, default: Date.now },
  dateRetour: { type: Date, default: null },
});

const Emprunt = mongoose.model("Emprunt", EmpruntSchema);

export default Emprunt;
