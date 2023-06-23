import models from "./../database/models"

export default {
    index: async (req, res) => {
        try {
            // /api/producto?q=teclado&page=1&limit=10
            const q = req.query.q;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit)

            const offset = (page-1) * limit

            const clientes = await models.Cliente.findAndCountAll({
                where: {
                  nombre_completo: {
                    [Op.like]: `%${q}%`
                  }
                },
                offset: offset,
                limit: limit
              });
              
              return res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({message: error.message})            
        }

    },
    store: async (req, res) => {
        
    },
    show: async (req, res) => {
        
    },
    update: async (req, res) => {
        
    },
    destroy: async (req, res) => {
        
    }
}