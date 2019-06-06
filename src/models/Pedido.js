const mongoose = require("mongoose");

const Pedido = new mongoose.Schema(
  {
    idDataEvento: String,
    nomeMusica: String,
    pedidoPor: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pedido", Pedido);
