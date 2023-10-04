const { v4: uuidv4 } = require('uuid');

const events = [
    {
        id: '1',
        category: 'Soccer',
        title: 'Soccer Night',
        host: 'Justin Privett',
        details: 'Soccer pick up games! If you are intested we also need a few members for the upcoming adult spring season',
        where: 'Tom Hunter Park',
        start: '2023-10-21T11:09',
        end: '2024-10-21T11:09',
        eventImage: 'default.png'
    },
    {
        id: '2',
        category: 'Soccer',
        title: 'Lets play soccer!',
        host: 'Don Timson',
        details: 'Do not worry, soccer will surely be played',
        where: 'Bond Park',
        start: '2023-10-21T12:09',
        end: '2024-10-21T11:09',
        eventImage: 'default.png'
    },
    {
        id: '3',
        category: 'Soccer',
        title: 'Timmy Soccer Club',
        host: 'Timmy Donson',
        details: 'Join us for an exciting soccer event at Reedy Creek Park',
        where: 'Reedy Creek Park',
        start: '2023-10-21T11:19',
        end: '2023-10-21T12:09',
        eventImage: 'default.png'
    },
    {
        id: '4',
        category: 'Pickleball',
        title: 'Thomas Pickleball Club',
        host: 'Richard Thomas',
        details: 'Get ready for an action-packed Pickleball event at White Oak Park! Whether you are a seasoned pro or new to the game, this event is perfect for players of all levels.',
        where: 'White Oak Park',
        start: '2023-10-21T11:09',
        end: '2024-10-21T11:09',
        eventImage: 'default.png'
    },
    {
        id: '5',
        category: 'Pickleball',
        title: 'Pickleball Night',
        host: 'Don Johnson',
        details: 'Looking for people to play pickleball with. It is okay if you are just learning.',
        where: 'Pearl Street Park',
        start: '2023-10-21T18:00',
        end: '2023-10-21T19:45',
        eventImage: 'default.png'
    },
    {
        id: '6',
        category: 'Pickleball',
        title: 'Doubles Pickleball',
        host: 'John Donson',
        details: 'Nestled in the heart of nature, Clark Creek Community Park offers the perfect backdrop for this fun and social event. ',
        where: 'Clark Creek Community Park',
        start: '2023-11-24T11:00',
        end: '2023-11-24T12:045',
        eventImage: 'default.png'
    }
];

exports.find = () => events;

exports.findById = id => events.find(event=>event.id === id);

exports.add = function (event) {
    event.id = uuidv4();
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
        event.host = updateEvent.host;
        event.details = updateEvent.details;
        event.where = updateEvent.where;
        event.start = updateEvent.start;
        event.end = updateEvent.end;
        event.eventImage = updateEvent.eventImage;
        return true;
    } else {
        return false;
    }
}