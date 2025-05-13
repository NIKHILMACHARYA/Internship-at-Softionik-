
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

// bring routes
const testRoute=require('./routes/testRouter');

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
