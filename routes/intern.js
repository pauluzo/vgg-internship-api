const express = require("express");
const router = express.Router();
const Intern = require("../models/intern");
const { validationResult } = require("express-validator");
const xl = require('excel4node');

router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ message: errors.array() });
  }

  let {
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    dob,
    track,
    proficiency,
    city,
    state,
    country,
  } = req.body;

  let intern = await Intern.findOne({ email });
  if (intern)
    return res
      .status(400)
      .send({ message: "You have already registered for this internship" });

  intern = new Intern({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    track,
    proficiency,
    city,
    state,
    country,
    dateOfBirth: dob,
  });

  try {
    await intern.save();
    return res.status(200).send({
      message: "You have successfully registered for this internship",
      data: intern,
    });
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send({ message: "something failed" });
    }
  }
});

router.get('/', async (req, res) => {
  let internMap = await Intern.find();
  let interns = internMap.map((internData) => {
    let newData = {
      first_name: internData.firstName,
      last_name: internData.lastName,
      email: internData.email,
      phone_number: internData.phoneNumber,
      gender: internData.gender,
      track: internData.track,
      proficiency: internData.proficiency,
      city: internData.city,
      state: internData.state,
      country: internData.country,
      D_0_B: internData.dateOfBirth,
      Reg_Date: internData.registerationDate.toString(),
    }

    return newData;
  })

  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('VGG Internship Reg List');

  let style = wb.createStyle({
    font: {
      color: "#000000",
      size: 12,
    }
  });

  const formatToExcel = async() => {
    let objectTemplate = interns[0];
    let templateKeys = Object.keys(objectTemplate);

    async function cellLoop() {
      for(let i = 0; i < templateKeys.length; i++) {
        let key = templateKeys[i];
        ws.cell(1, i + 1)
        .string(key)
        .style(style);

        for(a = 0; a < interns.length; a++) {
          ws.cell(a + 2, i + 1)
          .string(interns[a][key])
          .style(style);
        }
      }
    }

    cellLoop()
    .then(_ => {
      return "excel sheet mapping, done";
    })
    .catch(err => {
      return err;
    })
  }

  const processRegistrationData = () => {
    let errorData = {};
    if(interns && interns.length > 0) {
      formatToExcel()
      .then(_ =>  {
        wb.write('RegistrationData.xlsx', res);
      })
      .catch(error => {
        errorData = {error: error}
        res.status(500).json('Error ' + errorData);
      })
    } else if(interns && interns.length <= 0) {
      errorData = {error: "There is no registered user yet."}
      res.status(500).json('Error ' + errorData);
    } else {
      errorData = {error: "Failed to fetch registtation details. Please try again."}
      res.status(500).json('Error ' + errorData);
    }
  }

  processRegistrationData();
})

module.exports = router;
