const express = require("express");
const router = express.Router();
const user = require("../controllers/User");
const auth = require("../middleware/auth");
const upload = require("../util/MulterConfigProduct");

router.post("/create-user",upload.single("avatar"), user.save);
router.delete("/delete-User",auth,user.delete);
router.put("/update-User",upload.single("avatar"),auth,user.edit);
router.get("/get-user/:userId",user.getOne);





module.exports = router;