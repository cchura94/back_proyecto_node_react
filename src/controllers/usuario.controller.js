import { Op } from "sequelize";
import models from "./../database/models"

export default {
    listar: async (req, res) => {
        try {
            // /api/producto?q=teclado&page=1&limit=10
            const q = req.query.q;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit)

            const offset = (page-1) * limit

            const usuarios = await models.User.findAndCountAll({
                where: {
                  email: {
                    [Op.like]: `%${q}%`
                  }
                },
                offset: offset,
                limit: limit
              });
              
              return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({message: error.message})            
        }

    },
    guardar: async (req, res) => {
        try {
            const datos = req.body;
            const user = await models.User.create(datos);
            if(user.id){
                return res.status(201).json({message: 'Usuario Registrado'})  
            }
            
        } catch (error) {
            return res.status(422).json({message: error.message})  
        }
    },
    mostrar: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await models.User.findByPk(id);
            if(user.id){
                return res.status(200).json(user)
            }else{
                return res.status(404).json({message: "User no existe"});
            }
            
        } catch (error) {
            return res.status(500).json({message: error.message})
        }  
    },
    modificar: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await models.User.findByPk(id);
            if(user){
                await models.user.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json({message: "user Actualizada"})
            }else{
                return res.status(404).json({message: "El Producto no existe"});
            }
            
        } catch (error) {
            return res.status(500).json({message: error.message})
        } 
    },
    eliminar: async (req, res) => {
        try {
            const id = req.params.id;
            
            await models.User.destroy({
                where: {
                    id: id
                }
            })
            return res.status(200).json({message: "User Eliminado"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        } 
    }
}