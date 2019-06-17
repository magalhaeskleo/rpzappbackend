const google = require("googleapis");

const Pedido = require("../models/Pedido");
const DataEvento = require("../models/DataEvento");
const nodemailer = require("nodemailer");
const gmail = google.gmail_v1;
// const { OAuth2 } = google.auth;

class PedidosController {
  /*
  oAuth = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    `${baseRedirectUri}${rootUrlAuth}/sucesso`
  );
*/

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
    /*
    const AUTORIZATION_CODE =
      "4/aQHikUUwcld1Y-NcOYggGzyOk604PD7O4u_6dT0AeHcT3itB0fYW_hw4DeYNHD2oyNdE06uCixpaLVQkL_q5has";
    const KEY_APP = "AIzaSyAiKVJe8AaxBFcHymB6I2JT7 - NB4ZBvsiU";
*/
    const TYPE = "oauth2";
    const USER = "magalhaeskleo@gmail.com";
    const CLIENT_ID =
      "337740245408-atm1l6i9f3pcekvgejv13omn58bitui7.apps.googleusercontent.com";
    const CLIENT_SECRET = "Y5iia34GjWSgOPcRuGd8VsDUN";
    const REFRESH_TOKEN = "1/_DGym2rLrzTjsg2SNh9la4yPTgZvUJJdB3UMFldP_ac";

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
          return console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  }
}
module.exports = new PedidosController();
