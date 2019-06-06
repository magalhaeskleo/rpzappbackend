const mongoose = require("mongoose");

const DataEvento = new mongoose.Schema(
  {
    evento: { type: String, required: true },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    local: { type: String, required: true },
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pedido" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("DataEvento", DataEvento);
