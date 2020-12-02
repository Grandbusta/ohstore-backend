const express=require('express');
const router = express.Router();

const Users=require('../controllers/user')
const {checkUser}=require('../middlewares/checkAuth')

router.post('/signup/',Users.signup)
router.post('/login',Users.login)
router.delete('/delete',checkUser,Users.deleteUser)
router.patch('/update',checkUser,Users.updateUser)

module.exports=router;