<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const CoursesCodes = mongodb.Schema({
    TeacherID: {
        type: Number,
        required: true
    },
    TeacherName: {
        type: String,
        required: true
    },
    CourseCode: {
        type: String,
        required: true
    }
});


=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const CoursesCodes = mongodb.Schema({
    TeacherID: {
        type: Number,
        required: true
    },
    TeacherName: {
        type: String,
        required: true
    },
    CourseCode: {
        type: String,
        required: true
    }
});


>>>>>>> InCompleated"
module.exports = mongodb.model('COCODE', CoursesCodes);