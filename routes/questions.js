var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/api/questions', function(req, res) {

/*/!*    var answers = [{
            src: "images/img1.png",
            text: "Head"
        },
        {
            src: "images/img2.png",
            text: "Torso - Front"
        },
        {
            src: "images/img3.png",
            text: "Torso - Back"
        },
        {
            src: "images/img4.png",
            text: " Left Arm"
        },
        {
            src: "images/img5.png",
            text: "Right Arm"
        },
        {
            src: "images/img6.png",
            text: "Left Leg"
        },
        {
            src: "images/img7.png",
            text: "Right Leg"
        },
        {
            src: "images/img8.png",
            text: "Other"
        }];


    models.sequelize.sync({ force: true }).then(function() {
        models.Questions.bulkCreate([{
            question: "What is your full name?",
            id: 1,
            src: "images/user.png",
            type: "text",
            inputType: "text",
            alertMessage: "Please fill this in"
        },
            {
                question: "What is your email?",
                id: 2,
                src: "images/mail.png",
                type: "text",
                inputType: "email",
                alertMessage: "Enter your correct email"
            },
            {
                question: "What is the full name of the person injured?",
                id: 3,
                src: "images/user2.png",
                type: "text",
                inputType: "text",
                alertMessage: "Please fill this in"
            },
            {
                question: "Where were they injured?",
                id: 4,
                type: "image",
                answers: JSON.stringify(answers),
                alertMessage: "Ooops! You must make a selection",
                correctAnswer: "Head"
            },
            {
                question: "How badly does this injury affect them?",
                id: 5,
                type: "evaluation",
                alertMessage: "Ooops! You must make a selection"
            },
            {
                question: "How many people witnessed the incident?",
                id: 6,
                type: "quantity",
                alertMessage: "Ooops! You must make a selection"
            },
            {
                question: "How many people witnessed the incident?",
                id: 7,
                type: "textarea",
                alertMessage: "Please fill this in"
            },
            {
                question: "Have steps been taken to reduce the chances of this happening again?",
                id: 8,
                type: "chooseYesNo",
                alertMessage: "Ooops! You must make a selection",
                correctAnswer: "false"

            }]).then(*!/function() {
            return */
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
            models.Questions.bulkCreate([req.body]);

            /*res.json(req.body.answers);*/
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
