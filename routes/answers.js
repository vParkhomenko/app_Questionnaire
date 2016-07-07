var express = require('express');
var models  = require('../models');
var router  = express.Router();

router.post('/api/answers', function (req, res) {

    var body = req.body,
        id = [],
        countCorrectAnswer = 0, 
        correctAnswer = 0; 

    body.forEach(function(entry) {
        id.push(entry.id);
    });

    models.Questions.findAll({ where: {id: id} }, {raw: true}).then(function(modelQuestions) {
        for (var i = 0; i < body.length; i++) {
            if (modelQuestions[i].correctAnswer != null) {
                countCorrectAnswer++;
                if (body[i].answers == modelQuestions[i].correctAnswer) {
                    correctAnswer++;
                }
            }
        }
            var resCountCorrectAnswer = 'We had to answer ' + countCorrectAnswer + ' questions',
                resCorrectAnswer = 'You correctly answered ' + correctAnswer + ' questions';
         res.send([resCountCorrectAnswer, resCorrectAnswer]);

    });
});

module.exports = router;