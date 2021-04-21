const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
    default: 'icon01.png'
  }
});

module.exports = mongoose.model('Icon', iconSchema);
