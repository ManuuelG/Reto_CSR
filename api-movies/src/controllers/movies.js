const { Movie } = require('../models/movie')

const getAll = async (req, res) => {
  const movies = await Movie.find()

  res.json(movies)
}

const getById = async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)

  res.json(movie)
}

const create = async (req, res) => {
  console.log(req.user)
  const newMovie = await Movie.create(req.body)

  res.json(newMovie)
}

const update = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, {
    new: true,
  })

  res.json(movie)
}

const remove = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.movieId)

  res.json(movie)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
