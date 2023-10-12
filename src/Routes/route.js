const express = require('express');
const router = express.Router();
const UserController=require('../Controllers/UserController')
 const {Authentication,Authorization}=require('../Auth/auth')
router.post('/api/register',UserController.Register)
router.post('/api/login',UserController.Login)
router.post('/api/addUser',Authentication,UserController.AddUser)
router.delete('/api/deleteUser/:id',Authentication,UserController.DeleteUser)
router.put('/api/UpdateUser/:id',Authentication,UserController.UpdateUser)
router.get('/api/enum-values',UserController.enumvalues)
router.get('/api/users',Authentication,UserController.getUser)
router.get('/api/users/:id',Authentication,UserController.getUserbyId)






module.exports = router
