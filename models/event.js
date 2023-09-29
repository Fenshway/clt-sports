const { v4: uuidv4 } = require('uuid');

const events = [
    {
        id: '1',
        category: 'Soccer',
        title: 'Soccer now',
        host: 'Justin Privett',
        content: 'Soccer here',
        where: 'Hunter Park',
        start: '11',
        end: '12',
    },
    {
        id: '2',
        category: 'Softball',
        title: 'now',
        host: 'Justin Privett',
        content: 'Soccer hersdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfg',
        where: 'Hunter Parksdfgsdfg',
        start: '11',
        end: '12',
    },
    {
        id: '3',
        category: 'Basketball',
        title: 'yes',
        host: 'Justin Privett',
        content: 'Socc',
        where: 'my park',
        start: '11',
        end: '12',
    },
];

exports.find = () => events;

exports.findById = id => events.find(event=>event.id === id);