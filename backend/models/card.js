const mongoose = require('mongoose');

const regex = /^( http|https):\/\/(www\.)?([a-z0-9._])+([\w+\-\-._~:/?#[\]!$&’()*+,;=-])+(#?)/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => regex.test(link),
    },
    message: 'Передайте ссылку',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
