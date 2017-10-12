const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    }
});

const Person = module.exports = mongoose.model('Note', NoteSchema);

