const router = require("express").Router()
const dbconn = require("../config/dbconfig")
router.get('/', (req, res) => {
    dbconn.query("SELECT * FROM enrollments", (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    });

});

router.get("/:id", (req, res) => {
    const id = req.params.id
    dbconn.query(`SELECT * FROM enrollments WHERE student_id = '${id}'`, (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    })
});

router.post("/", (req, res) => {
    const { course_name, enrollment_date } = req.body;
    const sql = `INSERT INTO enrollments(course_name,enrollment_date) VALUES(?,?)`;
    dbconn.query(sql,[ course_name, enrollment_date ], (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    })
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { course_name, enrollment_date } = req.body;
    const sql = `UPDATE enrollments SET course_name= '${course_name}', enrollment_date = '${enrollment_date}' WHERE student_id = '${id}' `;
    dbconn.query(sql,  (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    })
});

router.delete("/:id", (req, res)=> {
    const id = req.params.id;
    sql = `DELETE FROM enrollments WHERE student_id = '${id}'`;
    dbconn.query(sql,  (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    })
})

module.exports = router;