const mongoose = require("mongoose");

const DataEvento = new mongoose.Schema(
  {
    evento: String,
    data: String,
    horario: String,
    local: String,
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pedido" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("DataEvento", DataEvento);
