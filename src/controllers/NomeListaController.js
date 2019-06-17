const NomeLista = require("../models/NomeLista");
const DataEvento = require("../models/DataEvento");
const nodemailer = require("nodemailer");

class NomeListaController {
  async store(req, res) {
    const dataEvento = await DataEvento.findById(req.params.id);

    const nomeLista = await NomeLista.create({
      nome: req.body.nome,
      phone: req.body.phone
    });

    dataEvento.nomeLista.push(nomeLista);

    await dataEvento.save();

    return res.json(nomeLista);
  }
  async emailSendNomeLista(req, res) {
    /* var auth = {
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
*/
    const dataEvento = await DataEvento.findById(req.params.id).populate(
      "nomeLista"
    );

    nodemailer.createTestAccount((err, account) => {
      const itens = dataEvento.nomeLista.map(item => {
        return `<li><b>${item.nome}</b> tel:${item.phone}</li>`;
      });

      const htmlEmail = `<h3>Nomes</h3><ul>${itens}</li></ul>`;

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
        subject: `Lista de nomes para ${dataEvento.evento} na data ${
          dataEvento.data
        }`,
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
module.exports = new NomeListaController();
