const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()



router.get('/', Controller.home)


router.get('/stores/add', Controller.addStore)
router.post('/stores/add', Controller.postAddStore)
// router.get('/arts/:id', Controller.artsEdit)
// router.post('/arts/:id/edit', Controller.postArtsIdEdit)
// router.get('/arts/:id/delete', Controller.artsIdDelete)

module.exports = router