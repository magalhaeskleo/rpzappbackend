const mongoose = require("mongoose");

const Pedido = new mongoose.Schema(
  {
    idDataEvento: String,
    nomeMusica: { type: String, required: true },
    pedidoPor: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pedido", Pedido);
