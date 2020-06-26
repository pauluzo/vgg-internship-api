const express = require("express");
const router = express.Router();
const PastIntern = require("../models/pastIntern");
const Facilitators = require("../models/facilitators");
const Content = require("../models/content");

router.get("/", async (req, res) => {
  try {
    const pastInterns = await PastIntern.find({});
    const facilitators = await Facilitators.find({});
    const content = await Content.find({});
    res.send({ pastInterns, facilitators, content });
  } catch (error) {
    res.status(500).send({ remark: "Internal Server Error", error: error });
  }
});

module.exports = router;
