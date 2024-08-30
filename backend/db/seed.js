const { db } = require('./database');
const { v4: uuidv4 } = require('uuid');

db.serialize(() => {
    // Insert seed data for cafes
    db.run(`INSERT INTO cafes (id, name, description, location) VALUES (?, ?, ?, ?)`, [uuidv4(), "Cafe Latte", "Cozy café with great coffee", "Downtown"]);
    db.run(`INSERT INTO cafes (id, name, description, location) VALUES (?, ?, ?, ?)`, [uuidv4(), "Brewed Bliss", "A calm spot for brewed coffee", "Midtown"]);
    db.run(`INSERT INTO cafes (id, name, description, location) VALUES (?, ?, ?, ?)`, [uuidv4(), "Espresso Express", "Quick service café for espresso lovers", "Uptown"]);
    
    // Insert seed data for employees
    db.run(`INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)`, ["UI1234567", "John Doe", "john@example.com", "81234567", "Male"]);
    db.run(`INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)`, ["UI1234568", "Jane Smith", "jane@example.com", "91234567", "Female"]);
    
    // Assign employees to cafes with start dates
    db.run(`INSERT INTO employee_cafe (employee_id, cafe_id, start_date) VALUES (?, ?, ?)`, ["UI1234567", "cafes-uuid-1", "2024-01-01"]);
    db.run(`INSERT INTO employee_cafe (employee_id, cafe_id, start_date) VALUES (?, ?, ?)`, ["UI1234568", "cafes-uuid-2", "2024-02-01"]);
});

