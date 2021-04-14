const Sequelize = require('sequelize')
const connection = require ('./database')

const answerModel = connection.define('answer',{
    describe:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    askId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

answerModel.sync({force: false})

module.exports = answerModel