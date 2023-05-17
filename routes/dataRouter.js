const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

//ROUTE 1: FETCH ALL DATA
router.get("/get", async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
//ROUTE 2: CREATE NEW DATA
router.post("/create", (req, res) => {
  const { name, mobile, email } = req.body;
  Data.create({ name, mobile, email })
    .then((data) => {
      console.log("saved successfully");
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ error: err, message: "Something went wrong!" });
    });
});
//ROUTE 3: UPDATE THE DATA
router.put("/update/:id", (req, res) => {
  const { name, mobile, email } = req.body;
  const { id } = req.params;
  Data.findByIdAndUpdate(id, { name, mobile, email })
    .then((data) => {
      console.log("update successfully");
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ error: err, message: "Something went wrong!" });
    });
});
//ROUTE 4: DELETE THE DATA
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Data.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("deleted successfully");
    })
    .catch((err) => {
      res.status(500).send({ error: err, message: "Something went wrong!" });
    });
});

module.exports = router;
