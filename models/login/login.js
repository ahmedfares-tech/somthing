<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
var passportLocalMongoose = require('passport-local-mongoose');

const users = mongodb.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loginvalue:{
        type:Boolean,
        required:true
    }
})
users.plugin(passportLocalMongoose)
=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
var passportLocalMongoose = require('passport-local-mongoose');

const users = mongodb.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loginvalue:{
        type:Boolean,
        required:true
    }
})
users.plugin(passportLocalMongoose)
>>>>>>> InCompleated"
module.exports = mongodb.model('logindata', users)