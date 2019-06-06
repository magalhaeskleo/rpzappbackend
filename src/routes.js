const express = require("express");

const routes = express.Router();

const DataEventoController = require("./controllers/DataEventoController");
const PedidosController = require("./controllers/PedidosController");

routes.post("/dataEvento", DataEventoController.store);
routes.post("/dataEvento/:id/pedidos", PedidosController.store);
routes.get("/dataEvento/:id", DataEventoController.show);
routes.get("/dataEvento", DataEventoController.all);

routes.get("/teste", (req, res) => {
  return res.send("Hello word");
});

module.exports = routes;
