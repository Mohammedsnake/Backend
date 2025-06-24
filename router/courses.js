const router = require("express").Router();
const dbconn = require("../config/dbconfig");

router.get("/", (req, res) => {
  dbconn.query("SELECT * FROM courses", (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("SELECT * FROM courses WHERE course_id = ?", [id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.post("/", (req, res) => {
  const { course_name, description, credits, instructor_id } = req.body;
  const sql = `INSERT INTO courses(course_name, description, credits, instructor_id) VALUES (?, ?, ?, ?)`;
  dbconn.query(sql, [course_name, description, credits, instructor_id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { course_name, description, credits, instructor_id } = req.body;
  const sql = `UPDATE courses SET course_name = ?, description = ?, credits = ?, instructor_id = ? WHERE course_id = ?`;
  dbconn.query(sql, [course_name, description, credits, instructor_id, id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  dbconn.query("DELETE FROM courses WHERE course_id = ?", [id], (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

module.exports = router;