<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const courses = mongodb.Schema({
    CourseCounter:{
        type:Number,
        required:true
    },
    CourseName: {
        type: String,
        required: true
    }
});

=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const courses = mongodb.Schema({
    CourseCounter:{
        type:Number,
        required:true
    },
    CourseName: {
        type: String,
        required: true
    }
});

>>>>>>> InCompleated"
module.exports = mongodb.model('addcourse', courses);