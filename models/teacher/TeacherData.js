<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const TeacherData = mongodb.Schema({
    TeacherStaticID: {
        type: Number,
    },
    TeacherCourseCounter: {
        type: Number
    },
    CourseCode: {
        type: String,
        required: true
    },
    TeacherCourseGrade: {
        type: String,
        required: true
    },
    TeacherCourseTime: {
        required: true,
        type: {
            CourseDay: String,
            CourseTime: String
        },
    },
    TotalCost: {
        required: true,
        type: Number
    },
    TeacherCost: {
        required: true,
        type: Number
    },
    CenterCost: {
        required: true,
        type: Number
    }
});
=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const TeacherData = mongodb.Schema({
    TeacherStaticID: {
        type: Number,
    },
    TeacherCourseCounter: {
        type: Number
    },
    CourseCode: {
        type: String,
        required: true
    },
    TeacherCourseGrade: {
        type: String,
        required: true
    },
    TeacherCourseTime: {
        required: true,
        type: {
            CourseDay: String,
            CourseTime: String
        },
    },
    TotalCost: {
        required: true,
        type: Number
    },
    TeacherCost: {
        required: true,
        type: Number
    },
    CenterCost: {
        required: true,
        type: Number
    }
});
>>>>>>> InCompleated"
module.exports = mongodb.model('TeacherInfo', TeacherData);