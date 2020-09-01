const express = require("express");
const router = express.Router();
const product = require("../controllers/Product");
const auth = require("../middleware/auth");
const upload = require("../util/MulterConfigProduct"); 




router.post("/product",upload.single("photo"),auth,product.save);
router.get('/categoria-product/:categoriaId/:offset/:page',product.getProductCategoria);
router.get("/product/:offset/:page",product.getAll);
router.delete("/delete-Product",auth,product.delete);
router.put("/update-product/:idProduct",auth,upload.single("photo"),product.edit);
router.get("/product-unit/:productId",product.getOneProduct);




module.exports = router;