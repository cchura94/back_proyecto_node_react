import models from "./../database/models/index"
import { Op } from "sequelize"

export default {
    listar: async (req, res) => {
        try{
            // /api/categoria?q=rop
            const buscar = req.query.q?req.query.q:'';

            const categorias = await models.Categoria.findAll({
                where: {
                    nombre: {
                        [Op.like]: `%${buscar}%`
                    }
                }
            });
            return res.status(200).json(categorias);
        }catch(error){
            return res.status(500).json({message: error.message})
        }
    },
    guardar: async (req, res) => {
        try{
            const {nombre, detalle} = req.body;
            
            const cat = await models.Categoria.create({nombre, detalle})
            if(cat.id){

                return res.status(200).json({message: "Categoria Registrada", data: cat});
            }
            return res.status(422).json({message: "Error al guardar la Categoria"});

        }catch(error){
            return res.status(500).json({message: error.message})
        }
    },
    mostrar: async (req, res) => {
        try {
            const id = req.params.id;
            const categoria = await models.Categoria.findByPk(id);
            if(categoria){
                return res.status(200).json(categoria)
            }else{
                return res.status(404).json({message: "Categoria no existe"});
            }
            
        } catch (error) {
            return res.status(500).json({message: error.message})
        }        
    },
    modificar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nombre, detalle } = req.body;
            const categoria = await models.Categoria.findByPk(id);
            if(categoria){
                await models.Categoria.update({nombre, detalle}, {
                    where: {
                        id: categoria.id
                    }
                })
                return res.status(200).json({message: "Categoria Actualizada"})
            }else{
                return res.status(404).json({message: "Categoria no existe"});
            }
            
        } catch (error) {
            return res.status(500).json({message: error.message})
        } 
    },
    eliminar: async (req, res) => {
        try {
            const id = req.params.id;
            
            await models.Categoria.destroy({
                where: {
                    id: id
                }
            })
            return res.status(200).json({message: "Categoria Eliminada"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        } 
    }
}
