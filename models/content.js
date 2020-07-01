const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  isLoggedIn: {
    type: Boolean,
    required: true
  },
  adminDetails: {
    type: {},
    required: true,
  },
  home: {
    type: {},
    required: true,
  },
  mission: {
    type: {},
    required: true,
  },
  tutors: {
    type: {},
    required: true,
  },
  pastInterns: {
    type: {},
    required: true,
  },
  about: {
    type: {},
    required: true,
  },
  footer: {
    type: {},
    required: true,
  },
  manager: {
    type: {},
    required: true,
  },
  registrationForm: {
    type: {},
    required: true,
  },
}, {
  timestamps: true
});

const Content = mongoose.model("content", contentSchema);

module.exports = Content;