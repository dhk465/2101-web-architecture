const mongoose = require('mongoose');

const userCardSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true
  },
  cardID: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
});

// when deleting an entry, make sure to delete both card and user-card entries.

module.exports = mongoose.model('UserCard', userCardSchema);
