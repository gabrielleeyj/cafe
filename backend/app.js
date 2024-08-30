const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');
const cafeRoutes = require('./routes/cafeRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(bodyParser.json());

// Initialize DB and seed data
db.init();
require('./db/seed');

// Routes
app.use('/cafes', cafeRoutes);
app.use('/employees', employeeRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
