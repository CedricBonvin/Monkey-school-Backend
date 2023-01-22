const express = require("express")
const route = express.Router()
const PROF = require("../../model/model_prof")


// *************   ROUTE ADMIN PROF     ***************


route.post("/newProf", async (req , res) => {
    try {
        await PROF.create({...req.body})
    } catch (error) {   
        return res.status(400).json({message : "Impossible de créer le prof", error})
    }
    try {
        const profs = await PROF.findAll()
        res.status(201).json({
            message : "Le prof à bien été créer",
            profs : profs
        })
    } catch (error) {return res.status(400).json({message : "Impossible de renvoyer tous les profs", error})}
})

route.put("/modifierProf", async (req , res) => {
    let update = {...req.body}  
    const idProf = req.body._idProf
    try {
        const profUpdate = await PROF.update({...update},{
            where : {
                _idProf : idProf
            }
        }) 
        const profs = await PROF.findAll()
        const prof = await PROF.findOne({where : {_idProf : idProf}})
        res.status(201).json({
            message : "Prof mis à jour",
            profs : profs,
            prof : prof
        })
    } catch (error) { res.status(400).json({message : "Le prof n'a pas pu être mis à jour..", error,})}
})

route.get("/callProfs", async (req,res) => {
    try {
        const profs = await PROF.findAll()
        res.status(200).json({profs : profs})
    } catch (error) {
        res.status(500).json({message : "Les profs sont introuvables..",error})
    }
})

route.delete("/supprimerProf", async (req ,res) => {
    console.log(typeof(req.query.idProf))
    try {
        await PROF.destroy({where : {_idProf : req.query.idProf}})
        const profs = await PROF.findAll()
        res.status(200).json({
            message : "Prof supprimé avec succes",
            profs : profs
        })
    } catch (error) {
        res.status(500).json({message : "Impossible de supprimer le prof"})
    }
})

module.exports = route