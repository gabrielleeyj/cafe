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
                email_address TEXT NOT NULL UNIQUE,
                phone_number TEXT NOT NULL UNIQUE CHECK(phone_number LIKE '8%' OR phone_number LIKE '9%' AND length(phone_number) = 8),
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
                start_date DATE NOT NULL,
                PRIMARY KEY (employee_id, cafe_id),
                FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
                FOREIGN KEY (cafe_id) REFERENCES cafes(id) ON DELETE CASCADE,
                CONSTRAINT unique_employee UNIQUE (employee_id)
            )
        `);
    });
}

module.exports = { db, init };

