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

  async emailSendPedidos(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    var auth = {
      key: "AIzaSyAiKVJe8AaxBFcHymB6I2JT7 - NB4ZBvsiU",
      AuthorizationCode:
        "4/aQHikUUwcld1Y-NcOYggGzyOk604PD7O4u_6dT0AeHcT3itB0fYW_hw4DeYNHD2oyNdE06uCixpaLVQkL_q5has",
      type: "oauth2",
      user: "magalhaeskleo@gmail.com",
      clientId:
        "337740245408-atm1l6i9f3pcekvgejv13omn58bitui7.apps.googleusercontent.com",
      clientSecret: "Y5iia34GjWSgOPcRuGd8VsDUN",
      refreshToken: "1/_DGym2rLrzTjsg2SNh9la4yPTgZvUJJdB3UMFldP_ac"
    };

    const dataEvento = await DataEvento.findById(req.params.id).populate(
      "pedidos"
    );

    nodemailer.createTestAccount((err, account) => {
      const itens = dataEvento.pedidos.map(item => {
        return `<li><b>${item.nomeMusica}</b> pedido por :${
          item.pedidoPor
        }</li>`;
      });

      const htmlEmail = `<h3>Pedidos</h3> <ul> ${itens}</li> </ul> `;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: auth
      });

      const mailOptions = {
        from: "magalhaeskleo@gmail.com",
        to: "gruporpzmuitoprazer@gmail.com",
        subject: `Pedidos para ${dataEvento.evento} na data ${
          dataEvento.data
        } `,
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
    next();
    return res.json(dataEvento.pedidos);
  }
}
module.exports = new PedidosController();
