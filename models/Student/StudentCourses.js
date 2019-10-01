<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const StudentsCourses = mongodb.Schema({
    // St
    StudentIDStatic: {
        type: Number
    },
    StudentCourseID: {
        required: true,
        type: Number,

    },
    CourseGrade: {
        type: String,
        required: true
    },
    StudentCourseInformation: {
        required: true,
        type: {
            CourseName: String,
            TeacherName: String,
            CourseCode: String,
            CourseDay: String,
            CourseTime: String
        }
    },
    StudentCourseCost: {
        type: Number,
        required: true
    }
});

=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const StudentsCourses = mongodb.Schema({
    // St
    StudentIDStatic: {
        type: Number
    },
    StudentCourseID: {
        required: true,
        type: Number,

    },
    CourseGrade: {
        type: String,
        required: true
    },
    StudentCourseInformation: {
        required: true,
        type: {
            CourseName: String,
            TeacherName: String,
            CourseCode: String,
            CourseDay: String,
            CourseTime: String
        }
    },
    StudentCourseCost: {
        type: Number,
        required: true
    }
});

>>>>>>> InCompleated"
module.exports = mongodb.model('StudentsCoursessAddeder', StudentsCourses);