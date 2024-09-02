// ./db/seed.js
const { db } = require('./database');
const { v4: uuidv4 } = require('uuid');

function seedCafe() {
    db.serialize(() => {
        // Insert seed data for cafes
        db.run(`INSERT INTO cafes (id, name, description, location) VALUES (?, ?, ?, ?)`, [uuidv4(), "Cafe Latte", "Cozy café with great coffee", "Downtown"]);
        db.run(`INSERT INTO cafes (id, name, description, location) VALUES (?, ?, ?, ?)`, [uuidv4(), "Brewed Bliss", "A calm spot for brewed coffee", "Midtown"]);
        db.run(`INSERT INTO cafes (id, name, description, location) VALUES (?, ?, ?, ?)`, [uuidv4(), "Espresso Express", "Quick service café for espresso lovers", "Uptown"]);
    });
}

function seedEmployee() {
  db.serialize(() => {
    // Insert seed data for employees
    db.run(`INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)`, [uuidv4(), "John Doe", "john@example.com", "81234567", "Male"]);
    db.run(`INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)`, [uuidv4(), "Jane Smith", "jane@example.com", "91234567", "Female"]);
  });
}

const { checkDataExists } = require('./database');

checkDataExists((err, cafesExist, employeesExist) => {
    if (err) {
        console.error('Error checking if data exists:', err);
        return;
    }
    
    if (!cafesExist) {
      console.log('No cafe data found. Seeding data...');
      seedCafe();
    } else {
      console.log('Cafe data exists. Skipping...');
    }

    if (!employeesExist) {
        console.log('No employee data found. Seeding data...');
        seedEmployee();
    } else {
        console.log('Employee data exists. Skipping...');
    }
});

