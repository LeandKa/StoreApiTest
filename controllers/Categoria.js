const { Categoria } = require('../Models');


module.exports = {
    async save(req, res) {
            const categoriaBody = {
                name: req.body.name,
            }
        if (!categoriaBody.name || categoriaBody.name === "") {
            return res.status(400).json({
                ok: 'Not'
            })

        } else {
            const catego = await Categoria.findOne({ where: { name: categoriaBody.name } })
            if (catego) {
                return res.status(400).json({
                    ok: 'Not'
                })
            }
            const categoria = await Categoria.create(categoriaBody)
            if (categoria) {
                return res.status(200).json({
                    ok: 'Ok'
                })
            }
            else {
                return res.status(400).json({
                    ok: 'Not'
                })
            }

        }
    },

    async delete(req, res) {
        const categoriaBody = {
            id: req.body.id
        }

        if (!categoriaBody) {
                return res.status(400).json({
                    ok: 'Not'
                })
        }
        const categoria = await Categoria.destroy({ where: { id: categoriaBody.id } });

        if (categoria) {
            return res.status(200).json({
                ok: "Ok"
            })
        } else {
            return res.status(400).json({
                ok: 'Not'
            })
        }

    },

    async getCategoriaAll(req, res) {
        const categoria = await Categoria.findAll();
        if (categoria) {
            return res.status(200).json({
                ok: "Ok",
                message: categoria
            })
        } else {
            return res.status(400).json({
                ok: 'Not'
            })
        }
    }
   }