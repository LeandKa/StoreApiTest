const { User } = require('../Models');
const bcrpty = require('bcrypt');



module.exports = {

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } })
            if (!user) {
                throw new Error("Error Password Dont Match");
            } else {
                const match = await user.checkPassword(password)

                if (match) {
                    req.session.user = user.generateToken();
                    console.log(req.session)
                    return res.status(200).json({ token: user.generateToken() });
                }
                throw new Error("Error Password Dont Match");
            }
        } catch (error) {
            return res.status(400).json({
            message:"Bad Login"})
        }  
       },

       async Logout(req,res){
        req.session.destroy(function(){
            return res.status(200).json({"Message":"Ok"})
         });
       }
    }