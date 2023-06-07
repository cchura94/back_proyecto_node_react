import models from "./../database/models/index"

export default {
    listar: async (req, res) => {
        try{
            const categorias = await models.Categoria.findAll();
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
        
    },
    modificar: async (req, res) => {
        
    },
    eliminar: async (req, res) => {
        
    }
}
