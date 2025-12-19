const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    logger: true, // logs détaillés
    debug: true,  // affichage du protocole SMTP
  });
  
  

transporter.verify((err, success) => {
  if (err) console.error("❌ SMTP Error:", err);
  else console.log("✅ SMTP prêt à envoyer les emails");
});

module.exports = transporter;
