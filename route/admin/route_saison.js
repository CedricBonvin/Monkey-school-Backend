const express = require("express")
const route = express.Router()
const SAISON  = require("../../model/model_saison")

// ******************  ROUTE SAISON *******************

route.post("/ajouterSaison", async (req, res) => {
    try {
        await SAISON.create({...req.body})
        const saisons = await SAISON.findAll()
        res.status(200).json({saisons : saisons, message : "La saison à bien été créer"})
    } catch (error) {
        res.status(500).json({message : "Les saisons sont introuvables..",error})
    }  
})

route.get("/callSaisons", async(req, res) => {
    console.log("salut")
    try {
        const saisons = await SAISON.findAll()
        res.status(200).json({saisons : saisons})
    } catch (error) {res.status(500).json({message : "Les saisonsss sont introuvables..",error})}
})

route.delete("/supprimerSaison",async (req, res) => {  
    try {
        const saisonDelete = await SAISON.destroy({where : {_idSaison : req.query.idSaison}})
        if(saisonDelete > 0){
            const saisons = await SAISON.findAll()
            res.status(200).json({message : "Saison supprimé", saisons : saisons})
        }else{ return res.status(400).json({message  : "saison à supprimé introuvable"})}
    } catch (error) { res.status(500).json({message : "Impossible de supprimer la saison",error})}
})

module.exports=route
