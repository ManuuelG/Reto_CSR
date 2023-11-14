const mongoose = require('mongoose')
const { body } = require('express-validator')

const genreSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
})

const Genre = mongoose.model('Genre', genreSchema)

const genreValidation = body('name')
	.notEmpty()

	.custom(async (name) => {
		const genre = await Genre.findOne({ name })

		if (genre) throw new Error('Genre exists')
	})

exports.Genre = Genre
exports.genreValidation = genreValidation
