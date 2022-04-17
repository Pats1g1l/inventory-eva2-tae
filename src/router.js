const express = require('express')
const GuitarsController = require('./controllers/GuitarsController')
const PageController = require('./controllers/PageController')
const SqlInstrument = require('./lib/SqlInstrument')

const router = express.Router()

// Database Client
const sqlInstrument = new SqlInstrument()

// Controllers
const pageController = new PageController()
const guitarsController = new GuitarsController(sqlInstrument)

// Routes
router.get('/', guitarsController.renderHomeWithGuitars)
router.get('/about', pageController.renderAbout)

router.get('/guitars/create', guitarsController.renderGuitarsCreationForm)
router.post('/guitars/create', guitarsController.insertAndRenderGuitars)

router.get('/guitars/:id', guitarsController.renderSingleGuitars)

router.get('/guitars/:id/update', guitarsController.renderGuitarsUpdateForm)
router.post('/guitars/:id/update', guitarsController.updateAndRenderGuitars)

router.post('/guitars/:id/delete', guitarsController.deleteGuitarsAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
