'use strict';
const express = require('express');
const { User } = require('../models/index');

const routers = express.Router();
const bcrypt = require('bcrypt');

routers.post('/signup', async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const record = await User.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        res.status(403).send(`Error occurred ${error}`);
    }
});
module.exports = routers;