import mongoose, { model, Schema } from "mongoose";

const ClientSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
  },
  { versionKey: false }
);

ClientSchema.index({ name: 1 });

// Set the code field as the primary key

export default model("clients", ClientSchema);
