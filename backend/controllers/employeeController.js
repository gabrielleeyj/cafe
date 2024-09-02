const { db } = require('../db/database');
const { v4: uuidv4 } = require('uuid');

// GET /employees
exports.getEmployees = (req, res) => {
  let sql = `
        SELECT employees.*, cafes.name AS cafe, 
               IFNULL(julianday('now') - julianday(employee_cafe.start_date), 0) AS days_worked
        FROM employees
        LEFT JOIN employee_cafe ON employees.id = employee_cafe.employee_id
        LEFT JOIN cafes ON employee_cafe.cafe_id = cafes.id
    `;
  const params = [];
  if (req.query.cafe) {
    sql += ` WHERE cafes.name = ?`;
    params.push(req.query.cafe);
  }
  sql += ` ORDER BY days_worked DESC`;

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ employees: rows });
  });
};

// POST /employee
exports.createEmployee = (req, res) => {
  const { name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
  const id = uuidv4();

  db.run(
    `INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)`,
    [id, name, email_address, phone_number, gender],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      // Assign to cafe if provided
      if (cafe_id && start_date) {
        db.run(
          `INSERT INTO employee_cafe (employee_id, cafe_id, start_date) VALUES (?, ?, ?)`,
          [id, cafe_id, start_date],
          function(err) {
            if (err) {
              return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ id });
          }
        );
      } else {
        res.status(201).json({ id });
      }
    }
  );
};

// PUT /employee
exports.updateEmployee = (req, res) => {
  const { id, name, email_address, phone_number, gender, cafe, start_date } = req.body;

  db.run(
    `UPDATE employees SET name = ?, email_address = ?, phone_number = ?, gender = ? WHERE id = ?`,
    [name, email_address, phone_number, gender, id],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }

      // Update or insert relationship with cafe
      if (cafe) {
        db.run(
          `REPLACE INTO employee_cafe (employee_id, cafe_id, start_date) VALUES (?, ?, ?)`,
          [id, cafe, start_date],
          function(err) {
            if (err) {
              return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ id });
          }
        );
      } else {
        res.status(200).json({ id });
      }
    }
  );
};

// DELETE /employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.body;
  db.run(
    `DELETE FROM employees WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(200).json({ message: "Employee deleted successfully" });
    }
  );
};

