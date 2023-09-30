const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');

const events = [
    {
        id: '1',
        category: 'Soccer',
        title: 'Soccer now',
        host: 'Justin Privett',
        details: 'Soccer here',
        where: 'Hunter Park',
        start: '11/11/11, 9:30 AM',
        end: '11/11/11, 10:00 AM',
    },
    {
        id: '2',
        category: 'Soccer',
        title: 'now',
        host: 'Justin Privett',
        details: 'Soccer hersdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfg',
        where: 'Hunter Parksdfgsdfg',
        start: '11/11/11, 9:30 AM',
        end: '11/11/11, 10:00 AM',
    },
    {
        id: '3',
        category: 'Basketball',
        title: 'yes',
        host: 'Justin Privett',
        details: 'Socc',
        where: 'my park',
        start: '11/11/11, 9:30 AM',
        end: '11/11/11, 10:00 AM',
    }
];

exports.find = () => events;

exports.findById = id => events.find(event=>event.id === id);

exports.add = function (event) {
    event.id = uuidv4();
    event.host = 'Temp host (Pull from user name after creating user later in project)'
    events.push(event);
};

exports.deleteById = function(id) {
    let index = events.findIndex(event => event.id === id);
    if (index != -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
}