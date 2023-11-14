const { genreValidation } = require('../models/genre')
const genreController = require('../controllers/genres')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')
const validate = require('../middlewares/validate')

const { Router } = require('express')

const router = Router()

router.get('/', genreController.getAll)
router.post('/', genreValidation, validate, genreController.create)
router.put(
  '/:genreId',
  mongoIdFromParamValidation('genreId'),
  genreValidation,
  validate,
  genreController.update
)

router.delete(
  '/:genreId',
  mongoIdFromParamValidation('genreId'),
  validate,
  genreController.remove
)

module.exports = router
