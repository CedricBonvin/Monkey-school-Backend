
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../BDD_connection")



class Prof extends Model {}

Prof.init({
        // Model attributes are defined here
        _idProf : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
        },
        prenom: {
            type: DataTypes.STRING
        },
        dateNaissance: {
            type: DataTypes.DATE
        },
        npa: {
            type: DataTypes.INTEGER
        },
        ville: {
            type: DataTypes.TEXT
        },
        adresse: {
            type: DataTypes.TEXT
        },
        nationalite: {
            type: DataTypes.TEXT
        },
        permis: {
            type: DataTypes.TEXT
        },
        telephonne: {
            type: DataTypes.TEXT
        },
        mail: {
            type: DataTypes.TEXT
        },
        banque: {
            type: DataTypes.TEXT
        },
        iban: {
            type: DataTypes.TEXT
        },
        avs: {
            type: DataTypes.TEXT
        },
        pw: {
            type: DataTypes.TEXT
        },
        role: {
            type: DataTypes.TEXT
        },
        tarifHeure: {
            type: DataTypes.INTEGER
        },
    
    },
    {
        // Other model options go here
        tableName : "profs",
        sequelize, // We need to pass the connection instance
        timestamps : false,

        modelName: 'Prof' // We need to choose the model name
    }
);



// Prof.sync() // Créer la table
// Allo.sync({alter : true}) // pour créer/mofier  

module.exports = Prof