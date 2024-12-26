// app.js
const express = require('express');
const logger = require('./logger'); 

const app = express();

app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

// route for testing
app.get('/', (req, res) => {
  logger.debug('Debugging root route');
  res.send('Hello, world!');
});

//error route for testing error logging
app.get('/error', (req, res) => {
  logger.error('An error occurred on the /error route!');
  res.status(500).send('Internal Server Error');
});

app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
