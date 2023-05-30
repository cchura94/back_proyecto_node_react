import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import models from "./../database/models/index"

export default {
    login: async (req, res) => {
        const { email, password } = req.body;

        let user = await models.User.findOne({
            where: {email: email}
        })

        // si no existe
        if(!user) return res.status(401).json({ message: "Credenciales Incorrectas"})

        // verificar la contraseña
        const correcto = await bcrypt.compare(password, user.password);
        if(correcto) {
            // generar un token JWT
            const payload = {
                id: user.id,
                email: user.email,
                time: new Date()
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET || "MI_CODIGO_SECRETO_JWT", {
                expiresIn: 60*60
            })

            return res.status(200).json({access_token: token, user: user, error: false})
        }

        return res.status(401).json({ message: "Credenciales Incorrectas"})


    },
    
    registro: async (req, res) => {
        // /api/user/:nombre | req.params.nombre
        // /api/user?q=juan  | req.query.q
        // /api/user         | req.headers
        // /api/user         | req.body
        console.log(req.body);
        const { email, password } = req.body;

        // select * from users where email = req.body.email limit 1
        let user = await models.User.findOne({
            where: {email: email}
        })

        if(!user) {
            // cifrar el password

            const hash = await bcrypt.hash(password, 12)
            // registrar al user
            user = await models.User.create({email, password: hash})

            return res.status(201).json({mensaje: "Usuario Registrado", data: user})
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
