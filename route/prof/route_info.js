const express = require("express")
const route = express.Router()
const PROF = require("../../model/model_prof")

// ***************   ROUTE PROF INFO  ************

route.get("/", async (req,res) => {
    try {    
        const prof = await PROF.findOne({
            where : {_idProf : req.query.idUser}
        })
        if(prof.dataValues){
            profValue = {...prof.dataValues}
            const tarifHeure = profValue.tarifHeure
            delete profValue.pw
            delete profValue.tarifHeure
            res.status(200).json({prof : profValue, tarifHeure : tarifHeure, message : "Le prof à été trouvé"})
        }else{res.status(400).json({message : "impossible de trouvé le prof"})}
    } catch (error){res.status(500).json({message : "Impossilbe de renvoyer le prof", error})}
})

route.put("/modifierInfo", async (req , res) => {
    try {
        const profUpdate = await PROF.update({...req.body},{  
            where : {_idProf : req.query.idUser}
        })
        if(profUpdate > 0){
            const prof = await PROF.findOne({
                attributes : { exclude : ["pw", "tarifHeure"] },
                where : {_idProf : req.query.idUser}
            })
            res.status(200).json({prof : prof, message : "Prof mis à jour"})
        }else{res.status(400).json({message : "Aucune info n'a été modifier ou le prof n'a pas été trouver dans la base de données"})}
    } catch (error){res.status(500).json({message : "Impossible de mettre à jour le prof", error})}
})

route.put("/modifierPw", async (req, res ) => {
    const prof = await PROF.findOne({where : {_idProf : req.query.idUser}})
    if(prof){
        if(prof.pw === req.body.oldPw){
            try {
                await PROF.update({pw : req.body.newPw},{
                    where : {_idProf : req.query.idUser}
                })
                const prof = await PROF.findOne({where : {_idProf : req.query.idUser}})
                res.status(200).json({prof : prof, message : "Mot de passe mis à jour"})
            } catch (error){res.status(500).json({message : "Impossible de mettre à jour le mot de passe"})}
        }else{res.status(400).json({message : "Mot de passe incorrect.."})}
    }else{res.status(500).json({message : "Impossible de trouver le prof"})}
})

module.exports = route