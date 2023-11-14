const { movieValidation } = require('../models/movie')
const movieController = require('../controllers/movies')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')

const { Router } = require('express')

const router = Router()

router.get('/', movieController.getAll)

router.get(
  '/:movieId',
  mongoIdFromParamValidation('movieId'),
  movieController.getById
)

router.post('/', movieValidation, movieController.create)
router.put(
  '/:movieId',
  mongoIdFromParamValidation('movieId'),
  movieValidation,
  validate,
  movieController.update
)
router.delete(
  '/:movieId',
  mongoIdFromParamValidation('movieId'),
  movieController.remove
)

module.exports = router
