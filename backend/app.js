const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');

const app = express();

app.use(bodyParser.json());

db.Init();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
