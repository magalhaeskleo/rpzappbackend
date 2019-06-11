const mongoose = require("mongoose");

const NomeLista = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    phone: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("NomeLista", NomeLista);
