require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  logger: true,
  debug: true
});

transporter.verify()
  .then(() => console.log("✅ SMTP prêt"))
  .catch(err => console.error("❌ Vérification SMTP échouée :", err));

transporter.sendMail({
  from: process.env.SMTP_USER,
  to: "ton.email@example.com", // change ici
  subject: "Test Nodemailer",
  text: "Ceci est un test"
})
.then(info => console.log("✅ Email envoyé :", info.response))
.catch(err => console.error("❌ Envoi échoué :", err));
