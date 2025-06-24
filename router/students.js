const router = require("express").Router()
const dbconn = require("../config/dbconfig")
router.get('/', (req, res) => {
    dbconn.query("SELECT * FROM students", (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    });

});

router.get("/:id", (req, res) => {
    const id = req.params.id
    dbconn.query(`SELECT * FROM students WHERE student_id = '${id}'`, (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    })
});

router.post("/", (req, res) => {
    const { name, age, gender, address } = req.body;
    // const sql = `INSERT INTO students(name,age,gender,address) VALUES('${name}','${age}', '${gender}','${address}')`;
    const sql = `INSERT INTO students(name,age,gender,address) VALUES(?,?,?,?)`;
    dbconn.query(sql,[name, age, gender, address], (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    })
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, age, gender, address } = req.body;
    const sql = `UPDATE students SET name= '${name}', age = '${age}', gender = '${gender}', address = '${address}' WHERE student_id = '${id}' `;
    dbconn.query(sql,  (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    })
});

router.delete("/:id", (req, res)=> {
    const id = req.params.id;
    sql = `DELETE FROM students WHERE student_id = '${id}'`;
    dbconn.query(sql,  (err, resp) => {
        if (err) { res.send(err) }
        res.send(resp)
    })
})

module.exports = router;