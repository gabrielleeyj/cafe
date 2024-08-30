const { db } = require('../db/database');
const { v4: uuidv4 } = require('uuid');

// GET /cafes
exports.getCafes = (req, res) => {
    let sql = `
        SELECT cafes.*, COUNT(employee_cafe.employee_id) AS employees
        FROM cafes
        LEFT JOIN employee_cafe ON cafes.id = employee_cafe.cafe_id
    `;
    const params = [];
    if (req.query.location) {
        sql += ` WHERE cafes.location = ?`;
        params.push(req.query.location);
    }
    sql += ` GROUP BY cafes.id ORDER BY employees DESC`;

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ cafes: rows });
    });
};

// POST /cafe
exports.createCafe = (req, res) => {
    const { name, description, location, logo } = req.body;
    const id = uuidv4();
    db.run(
        `INSERT INTO cafes (id, name, description, location, logo) VALUES (?, ?, ?, ?, ?)`,
        [id, name, description, location, logo || null],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ id });
        }
    );
};

// PUT /cafe
exports.updateCafe = (req, res) => {
    const { id, name, description, location, logo } = req.body;
    db.run(
        `UPDATE cafes SET name = ?, description = ?, location = ?, logo = ? WHERE id = ?`,
        [name, description, location, logo || null, id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: "Cafe not found" });
            }
            res.status(200).json({ id });
        }
    );
};

// DELETE /cafe
exports.deleteCafe = (req, res) => {
    const { id } = req.body;
    db.run(
        `DELETE FROM cafes WHERE id = ?`,
        [id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: "Cafe not found" });
            }
            res.status(200).json({ message: "Cafe deleted successfully" });
        }
    );
};

