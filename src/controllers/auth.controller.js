import models from "./../database/models/index"

export default {
    login: (req, res) => {

    },
    
    registro: (req, res) => {
        // /api/user/:nombre | req.params.nombre
        // /api/user?q=juan  | req.query.q
        // /api/user         | req.headers
        // /api/user         | req.body
        const { email, password } = req.body

        const user = models.User.findOne({
            where: {email: email}
        })

        if(!user) {
            // registrar al user
        }else{
            return res.status(422).json({mensaje: "El correo ya existe"})
        }
    
    },
    
    perfil: (req, res) => {
        return res.send("MI PERFIL");       
    },
    
    logout: (req, res) => {
    
    }
}
