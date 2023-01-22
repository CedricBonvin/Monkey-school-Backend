const express = require("express")
const route = express.Router()
const {Op} = require("sequelize")

const PROF = require("../../model/model_prof")
const SAISON = require("../../model/model_saison")
const DATESCOURS = require("../../model/model_datesCours")
const COURS = require("../../model/model_cours")


route.get("/", async (req, res) => {
    // ! FONCTION PRETE POUR RECEVOIRE LE CHOIX DES SAISONS ... ATTENTION IL FAUDRA RECUPERER LE SALAIRE POUR CHAQUE SAISON, POUR L'INSTANT SANS HISTORIQUE DE D'ANNEE ET DE SALAIRE !!! 
    let {idUser , idSaison, saisonString} = req.query
    let saisons, prof, dates
  
    try {
         saisons = await SAISON.findAll({ order : [ ["saison" , "desc"]]})
         saisonString = saisons[0].saison
         prof = await PROF.findOne({ where : { _idProf : idUser}, attributes : ["nom", 'prenom', 'tarifHeure']})        
    } catch (error) { return res.status(400).json({message : "problème prof ou saison ",error})}

    idSaison  ? "": idSaison = saisons[0]._idSaison 
    
    try {
         dates = await DATESCOURS.findAll({
            where : { 
                idSaison : idSaison,
                idTypeCours : 1,   /// Représente les cours réguliers    
                [Op.or] : {
                    idProf_1 : idUser, idProf_2 : idUser, idProf_3 : idUser, idProf_4 : idUser,
                }
            },
            order : [["date", "desc"]],
            include : [ {model : COURS , as : "cours" }]
        })
        res.status(200).json({
            saisons : saisons,
            prof : prof, 
            allDates : dates, 
            saisonString : saisonString})
    } catch (error) { return res.status(400).json({message : "problème dates  ",error})}
})

module.exports = route