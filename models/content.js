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
  jointhemission: {
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
  About: {
    type: {},
    required: true,
  },
  Footer: {
    type: {},
    required: true,
  },
  communityManager: {
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