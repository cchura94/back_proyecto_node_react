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

            const productos = await models.Producto.findAndCountAll({
                where: {
                  nombre: {
                    [Op.like]: `%${q}%`
                  }
                },
                include: [models.Categoria],
                offset: offset,
                limit: limit
              });
              
              return res.status(200).json(productos);
        } catch (error) {
            return res.status(500).json({message: error.message})            
        }

    },
    guardar: async (req, res) => {
        try {
            const datos = req.body;
            const producto = await models.Producto.create(datos);
            if(producto.id){
                return res.status(201).json({message: 'Producto Registrado'})  
            }
            
        } catch (error) {
            return res.status(422).json({message: error.message})  
        }
    },
    mostrar: async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await models.Producto.findByPk(id);
            if(producto.id){
                return res.status(200).json(producto)
            }else{
                return res.status(404).json({message: "Producto no existe"});
            }
            
        } catch (error) {
            return res.status(500).json({message: error.message})
        }  
    },
    modificar: async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await models.Producto.findByPk(id);
            if(producto){
                await models.Producto.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json({message: "Producto Actualizada"})
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
            
            await models.Producto.destroy({
                where: {
                    id: id
                }
            })
            return res.status(200).json({message: "Producto Eliminado"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        } 
    }
}