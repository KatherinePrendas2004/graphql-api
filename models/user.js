const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ['pending', 'active'], default: 'pending' },
  pin: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  birthDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  tempCode: { type: String },
  tempCodeExpires: { type: Date }
});

module.exports = mongoose.model('User', userSchema);