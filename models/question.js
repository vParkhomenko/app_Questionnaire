module.exports = function(sequelize, Sequelize) {
    var Questions = sequelize.define('Questions', {
        question: Sequelize.STRING,
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        src: Sequelize.STRING,
        type: Sequelize.STRING,
        inputType: Sequelize.STRING,
        answers: Sequelize.TEXT,
        alertMessage: Sequelize.STRING,
        correctAnswer: Sequelize.STRING
    });
    return Questions;
};
