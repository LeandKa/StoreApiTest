const { User } = require('../Models');
const { Cart } = require('../Models');
const { Product } = require("../Models");
const { CartItem } = require("../Models");
const {Categoria} = require("../Models");


module.exports ={

    async saveCart(req,res){
        try {
            const cartBody={
                nomeCart:req.body.nomeCart,
                userId:req.body.userId,
                productsId:req.body.productsId,
                quantity:req.body.quantity,
                price:req.body.price,
                total:req.body.price
            }

            const usere = await User.findByPk(cartBody.userId);
            if(!usere.cartId){
                const carte = await Cart.create(cartBody)
                    const values = {
                        name:user.name,
                        avatar:user.avatar,
                        cartId:carte.id
                    }
                    const cartItem = {
                        productsId:req.body.productsId,
                        cartItemId:carte.id,
                        quantity:1,
                        price:req.body.price,
                        total:req.body.price
                     }  
                await usere.update(values)
                await CartItem.create(cartItem) 

                return res.status(200).json({
                  "test":usere
              }) 
             }else{
                 throw new Error('ERRO')
             }
            }catch (error) {
            return res.status(400).json({
                ok: error
            })
        }
    },

    async getCart(req,res){

        const carts = await User.findAll({ include: { all: true, nested: true }});

        return res.status(200).json({
            carts:carts
        })

    },

    async getOneCart(req,res){

        var id = req.params.cartId;

       const carts = await Cart.findByPk(id,{include:[CartItem]})
       
       return res.status(200).json({
           carts:carts
       })


    },

    async addtoCart(req,res){
        const cartBody = {
            Cartid:req.body.id,
            userId:req.body.userId,
            productsId:req.body.productId
        }

        const user = await User.findByPk(req.body.userId)
        if(!user.cartId || !user.cartId === req.body.id ){
            return res.status(500).json({
                'Ok':'Erro nao foi possivel adicionar ao carrinho'
            })
        }
        const product = await Product.findByPk(req.body.productsId)
        const cartItemBody = {
            productsId:req.body.productsId,
            cartItemId:req.body.Cartid,
            quantity:1,
            price:product.price,
            total:product.price
        }
        const cartItem = await CartItem.create(cartItemBody)
        if(cartItem){
           return res.status(200).json({
               'Ok':cartItem
           })
        }else{
            return res.status(500).json({
                'Ok':'Erro nao foi possivel adicionar ao carrinho'
            })
        }

    },

    async updateToCart(req,res){
    
    const updateBody = {
    quantity:req.body.quantify,
    total:req.body.total
                    }

    const cartItem = await CartItem.findByPk(req.body.cartItemId);
   await cartItem.update(updateBody)
   if(cartItem){
     return res.status(200).json({
         'Ok':cartItem
     })
   }else{
       return res.status(500).json({
          'Ok':'Not Ok'
       })
   }
    },
    
    async deleteToCart(req,res){

        const cartItem = await CartItem.destroy({where:{id:req.params.cartItemId}})
        if (cartItem) {
            return res.status(200).json({
                ok: "Ok"
            })
        } else {
            return res.status(400).json({
                ok: 'Not'
            })
        }
        
    }

}