

// **********    MODEL COURS    *************


const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../BDD_connection");
const Cours = require("../model/model_cours")
const Prof = require("../model/model_prof")
const Saison = require("../model/model_saison")
const type_cours = require("../model/model_typeCours")

class DatesCours extends Model {}


DatesCours.init({
  // Model attributes are defined here
  _idDatesCours : {
    type: DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, 
{
    // Other model options go here
        tableName : "datesCours",
        sequelize, // We need to pass the connection instance
        timestamps : false,
        modelName: 'DatesCours' // We need to choose the model name
});

// ************   FK    ************** 

//SAISON
Saison.hasMany(DatesCours, { foreignKey : "idSaison", as : "saisons"})
DatesCours.belongsTo(Saison, { foreignKey : "idSaison", as : "saisons"})

//COURS
Cours.hasMany(DatesCours, { foreignKey : "idCours", as : "cours"})
DatesCours.belongsTo(Cours, { foreignKey : "idCours", as : "cours"})

// TYP-COURS
type_cours.hasMany(DatesCours, { foreignKey : "idTypeCours", as : "typeCours"})
DatesCours.belongsTo(type_cours, { foreignKey : "idTypeCours", as : "typeCours"})

//  PROF    

Prof.hasMany(DatesCours, { foreignKey : "idProf_1", as : "prof_1"})
DatesCours.belongsTo(Prof, { foreignKey : "idProf_1", as : "prof_1"})

Prof.hasMany(DatesCours, { foreignKey : "idProf_2", as : "prof_2"})
DatesCours.belongsTo(Prof, { foreignKey : "idProf_2", as : "prof_2"})

Prof.hasMany(DatesCours, { foreignKey : "idProf_3", as : "prof_3"})
DatesCours.belongsTo(Prof, { foreignKey : "idProf_3", as : "prof_3"})

Prof.hasMany(DatesCours, { foreignKey : "idProf_4", as : "prof_4"})
DatesCours.belongsTo(Prof, { foreignKey : "idProf_4", as : "prof_4"})

// *********************************************

// DatesCours.sync() // Créer la table
// DatesCours.sync({alter : true}) // pour créer/mofier 

module.exports = DatesCours