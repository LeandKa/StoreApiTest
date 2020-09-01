const express = require("express");
const router = express.Router();
const section = require("../controllers/section");




router.post("/login", section.login);
router.get("/logout",section.Logout);



module.exports = router;