const mongoose = require('mongoose');
const Icon = require('./icon');
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

const cardSchema = new mongoose.Schema({
  icon: {
    type: Icon,
    required: true
  },
  priority: {
    type: Number,
    required: true,
    unique: true
  },
  colorFrame: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true,
    default: '#9ddfd3'
  },
  colorBackground: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true,
    default: '#31326f'
  },
  colorText: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true,
    default: '#dbf6e9'
  },
  label: {
    type: String,
    required: true,
    default: 'Card#',
    unique: true
  },
  text: {
    type: String,
    required: false
  }
});

// when deleting an entry, make sure to delete both card and user-card entries.

module.exports = mongoose.model('Card', cardSchema);
