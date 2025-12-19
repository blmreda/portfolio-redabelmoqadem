const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String,
    required: true,
    trim: true
  },
  details: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    default: new Date().getFullYear().toString()
  },
  category: {
    type: String,
    default: 'Web Development'
  },
  featured: {
    type: Boolean,
    default: false
  },
  technologies: {
    type: [String],
    default: []
  },
  features: {
    type: String,
    trim: true
  },
  imageUrl: { 
    type: String,
    trim: true
  },
  link: { 
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  }
}, { 
  timestamps: true 
});

// Index pour améliorer les performances de recherche
projectSchema.index({ title: 'text', description: 'text' });
projectSchema.index({ featured: -1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);