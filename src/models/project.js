const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  administrator: { type: String, required: true },
  editor: { type: String, required: false },
  invite: { type: String, required: false }
});

module.exports = mongoose.model('Project', projectSchema);