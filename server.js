const express = require('express');
const morgan = require('morgan');
var mongooses = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var https = require('https');
var fs = require('fs');
require('dotenv').config();
const path = require('path');

//Models

var test=require('./models/testModel');
var employee=require('./models/employeeModel');
var student = require('./models/studentModel');
var country = require('./models/countryModel');
var state = require('./models/stateModel');
var city = require('./models/cityModel');
var admin = require('./models/adminModel');
var image = require('./models/imageModel');


// bring routes
const testRoute=require('./routes/testRouter');
const studentRoute = require('./routes/studentRouter');
const countryRoute = require('./routes/countryRouter');
const stateRoute = require('./routes/stateRouter');
const cityRoute = require('./routes/cityRouter');
const adminRoute = require('./routes/adminRouter');
const imageRoute = require('./routes/imageRouter');


// app
const app = express();

// db

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,  
};
mongooses
    .connect(process.env.DATABASE_LOCAL, option)
    .then(() => console.log('DB connected')).catch(err => {
       console.log(err)
       console.log(err.message)
    });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'production') {
}
app.use(cors());

app.use('/public', express.static('public'));
// routes middleware

app.use('/api',testRoute);
app.use('/api', studentRoute);
app.use('/api', countryRoute);
app.use('/api', stateRoute);
app.use('/api', cityRoute);
app.use('/api', adminRoute);
app.use('/api', imageRoute);


// port
const port = process.env.PORT || 3243;
// var key = fs.readFileSync('./key.crt','utf8');
// var cert = fs.readFileSync('./cert.crt','utf8');
// var options = {
//   key: key,
//   cert: cert
// };

//   var httpsServer = https.createServer(options, app);

//   httpsServer.listen(port);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
