var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/api/questions', function(req, res) {
    
    models.Questions.findAll({}, { raw: true }).then(function(questions) {
            res.json(questions);
    });
}, function (err) {
    console.log('An error occurred while creating the table:', err);
});

router.post('/api/question', function (req, res) {

    models.Questions.findAll({where: {question: req.body.question}}, {raw: true}).then(function (questions) {

        if(!questions.length) {
            req.body.answers = JSON.stringify(req.body.answers);
            models.Questions.create(req.body);
            res.json({success: "success", msg: "Question was created!"});
        } else {
            res.json({success: "error", msg: "Can not be created. Question: " + "\\" + req.body.question + "\\" + " - was already exists!"});
        }
    });
});

router.put('/api/question/:id', function(req, res) {

    models.Questions.findAll({where: {id: req.params.id}}, {raw: true}).then(function (questions) {
        
        if(questions.length) {
            models.Questions.update(req.body, {where: {id: req.params.id}});
            res.json({success: "success", msg: "Question with id: " +  req.params.id + " - was updated!"});
        } else {
            res.json({success: "error", msg: "Can not be updated. Question with id: " + req.params.id + " - was not found!"});
        }
    });
});

router.delete('/api/question/:id', function(req, res) {
    models.Questions.findAll({where: {id: req.params.id}}, {raw: true}).then(function (questions) {
        
        if(questions.length) {
            models.Questions.destroy({where: {id: req.params.id}});
            res.json({success: "success", msg: "Question with id: " +  req.params.id + " - was deleted!"});
        } else {
            res.json({success: "error", msg: "Can not be deleted. Question with id: " + req.params.id + " - was not found!"});
        }
    });
});

module.exports = router;
