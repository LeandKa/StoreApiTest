const { Product } = require('../Models');
const { Categoria } = require('../Models');
const { calculateLimitAndOffset, paginate } = require('paginate-info')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async save(req, res) {
        try{
        const productBody = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            favorite:0,
            categoriaId:req.body.categoriaId,
            avatar:req.file.filename,
            avatarPath:req.file.path
        }
        if (!productBody.title ||  !productBody.description || !productBody.price || !productBody.categoriaId) {
            throw new Error("field missing");
        } 
            const product = await Product.create(productBody)
            if (product) {
                    return res.status(200).json({
                        ok: 'Ok'
                    })
            }
            else {
                throw new Error('No possible create a user')
            }
    }
    catch (error) {
        return res.status(400).json({
            ok: error
        })
    }
        
    },

    async delete(req, res) {
        try {

            const product = await Product.destroy({
                where: { id: req.headers.id }
            })

            if (product) {
                return res.status(200).json({
                    ok: "Ok"
                })
            } else {
                throw new Error("Not Found");
            }


        }
        catch (error) {
            return res.status(404).json({
                ok: "Not"
            });
        }

    },

    async edit(req, res) {
        try {
            const id = req.params.idProduct
            const productFind = await Product.findByPk(id);
            if(req.file){
                const productBody = {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    favorite:req.body.favorite,
                    avatar:`http://localhost:3000/image/${req.file.filename}`,
                    avatarPath:req.file.path
                }
                const product = await Product.update(productBody,{ where: { id: id } });
                if (product) {
                    return res.status(200).json({
                        ok: "Ok"
                    })
                } else {
                    throw new Error("Not Found");
                }
            }else{
                const productBodyAVATAR = {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    favorite:req.body.favorite,
                    avatar:productFind.avatar,
                    avatarPath:productFind.avatarPath
                }

                const product = await Product.update(productBodyAVATAR,{ where: { id: id } });
                if (product) {
                    return res.status(200).json({
                        ok: "Ok"
                    })
                } else {
                    throw new Error("Not Found");
                }
            }
        }catch (error) {
            return res.status(404).json({
                ok: "Not"
            });
        }
    },

    async getCategoria(req, res) {
        const currentPage = parseInt(req.params.offset);
        const pageLimit = parseInt(req.params.limit);
        const categoriaId = parseInt(req.params.categoriaId);
        const options = {
            attributes: ['id', 'tile','description','price'],
            page: currentPage, 
            paginate: pageLimit, // Default 25
            where: {CategoriumId:{[Op.like]: categoriaId} } 
          }
       const { docs, pages, total } = await Product.paginate(options)
       if(!docs){
           return res.status(404).json({'ok':'erro'})
       }else{
           return res.status(200).json({"docs":docs,"pages":pages,"total":total});
       }

    },

    async getAll(req, res) {
        const currentPage = parseInt(req.params.page)
        const pageLimit = parseInt(req.params.offset)
    
        const {limit,offset} = calculateLimitAndOffset(currentPage,pageLimit);
        const {rows,count} = await Product.findAndCountAll({limit,offset});

        const meta = paginate(offset,count,rows,limit);
       if(!meta){
           return res.status(404).json({'ok':'erro'})
       }else{
           return res.status(200).json({meta,rows});
       }

    },

    async getProductCategoria(req,res){
        try {
            const currentPage = parseInt(req.params.page)
            const pageLimit = parseInt(req.params.offset)
            const categoriaId = parseInt(req.params.categoriaId);
            const {limit,offset} = calculateLimitAndOffset(currentPage,pageLimit);
            const {rows,count} = await Product.findAndCountAll({where:{CategoriaId:{[Op.like]: categoriaId} },limit,offset});
            const meta = paginate(currentPage,count,rows,pageLimit);
            if(meta){
                return res.status(200).json({meta,rows})
            }else{
                throw new Erro('ERRO')
            }
        } catch (error) {
            return res.status(404).json({"Erro":error});
        }
    },

    async getOneProduct(req,res){
        const id = req.params.productId;
        const product = await Product.findOne({ where: { id: id }, include: Categoria });
        if(product){
           return res.status(200).json({Data:product});
        }else{
            return res.status(404).json({"Message":"Not Found"})
        }

    }
}