<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const Grades = mongodb.Schema({
    GradeCounter: {
        type: Number,
    },
    GradeLevel: {
        type: String,
        required: true
    }
});

=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const Grades = mongodb.Schema({
    GradeCounter: {
        type: Number,
    },
    GradeLevel: {
        type: String,
        required: true
    }
});

>>>>>>> InCompleated"
module.exports = mongodb.model('grade', Grades)