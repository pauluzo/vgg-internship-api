const express = require("express");
const router = express.Router();
const Content = require("../models/content");

router.get("/", async (req, res) => {
  await Content.find({})
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      res.status(500).send({ remark: "Internal Server Error", error: err });
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  console.log("request received");

  Content.findByIdAndUpdate(id, data)
  .then(() => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;