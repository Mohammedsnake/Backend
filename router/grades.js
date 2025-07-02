const router = require("express").Router();
const dbconn = require("../config/dbconfig");

router.get("/", (req, res) => {
  dbconn.query("SELECT * FROM grades", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("SELECT * FROM grades WHERE grade_id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const { student_id, course_id, grade, date_graded } = req.body;
  const sql = "INSERT INTO grades (student_id, course_id, grade, date_graded) VALUES (?, ?, ?, ?)";
  dbconn.query(sql, [student_id, course_id, grade, date_graded], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { student_id, course_id, grade, date_graded } = req.body;
  const sql = "UPDATE grades SET student_id = ?, course_id = ?, grade = ?, date_graded = ? WHERE grade_id = ?";
  dbconn.query(sql, [student_id, course_id, grade, date_graded, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("DELETE FROM grades WHERE grade_id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

module.exports = router;
