const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()



router.get('/', Controller.home)


router.get('/stores/add', Controller.addStore)
router.post('/stores/add', Controller.postAddStore)
router.get('/employees', Controller.employee)
router.get('/stores/:storeId', Controller.storeDetail)
router.get('/stores/:storeId/employees/add', Controller.employeeAdd)
router.post('/stores/:storeId/employees/add', Controller.employeePostAdd)
router.get('/stores/:storeId/employees/:employeeId/edit', Controller.employeeEditForm)
router.post('/stores/:storeId/employees/:employeeId/edit', Controller.employeePostEdit)
router.get('/stores/:storeId/employees/:employeeId/delete', Controller.employeeDelete)
// router.get('/stores/:storeId/delete', Controller.employeeDelete)



// router.post('/stores/:id/edit', Controller.postArtsIdEdit)
// router.get('/stores/:id/delete', Controller.artsIdDelete)

module.exports = router