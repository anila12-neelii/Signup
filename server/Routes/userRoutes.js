const express = require('express')
const { getAllUsers, loginController, registerController } = require('../Controller/userContoller');

const router =express.Router();

router.post("/login",  loginController);
router.post("/register", registerController);
router.get('/all-users', getAllUsers )

module.exports = router;