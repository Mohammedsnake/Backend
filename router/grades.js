const router = require("express").Router();
const dbconn = require("../config/dbconfig");

router.get("/", (req, res) => {
  dbconn.query("SELECT * FROM departments", (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("SELECT * FROM departments WHERE department_id = ?", [id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.post("/", (req, res) => {
  const { department_name, building_location } = req.body;
  const sql = "INSERT INTO departments(department_name, building_location) VALUES (?, ?)";
  dbconn.query(sql, [department_name, building_location], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { department_name, building_location } = req.body;
  const sql = "UPDATE departments SET department_name = ?, building_location = ? WHERE department_id = ?";
  dbconn.query(sql, [department_name, building_location, id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("DELETE FROM departments WHERE department_id = ?", [id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

module.exports = router;