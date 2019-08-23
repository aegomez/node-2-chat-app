const moment = require('moment');

let date = moment(1234);
// date.add(100, "years").subtract(9, 'months');
console.log(date.format('MMM Do, YYYY - h:mm a'));

let timestamp = moment().valueOf();
console.log(timestamp);