const cart = require("../controllers/Cart");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();


router.post('/create-cart',auth,cart.saveCart);
router.get('/cart',auth,cart.getCart);
router.get('/cartOne/:cartId',auth,cart.getOneCart);
router.post('/add-to-cart',auth,cart.addtoCart);
router.put('/updateCartItem',auth,cart.updateToCart);
router.delete('/deleteCartItem/:cartItemId',auth,cart.deleteToCart);


module.exports = router;