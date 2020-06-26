const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
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
});

const Content = mongoose.model("content", contentSchema);

module.exports = Content;