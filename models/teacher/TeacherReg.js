<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const TeacherREG = mongodb.Schema({
    TeacherID: {
        type: Number,
    },
    TeacherName: {
        type: String,
        required: true
    },
    TeacherNumber: {
        type: String,
        required: true
    },
    TeacherCourse: {
        type: String,
        required: true
    },
});

=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const TeacherREG = mongodb.Schema({
    TeacherID: {
        type: Number,
    },
    TeacherName: {
        type: String,
        required: true
    },
    TeacherNumber: {
        type: String,
        required: true
    },
    TeacherCourse: {
        type: String,
        required: true
    },
});

>>>>>>> InCompleated"
module.exports = mongodb.model('TeacherRegisteration', TeacherREG);