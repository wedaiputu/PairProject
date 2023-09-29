const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()



router.get('/', Controller.showCars)
router.get('/admins', Controller.adminPage)
router.post('/admins', Controller.loginPost)
router.get('/showDataForAdmin', Controller.showDataForAdmin)
router.get('/admin', Controller.usersDetail)
router.get('/users/:usersId', Controller.usersDetail)

// //cars, 

// router.get('/usersBook', Controller.usersBook)
// router.post('/users/add', Controller.postUsersBook)
// router.get('/usersBook', Controller.usersBook)

// // router.get('/admins', Controller.loginForm)
// router.get('/adminsRegister', Controller.registerForm)
// router.post('/adminsRegister', Controller.registerPost)
// router.get('/cars/:carsId', Controller.rentsDetail)
// router.get('/cars/:carsId/users/add', Controller.carsAdd)
// router.post('/stores/:storeId/employees/add', Controller.userAddPost)
// router.get('/stores/:storeId/employees/:employeeId/edit', Controller.userEditForm)
// router.post('/stores/:storeId/employees/:employeeId/edit', Controller.userFormPost)
// router.get('/stores/:storeId/employees/:employeeId/delete', Controller.employeeDelete)
// router.get('/stores/:storeId/delete', Controller.employeeDelete)



// router.post('/stores/:id/edit', Controller.postArtsIdEdit)
// router.get('/stores/:id/delete', Controller.artsIdDelete)

module.exports = router