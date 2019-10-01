<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const Relation = mongodb.Schema({
    TeacherID: {
        type: Number,
    },
    TeacherName: {
        type: String,

    },
    TeacherNumber: {
        type: String,
    },
    CourseCode: {
        type: String
    },
    CourseName: {
        type: String,
    },
    CourseDay: {
        type: String
    },
    CourseTime: {
        type: String
    },
    CourseGrade: {
        type: String,
    },
    TotalCost: {
        type: String
    },
    TeacherCost: {
        type: String
    },
    CenterCost: {
        type: String
    }
});

=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const Relation = mongodb.Schema({
    TeacherID: {
        type: Number,
    },
    TeacherName: {
        type: String,

    },
    TeacherNumber: {
        type: String,
    },
    CourseCode: {
        type: String
    },
    CourseName: {
        type: String,
    },
    CourseDay: {
        type: String
    },
    CourseTime: {
        type: String
    },
    CourseGrade: {
        type: String,
    },
    TotalCost: {
        type: String
    },
    TeacherCost: {
        type: String
    },
    CenterCost: {
        type: String
    }
});

>>>>>>> InCompleated"
module.exports = mongodb.model('Relation', Relation)