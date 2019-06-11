const DataEvento = require("../models/DataEvento");

class DataEventoController {
  async store(req, res) {
    const dataEvento = await DataEvento.create({
      evento: req.body.evento,
      data: req.body.data,
      horario: req.body.horario,
      local: req.body.local,
      pedidos: req.body.pedidos,
      nomeLista: req.body.nomeLista
    });
    return res.json(dataEvento);
  }

  async show(req, res) {
    const dataEvento = await DataEvento.findById(req.params.id).populate(
      "pedidos"
    );
    return res.json(dataEvento);
  }
  async delete(req, res) {
    const dataEvento = await DataEvento.findByIdAndDelete(req.params.id);
    return res.json({ status: "ok" });
  }
  async deleteAll(req, res) {
    const dataEvento = await DataEvento.deleteMany();
    return res.json({ status: "ok" });
  }

  async all(req, res) {
    const dataEvento = await DataEvento.find().populate("pedidos");
    return res.json(dataEvento);
  }
}
module.exports = new DataEventoController();
