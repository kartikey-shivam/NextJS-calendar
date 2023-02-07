const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const user = require('./routes/userRoute');
const calendar = require('./routes/calendarRoutes');
const globalErrorHandler = require('./controller/errorController');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use('/user', user);
app.use('/calendar', calendar);
app.use(globalErrorHandler);

module.exports = app;
