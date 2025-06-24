const router = require("express").Router();
const dbconn = require("../config/dbconfig");

router.get("/", (req, res) => {
  dbconn.query("SELECT * FROM attendance", (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("SELECT * FROM attendance WHERE student_id = ?", [id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.post("/", (req, res) => {
  const { student_id, course_id, date, status } = req.body;
  const sql = `INSERT INTO attendance(student_id, course_id, date, status) VALUES (?, ?, ?, ?)`;
  dbconn.query(sql, [student_id, course_id, date, status], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { course_id, date, status } = req.body;
  const sql = `UPDATE attendance SET course_id = ?, date = ?, status = ? WHERE attendance_id = ?`;
  dbconn.query(sql, [course_id, date, status, id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("DELETE FROM attendance WHERE attendance_id = ?", [id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

module.exports = router;