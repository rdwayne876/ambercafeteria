const express = require("express");
const conn = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("orders/view", {});
});
router.get("/add", (req, res) => {
  res.render("orders/add", {});
});

router.post("/add", (req, res) => {
  let data = {
    first_nm: req.body.first_nm,
    last_nm: req.body.last_nm,
    meat: req.body.meat,
    side: req.body.side,
    juice: req.body.juice,
    date: req.body.date,
  };

  let sqlQuery = "INSERT INTO lunches SET ?";
  console.log(data);
  conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    // res.send(JSONResponse(results));
    res.redirect("/orders/lunchorders");
  });
});

router.post("/lunchorders", function (req, res, next) {
  var date = req.body.date;
  let sql = `SELECT tr.first_nm AS First_Name, tr.last_nm AS Last_Name,
  fd.food AS Starch, mt.meat AS Meat, sd.side AS Side, j.juice
  AS Juice, l.date AS Date FROM cafeteria.lunches AS l
 JOIN cafeteria.trainees AS tr ON l.trainee_id = tr.trainee_id
 JOIN cafeteria.food AS fd ON l.food_id = fd.food_id
 JOIN cafeteria.meat AS mt ON l.meat_id = mt.meat_id
 JOIN cafeteria.sides AS sd ON l.side_id = sd.side_id
 JOIN cafeteria.juices AS j ON l.juice_id = j.juice_id
 WHERE l.date LIKE '%${date}%';`;
  conn.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    // res.send(rows);
    res.render("lunchorder", {
      data: rows,
    });
  });
});

router.get("/editLunch/:id", (req, res) => {
  id = req.params.id;
  conn.query(
    `SELECT tr.first_nm AS First_Name, tr.last_nm AS Last_Name, fd.name AS Starch, mt.name AS Meat, sd.name AS Side, j.name AS Juice, l.date AS Date l.id AS ID FROM cafeteria.lunches AS l JOIN cafeteria.trainees AS tr ON l.trainee_id = tr.trainee_id JOIN cafeteria.food AS fd ON l.food_id = fd.food_id   JOIN cafeteria.meat AS mt ON l.meat_id = mt.meat_id JOIN cafeteria.sides AS sd ON l.side_id = sd.side_id JOIN cafeteria.juices AS j ON l.juice_id = j.juice_id WHERE id = ${id}`,
    (err, rows) => {
      if (err) throw err;
      res.render("editForm", {
        order: rows,
      });
    }
  );
});

// router.get("/lunch", (req, res) => {
//   let sql = `SELECT tr.first_nm AS First_Name, tr.last_nm AS Last_Name, fd.name AS Starch, mt.name AS Meat, sd.name AS Side, j.name AS Juice, l.date AS Date FROM cafeteria.lunches AS l JOIN cafeteria.trainees AS tr ON l.trainee_id = tr.trainee_id JOIN cafeteria.food AS fd ON l.food_id = fd.food_id   JOIN cafeteria.meat AS mt ON l.meat_id = mt.meat_id JOIN cafeteria.sides AS sd ON l.side_id = sd.side_id JOIN cafeteria.juices AS j ON l.juice_id = j.juice_id WHERE l.date = ${req.body.date}`;
//   conn.query(sql, function (err, rows) {
//     if (err) throw err;
//     res.render("view", {
//       lunch: rows,
//     });
//   });
// });
module.exports = router;
