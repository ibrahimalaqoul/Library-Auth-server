'use strict';
const express = require('express');
const cors = require('cors');
const errorhandler = require('./auth/errorHandler/errorHandler');
const  notFound = require('./auth/errorHandler/404');
const signup = require('./auth/routers/signup');
const signin = require('./auth/routers/signin');
const libraryRoute = require('./auth/routers/LibraryRoute')
const app = express();
app.use(express.json());
app.use(cors());
app.use(signup);
app.use(signin);

app.use('/api/v2/',libraryRoute);

app.get('/',(req,res)=>{
    res.status(200).send('Library HOME Page');
});



app.use(errorhandler);
app.use('*',notFound);

function start(port) {
    app.listen(port,()=>{
        console.log(`running on port ${port}`)
    })
}

module.exports = {
    app: app,
    start: start,
}