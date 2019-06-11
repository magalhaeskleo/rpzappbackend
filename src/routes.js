const express = require("express");
const routes = express.Router();

const DataEventoController = require("./controllers/DataEventoController");
const PedidosController = require("./controllers/PedidosController");
const NomeListaController = require("./controllers/NomeListaController");

//post
routes.post("/dataEvento", DataEventoController.store);
routes.post("/dataEvento/:id/pedidos", PedidosController.store);
routes.post("/dataEvento/:id/nomeLista", NomeListaController.store);

//envio de email
routes.post(
  "/dataEvento/:id/emailSendPedidos",
  PedidosController.emailSendPedidos
);
routes.post(
  "/dataEvento/:id/emailSendNomeLista",
  NomeListaController.emailSendNomeLista
);

//get
routes.get("/dataEventoId/:id", DataEventoController.show);
routes.get("/dataEventoAll", DataEventoController.all);

//delete
routes.delete("/dataEventoDel/:id", DataEventoController.delete);
routes.delete("/dataEventoDelAll", DataEventoController.deleteAll);

routes.get("/teste", (req, res) => {
  return res.send("Hello word");
});

module.exports = routes;
