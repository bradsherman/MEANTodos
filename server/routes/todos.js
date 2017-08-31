var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/meanTodos', ['todos']);

router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if (err)
            res.send(err);
        res.json(todos);
    });
});

router.get('/todos/:id', function(req, res, next) {
    db.todos.findOne({_id: mongojs.ObjectId(req.paramas.id)}, function(err, todo) {
        if (err)
            res.send(err);
        res.json(todo);
    });
});

router.post('/todos', function(req, res, next) {
    var todo = req.body;
    if(!todo.text || !(!todo.isCompleted + '')) {
        res.status(400).send(res.json({error: "invalid data"}));
    }
    db.todos.save(todo, function(err, result) {
        if (err) res.send(err);
        res.json(result);
    });
});

router.put('/todos/:id', function(req, res, next) {
    var todo = req.body;
    var updObj = {};

    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }
    if (todo.text) {
        updObj.text = todo.text;
    }
    if (!updObj) {
        res.status(400).send({ error: "invalid data"});
    } else {
        db.todos.update({_id: mongojs.ObjectId(req.params.id)}, updObj, {}, function(err, result) {
            if (err) res.send(err);
            res.json(result);
        });
    }
});

router.delete('/todos/:id', function(req, res, next) {
    db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, '', function(err, result) {
        if (err) res.send(err);
        res.json(result);
    });
});

module.exports = router;