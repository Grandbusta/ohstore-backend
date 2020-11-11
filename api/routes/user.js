const express=require('express');
const router = express.Router();

const Users=require('../controllers/user')

router.post('/signup/',Users.signup)
router.post('/login',Users.login)

module.exports=router;