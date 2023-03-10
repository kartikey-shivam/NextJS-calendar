const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception. Shutting down');
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require('./app');
const { response } = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log('DB connected successfully...');
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection');
  console.log('Shutting down the server...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
