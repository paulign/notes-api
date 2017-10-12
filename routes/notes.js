const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/', function(req, res) {
    return Note.find(function (err, notes) {
        if (!err) {
            return res.send(notes);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/', function(req, res) {
    var note = new Note({
        title: req.body.title,
        body: req.body.body,
    });

    note.save(function (err) {
        if (!err) {
            return res.send({ status: 'OK', note: note });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
        }
    });
});

router.get('/:id', function(req, res) {
    return Note.findById(req.params.id, function (err, note) {
        if(!note) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', note:note });
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.put('/:id', function (req, res){
    return Note.findById(req.params.id, function (err, note) {
        if(!note) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        note.title = req.body.title;
        note.body = req.body.body;

        return note.save(function (err) {
            if (!err) {
                return res.send({ status: 'OK', note:note });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });
    });
});

router.delete('/:id', function (req, res){
    return Note.findById(req.params.id, function (err, note) {
        if(!note) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return note.remove(function (err) {
            if (!err) {
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });
});

module.exports = router;