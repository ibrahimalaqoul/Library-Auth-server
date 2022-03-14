'use strict';
'use strict';
const express = require ('express');
const routers = express.Router();
const basicAuth = require('../middleware/basicAuth');
const {User} = require('../models/index')

routers.post('/signin',basicAuth(User),(req,res)=>{
res.status(201).send(req.user);
})



module.exports = routers;