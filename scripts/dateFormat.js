const{ DateTime } = require('luxon');

exports.dateFormat= function(dateTime) {
    const luxonDateTime = DateTime.fromISO(dateTime);
    return luxonDateTime.toFormat('EEE, LL/dd/yyyy, hh:mm a');
};
