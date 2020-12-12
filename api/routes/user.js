const express=require('express');
const router = express.Router();

const Users=require('../controllers/user')
const {checkUser,checkAdmin}=require('../middlewares/checkAuth')

router.post('/signup/',Users.signup)
router.post('/login',Users.login)
router.delete('/delete',checkUser,Users.deleteUser)
router.patch('/update',checkUser,Users.updateUser)
router.get('/createadmin',Users.createAdmin)
router.patch('/admin/:id',checkAdmin,Users.makeAdmin)

module.exports=router;