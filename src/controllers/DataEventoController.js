const DataEvento = require("../models/DataEvento");

class DataEventoController {
  async store(req, res) {
    req.body.evento;
    const dataEvento = await DataEvento.create({
      evento: req.body.evento,
      data: req.body.data,
      horario: req.body.horario,
      local: req.body.local,
      pedidos: req.body.pedidos
    });
    return res.json(dataEvento);
  }

  async show(req, res) {
    const dataEvento = await DataEvento.findById(req.params.id).populate(
      "pedidos"
    );
    return res.json(dataEvento);
  }
}
module.exports = new DataEventoController();
