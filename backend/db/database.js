const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFilePath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbFilePath);

function init() {
  db.serialize(() => {
    db.run(`
            CREATE TABLE IF NOT EXISTS employees (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email_address TEXT,
                phone_number TEXT NOT NULL UNIQUE CHECK(length(phone_number) = 8),
                gender TEXT NOT NULL CHECK(gender IN ('Male', 'Female'))
            )
        `);

    db.run(`
            CREATE TABLE IF NOT EXISTS cafes (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                logo BLOB,
                location TEXT NOT NULL
            )
        `);

    db.run(`
            CREATE TABLE IF NOT EXISTS employee_cafe (
                employee_id TEXT NOT NULL,
                cafe_id TEXT NOT NULL,
                start_date DATE DEFAULT CURRENT_DATE NOT NULL,
                PRIMARY KEY (employee_id, cafe_id),
                FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
                FOREIGN KEY (cafe_id) REFERENCES cafes(id) ON DELETE CASCADE,
                CONSTRAINT unique_employee UNIQUE (employee_id)
            )
        `);
  });
}

function checkDataExists(callback) {
  db.get('SELECT COUNT(*) AS count FROM cafes', (err, row) => {
    if (err) {
      callback(err);
      return;
    }
    const cafesExist = row.count > 0;

    db.get('SELECT COUNT(*) AS count FROM employees', (err, row) => {
      if (err) {
        callback(err);
        return;
      }
      const employeesExist = row.count > 0;
      callback(null, cafesExist, employeesExist);
    });
  });
}

module.exports = { db, init, checkDataExists };

