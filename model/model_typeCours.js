
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../BDD_connection")

class TypeCours extends Model {}

// LE TYPE DE COURS REGULIER DOIT AVOIR _idTypeCours === 1

TypeCours.init({
        _idTypeCours : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            unique : true
        },
    },
    {
        // Other model options go here
        tableName : "typeCours",
        sequelize, // We need to pass the connection instance
        timestamps : false,

        modelName: 'TypeCours' // We need to choose the model name
    }
);

// TypeCours.sync() // Créer la table
// TypeCours.sync({alter : true}) // pour créer/mofier 

module.exports = TypeCours