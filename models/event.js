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
        start: '2023-10-21T11:09',
        end: '2024-10-21T11:09',
    },
    {
        id: '2',
        category: 'Soccer',
        title: 'now',
        host: 'Justin Privett',
        details: 'Soccer hersdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfg',
        where: 'Hunter Parksdfgsdfg',
        start: '2023-10-21T11:09',
        end: '2024-10-21T11:09',
    },
    {
        id: '3',
        category: 'Basketball',
        title: 'yes',
        host: 'Justin Privett',
        details: 'Socc',
        where: 'my park',
        start: '2023-10-21T11:19',
        end: '2023-10-21T12:09',
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

exports.updateById = function(id, updateEvent) {
    let event = events.find(event=>event.id === id);
    if (event) {
        event.category = updateEvent.category;
        event.title = updateEvent.title;
        event.details = updateEvent.details;
        event.where = updateEvent.where;
        event.start = updateEvent.start;
        event.end = updateEvent.end;
        return true;
    } else {
        return false;
    }
}