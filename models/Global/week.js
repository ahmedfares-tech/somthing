<<<<<<< HEAD
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const weekdays = mongodb.Schema({

    weekdays: {
        type: String,
        required: true
    }
});

=======
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const weekdays = mongodb.Schema({

    weekdays: {
        type: String,
        required: true
    }
});

>>>>>>> InCompleated"
module.exports = mongodb.model('days', weekdays)