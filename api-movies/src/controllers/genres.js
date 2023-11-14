const { Genre } = require('../models/genre')

const create = async (req, res) => {
	const newGenre = await Genre.create(req.body)

	res.json(newGenre)
}

const getAll = async (req, res) => {
	const genres = await Genre.find()

	res.json(genres)
}

const update = async (req, res) => {
	const genre = await Genre.findByIdAndUpdate(req.params.genreId, req.body, {
		new: true,
	})

	res.json(genre)
}

const remove = async (req, res) => {
	const genre = await Genre.findByIdAndDelete(req.params.genreId)

	if (!genre) return res.status(404).json({ msg: 'Genero no existe' })

	res.json(genre)
}

module.exports = {
	create,
	getAll,
	update,
	remove,
}
