const categoria = require("../controllers/Categoria");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();




router.get("/categoria",categoria.getCategoriaAll);
router.post("/categoria",auth,categoria.save);
router.delete("/delete-Categoria",auth,categoria.delete);





module.exports = router;