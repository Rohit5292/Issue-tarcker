const mongoose = require('mongoose');

const projectSChema = new  mongoose.Schema({
name:{
type:String,
required:true
},
description:{
    type:String,
    required:true
},
author:{
    type:String,
    required:true
}
});

const project = mongoose.model('project',projectSChema);
module.exports = project;