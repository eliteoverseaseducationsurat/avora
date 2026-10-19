const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    interest: { type: String, default: 'Perfumes' },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);