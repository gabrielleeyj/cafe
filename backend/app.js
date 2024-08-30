const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./db/database');
const cafeRoutes = require('./routes/cafeRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const { errorHandler } = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();

// Initialize DB and seed data
db.init();
require('./db/seed');

// Routes
app.use('/cafes', cafeRoutes);
app.use('/employees', employeeRoutes);

// Middleware
// Error handling middleware
app.use(cors());
app.use(errorHandler);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(helmet()); // for secure http headers

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
