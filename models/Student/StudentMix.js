<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));

const studentfulldata = mongodb.Schema({
    StudentID: {
        type: Number
    },
    StudentName: {
        type: String
    },
    StudentNumber: {
        type: String
    },
    ParentsNumber: {
        type: String
    },
    TeacherName: {
        type: String
    },
    CourseCode: {
        type: String
    },
    coursegrade: {
        type: String
    },
    courseName: {
        type: String
    },
    courseDay: {
        type: String
    },
    courseTime: {
        type: String
    },
    courseCost: {
        type: Number,
    },
});

module.exports = mongodb.model('StudentData', studentfulldata);
=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));

const studentfulldata = mongodb.Schema({
    StudentID: {
        type: Number
    },
    StudentName: {
        type: String
    },
    StudentNumber: {
        type: String
    },
    ParentsNumber: {
        type: String
    },
    TeacherName: {
        type: String
    },
    CourseCode: {
        type: String
    },
    coursegrade: {
        type: String
    },
    courseName: {
        type: String
    },
    courseDay: {
        type: String
    },
    courseTime: {
        type: String
    },
    courseCost: {
        type: Number,
    },
});

module.exports = mongodb.model('StudentData', studentfulldata);
>>>>>>> InCompleated"
