const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RSVP = require('./rsvp');

const eventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    category: {type: String, 
        enum: ['Soccer', 'Basketball', 'Softball', 'Tennis', 'Pickleball', 'Other'],
        required: [true, 'category is required']},
    host: {type: Schema.Types.ObjectId, ref:'User', required: [true, 'host is required']},
    details: {type: String, required: [true, 'details is required']},
    location: {type: String, required: [true, 'location is required']},
    start: {type: Date, required: [true, 'start time is required']},
    end: {type: Date, required: [true, 'end time is required']},
    eventImage: {type: String, required: [true, 'event image is required']},
    rsvps: [{type: Schema.Types.ObjectId, ref:'RSVP'}]
},
{timestamps: true}
);

module.exports = mongoose.model('Event', eventSchema);