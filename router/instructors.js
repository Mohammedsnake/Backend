const router = require("express").Router();
const dbconn = require("../config/dbconfig");

router.get("/", (req, res) => {
  dbconn.query("SELECT * FROM instructors", (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("SELECT * FROM instructors WHERE instructor_id = ?", [id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.post("/", (req, res) => {
  const { first_name, last_name, email, department_id } = req.body;
  const sql = "INSERT INTO instructors(first_name, last_name, email, department_id) VALUES (?, ?, ?, ?)";
  dbconn.query(sql, [first_name, last_name, email, department_id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, department_id } = req.body;
  const sql = "UPDATE instructors SET first_name = ?, last_name = ?, email = ?, department_id = ? WHERE instructor_id = ?";
  dbconn.query(sql, [first_name, last_name, email, department_id, id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("DELETE FROM instructors WHERE instructor_id = ?", [id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

module.exports = router;