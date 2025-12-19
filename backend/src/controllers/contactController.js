const Contact = require("../models/ContactModel");
const transporter = require("../config/mailer");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Tous les champs sont requis" 
      });
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Adresse email invalide" 
      });
    }

    // Sauvegarde dans MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Vérifiez que votre destinataire est correct
    // REMPLACEZ cette variable par VOTRE adresse email personnelle
    const YOUR_PERSONAL_EMAIL = "votre.email@personnel.com"; // ← À MODIFIER
    const YOUR_SITE_NAME = "Portfolio Dev";

    // 1. Email au propriétaire (notification)
    const ownerMail = {
      from: `"${YOUR_SITE_NAME}" <${process.env.SMTP_USER}>`,
      to: YOUR_PERSONAL_EMAIL, // Votre email personnel, pas celui du SMTP
      subject: `📩 Nouveau message de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📨 Nouveau message reçu</h1>
            </div>
            <div class="content">
              <h2>Détails du contact</h2>
              <p><strong>👤 Nom:</strong> ${name}</p>
              <p><strong>✉️ Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>📅 Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
              
              <div class="message-box">
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p>
                <a href="mailto:${email}" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  ✉️ Répondre à ${name}
                </a>
              </p>
            </div>
            <div class="footer">
              <p>Cet email a été envoyé depuis le formulaire de contact de votre portfolio.</p>
              <p>© ${new Date().getFullYear()} ${YOUR_SITE_NAME}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // 2. Email de confirmation à l'expéditeur
    const confirmationMail = {
      from: `"${YOUR_SITE_NAME}" <${process.env.SMTP_USER}>`,
      to: email, // Email du visiteur
      subject: "✅ Confirmation de réception - Votre message",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00b09b 0%, #96c93d 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; border-left: 4px solid #00b09b; padding: 15px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
            .guarantee { background: #e8f5e9; border: 1px solid #c8e6c9; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Message bien reçu !</h1>
            </div>
            <div class="content">
              <h2>Bonjour ${name},</h2>
              <p>Je vous confirme que votre message a bien été reçu et sera traité dans les plus brefs délais.</p>
              
              <div class="message-box">
                <h3>Votre message :</h3>
                <p><em>"${message}"</em></p>
              </div>
              
              <div class="guarantee">
                <h3>⏱️ Délai de réponse garanti :</h3>
                <ul>
                  <li><strong>Projets urgents :</strong> 2-4 heures</li>
                  <li><strong>Demandes standards :</strong> Moins de 24h</li>
                  <li><strong>Devis détaillés :</strong> Sous 48h</li>
                </ul>
              </div>
              
              <p><strong>En attendant, voici mes coordonnées :</strong></p>
              <p>📧 Email : <a href="mailto:${YOUR_PERSONAL_EMAIL}">${YOUR_PERSONAL_EMAIL}</a></p>
              <p>📱 Téléphone : +33 6 12 34 56 78</p>
            </div>
            <div class="footer">
              <p><strong>🔒 Confidentialité :</strong> Vos informations sont traitées de manière confidentielle et ne seront jamais partagées avec des tiers.</p>
              <p>© ${new Date().getFullYear()} ${YOUR_SITE_NAME}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Envoi des emails en séquentiel (plus fiable)
    await transporter.sendMail(ownerMail);
    await transporter.sendMail(confirmationMail);

    res.status(201).json({ 
      success: true, 
      message: "Message envoyé avec succès !" 
    });

  } catch (err) {
    console.error("❌ Erreur contact:", err);
    
    // Erreurs spécifiques
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Ce message a déjà été envoyé" 
      });
    }
    
    // Erreur d'envoi d'email
    if (err.responseCode) {
      return res.status(500).json({ 
        success: false, 
        message: "Erreur lors de l'envoi de l'email. Veuillez vérifier la configuration SMTP."
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Erreur serveur lors de l'envoi",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};