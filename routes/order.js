const express = require("express");
const conn = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("orders/view", {});
});

router.post("/lunchorders", function (req, res, next) {
  var date = req.body.date;
  let sql = `SELECT tr.first_nm AS First_Name, tr.last_nm AS Last_Name, fd.name AS Starch, mt.name AS Meat, sd.name AS Side, j.name AS Juice, l.date AS Date FROM cafeteria.lunches AS l JOIN cafeteria.trainees AS tr ON l.trainee_id = tr.trainee_id JOIN cafeteria.food AS fd ON l.food_id = fd.food_id   JOIN cafeteria.meat AS mt ON l.meat_id = mt.meat_id JOIN cafeteria.sides AS sd ON l.side_id = sd.side_id JOIN cafeteria.juices AS j ON l.juice_id = j.juice_id WHERE l.date LIKE '%${date}%';`;
  conn.query(sql, (err, rows) => {
    if (err) throw err;
    // res.send(rows);
    res.render("lunchorder", {
      data: rows,
    });
  });
});

router.get("/lunch", (req, res) => {
  //   let sql = `SELECT tr.first_nm AS First_Name, tr.last_nm AS Last_Name, fd.name AS Starch, mt.name AS Meat, sd.name AS Side, j.name AS Juice, l.date AS Date FROM cafeteria.lunches AS l JOIN cafeteria.trainees AS tr ON l.trainee_id = tr.trainee_id JOIN cafeteria.food AS fd ON l.food_id = fd.food_id   JOIN cafeteria.meat AS mt ON l.meat_id = mt.meat_id JOIN cafeteria.sides AS sd ON l.side_id = sd.side_id JOIN cafeteria.juices AS j ON l.juice_id = j.juice_id WHERE l.date = ${req.body.date}`;
  //   conn.query(sql, function (err, rows) {
  //     if (err) throw err;
  //     res.render("view", {
  //       lunch: rows,
  //     });
  //   });
});
module.exports = router;
