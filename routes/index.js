const express = require("express");
const conn = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  conn.query("SELECT * FROM cafeteria.trainees;", (err, results) => {
    if (!err) console.log(results);
    res.render("home");
  });
});
module.exports = router;
