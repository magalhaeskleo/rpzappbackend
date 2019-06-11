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
    const dataEvento = await DataEvento.findById(req.params.id).populate(
      "nomeLista"
    );

    nodemailer.createTestAccount((err, account) => {
      const itens = dataEvento.nomeLista.map(item => {
        return `<li><b>${item.nome}</b> tel:${item.phone}</li>`;
      });

      const htmlEmail = `<h3>Nomes</h3> <ul> ${itens}</li> </ul> `;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
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
  }
}
module.exports = new NomeListaController();
