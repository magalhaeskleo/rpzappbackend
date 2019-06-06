const express = require("express");

const routes = express.Router();

const DataEventoController = require("./controllers/DataEventoController");
const PedidosController = require("./controllers/PedidosController");

routes.post("/dataEvento", DataEventoController.store);
routes.post("/dataEvento/:id/pedidos", PedidosController.store);
routes.get("/dataEventoId/:id", DataEventoController.show);
routes.get("/dataEventoAll", DataEventoController.all);
routes.delete("/dataEventoDel/:id", DataEventoController.delete);
routes.delete("/dataEventoDelAll", DataEventoController.deleteAll);

routes.get("/teste", (req, res) => {
  return res.send("Hello word");
});

module.exports = routes;
