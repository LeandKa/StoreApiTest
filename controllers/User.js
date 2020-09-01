const { User } = require('../Models');
const { Cart } = require('../Models');
const { Product } = require("../Models");
const { CartItem } = require("../Models");
const { Categoria } = require("../Models");
const { deleteFile } = require('../util/fileDelete');


module.exports = {

    async save(req, res) {

        try {
            const userBody = {
                Name: req.body.Name,
                email: req.body.email,
                password: req.body.password,
                permissao: process.env.USER_PERMISSAO,
                avatar: "http://localhost:3000/image/1598388048301-avatar-1577909_640.png",
                avatarPath: "C:/projetos/testUnits/image/1598388048301-avatar-1577909_640.png"
            }

            const cartBody = {
                nomeCart: "Carrinho"
            }

            if (!userBody.Name || !userBody.email || !userBody.password) {
                throw new Error("field missing");
            }
            const UserEmailFind = await User.findOne({ where: { email: userBody.email } })
            if (UserEmailFind) {
                throw new Error("Email is already on database")
            }
            const Users = await User.create(userBody)

            if (Users) {
                const carte = await Cart.create(cartBody)
                const values = {
                    name: Users.name,
                    avatar: Users.avatar,
                    cartId: carte.id
                }
                await Users.update(values)
                return res.status(200).json({
                    ok: 'Ok'
                })
            }
            else {
                throw new Error('No possible create a user')
            }
        }
        catch (e) {
            return res.status(400).json({
                ok: e.message
            })
        }
    },

    async delete(req, res) {
        try {

            const userPath = await User.findByPk(req.body.id);

            deleteFile(userPath.avatarPath)

            const user = await User.destroy({
                where: { id: req.body.id }
            })
            if (user) {
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
            const id = req.headers.id;

            const userBody = {
                Name: req.body.Name,
                email: req.body.email,
                password: req.body.password,
                avatar: `http://localhost:3000/image/${req.file.filename}`,
                avatarPath: req.file.path
            }

            const user = await User.update(userBody, { where: { id: id } })
            if (user) {
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

    async getAll(req, res) {

        try {
            const user = await User.findAll();
            if (user) {
                return res.status(200).json({
                    ok: "Ok",
                    user: user
                })
            } else {
                throw new Error("Error")
            }

        } catch (err) {
            return res.status(404).json({
                ok: "Not"
            });
        }

    },

    async getOne(req, res) {
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
                console.log(req)
                return res.status(200).json({
                    userAvatar: user.avatar,
                    userPermissao: user.permissao,
                    userId: user.id,
                    cartId: user.cartId
                })
            } else {
                throw new Error("Error")
            }

        } catch (err) {
            return res.status(404).json({
                ok: "Not"
            });
        }
    }
}