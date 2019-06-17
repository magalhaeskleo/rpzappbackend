const Pedido = require("../models/Pedido");
const DataEvento = require("../models/DataEvento");
const nodemailer = require("nodemailer");

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

  async emailSendPedidos(req, res) {
    const dataEvento = await DataEvento.findById(req.params.id).populate(
      "pedidos"
    );

    nodemailer.createTestAccount((err, account) => {
      const itens = dataEvento.pedidos.map(item => {
        return `<li><b>${item.nomeMusica}</b> pedido por :${
          item.pedidoPor
        }</li>`;
      });
      console.log(item.nomeMusica);
      const htmlEmail = `<h3>Pedidos</h3><ul>${itens}</li></ul>`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
          user: "magalhaeskleo@gmail.com",
          pass: "Minhasenha"
        }
      });

      const mailOptions = {
        from: "magalhaeskleo@gmail.com",
        to: "gruporpzmuitoprazer@gmail.com",
        subject: `Pedidos para ${dataEvento.evento} na data ${dataEvento.data}`,
        html: htmlEmail
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  }
}
module.exports = new PedidosController();
