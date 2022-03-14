'use strict';
const modelFolder = require('../models');
const express = require('express');
const routers = express.Router();
const bearerAuth = require('../middleware/bearerAuth');
const acl = require('../middleware/acl');
const {User} = require('../models/index')
routers.param("model",(req,res,next)=>{
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next()
    } else {
        next('invalid input')
    }
})
routers.post('/:model',bearerAuth(User),acl('create'),async(req,res)=>{
    let createdData = await req.model.create(req.body);
    res.status(201).send(createdData);
})

routers.get('/:model',bearerAuth(User),acl('read'),async(req,res)=>{
    let allData = await req.model.findAll();
    res.status(200).send(allData);

})
routers.get('/:model/:id',bearerAuth(User),acl('read'),async(req,res)=>{
    let id = req.params.id;
    let oneData = await req.model.findOne({where:{id:id}});
    res.status(200).send(oneData);

})

routers.put('/:model/:id',bearerAuth(User),acl('update'),async(req,res)=>{
    let objectData =req.body;
   let id = req.params.id;
    let updateData = await req.model.update(objectData,{where:{id:id}});
    res.status(201).send(`updated successfully`);
})

routers.delete('/:model/:id',bearerAuth(User),acl('delete'),async(req,res)=>{
    let id = req.params.id;
    let  deletedData = await req.model.destroy({where:{id:id}});
    res.status(200).json(`deleted successfully`);
})
module.exports = routers;
