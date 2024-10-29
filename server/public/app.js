const express = require('express'); 
const cors = require('cors');
require('dotenv').config(); 

const sequelize = require('../utils/db');

const app = express();
const SERVER_PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.listen(SERVER_PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    console.log(`Server is running on port ${SERVER_PORT}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); 
  }
});

const loanRouter = require('../routes/loan');

app.use('/loan', loanRouter); 

module.exports = app;