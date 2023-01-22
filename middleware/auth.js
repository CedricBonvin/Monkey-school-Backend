const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.admin = (req,res, next) => {
    try {
        const token = req.query.token
        if(token){
            jwt.verify(token, process.env.connection_token, (err,decod)=> {
                if(decod.role === "Super-Admin"){
                    next()
                }else{
                    res.status(400).json({
                        succes : false,
                        message : "Vous n'avez pas les droits",     
                    }) 
                }
            })
        }else{
            res.status(400).json({
                succes : false,
                message : "le token n'a pas été trouvé",     
            })
        }
        
    } catch (error) {
        res.status(400).json({
            succes : false,
            message : "token invalide",     
        })
    }
}

exports.prof = (req,res, next) => {
    try {
        const token = req.query.token
        if(token){
            jwt.verify(token, process.env.connection_token, (err,decod)=> {
                if(decod.role === "prof"){
                    req.query.idUser = decod.idUser
                    next()
                }else{
                    res.status(400).json({
                        succes : false,
                        message : "Vous n'avez pas les droits",     
                    }) 
                }
            })
        }else{
            res.status(400).json({
                succes : false,
                message : "le token n'a pas été trouvé",     
            })
        }
        
    } catch (error) {
        res.status(400).json({
            succes : false,
            message : "Veuillez vous reconnecter",     
        })
    }
}