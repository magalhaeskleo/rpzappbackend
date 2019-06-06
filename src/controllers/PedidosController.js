const Pedido = require("../models/Pedido");
const DataEvento = require("../models/DataEvento");

class PedidosController {
  async store(req, res) {
    const dataEvento = await DataEvento.findById(req.params.id);

    const pedido = await Pedido.create({
      nomeMusica: req.body.nomeMusica,
      pedidoPor: req.body.pedidoPor
    });

    dataEvento.pedidos.push(pedido);

    await dataEvento.save();

    return res.json(pedido);
  }
}
module.exports = new PedidosController();
