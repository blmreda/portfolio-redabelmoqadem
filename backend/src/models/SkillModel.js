const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String }, // Ex: "Débutant", "Intermédiaire", "Avancé"
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);
