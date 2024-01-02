const{ DateTime } = require('luxon');

exports.dateFormat = function(dateTime) {
    const luxonDateTime = DateTime.fromJSDate(dateTime);
    return luxonDateTime.toFormat('EEE, LL/dd/yyyy, hh:mm a');
};

exports.toISO = function(dateTime) {
    const luxonDateTimeEdit = DateTime.fromJSDate(dateTime);
    return luxonDateTimeEdit.toFormat("yyyy-MM-dd'T'HH:mm:ss");
};