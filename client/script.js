console.log('test')

const baseURL = 'http://localhost:3000/api/movies'

const moviesContainer = document.getElementById('movies')
const addmovieInput = document.getElementById('add-movie-input')
const addmovieButton = document.getElementById('add-movie-btn')
const modalBody = document.getElementById('modalbody')

let moviesState = []

moviesContainer.addEventListener('click', handleDelete)

addmovieButton.addEventListener('click', handleAdd)

moviesContainer.addEventListener('click', handleDetails)

async function main() {
  // Request al backend
  const res = await fetch('http://localhost:3000/api/movies')
  const movies = await res.json()

  moviesState = [...movies]
  render()
}

main()

function render() {
  moviesContainer.innerHTML = ''

  moviesState.forEach(({ title, _id }) => {
    moviesContainer.innerHTML += `
		<li class="list-group-item">
							<div class="d-flex">
								<div class="flex-grow-1">
									${title}
									
								</div>
								<div>
									<button class="btn btn-primary edit-btn" data-id="${_id}" >Editar</button>
									<button class="btn btn-danger delete-btn" data-id="${_id}" >Borrar</button>
                  <button class="btn btn-info details-btn" data-id="${_id}" data-bs-toggle="modal" data-bs-target="#movieDetailsModal">Detalles</button>
								</div>
							</div>
						</li>
		`
  })
}

async function handleAdd() {
  const res = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: addmovieInput.value }),
  })

  const createdmovie = await res.json()

  moviesState = [...moviesState, createdmovie]

  render()

  addmovieInput.value = ''
}

async function handleDelete({ target: deleteBtn }) {
  if (deleteBtn.classList.contains('delete-btn')) {
    const endpoint = baseURL + '/' + deleteBtn.dataset.id

    const res = await fetch(endpoint, {
      method: 'DELETE',
    })

    const deletedmovie = await res.json()

    console.log(deletedmovie)

    moviesState = moviesState.filter(movie => movie._id !== deletedmovie._id)

    render()
  }
}

async function handleDetails({ target: detailsBtn }) {
  console.log(detailsBtn)
  if (detailsBtn.classList.contains('details-btn')) {
    const endpoint = baseURL + '/' + detailsBtn.dataset.id

    const res = await fetch(endpoint)

    const movieDetails = await res.json()

    console.log(movieDetails)
    console.log(movieDetails.director)
    console.log(movieDetails.date)
    console.log(movieDetails.sinopsis)

    modalBody.innerHTML = `
    <p><strong> Año:</strong>${movieDetails.date} </p>
    <p><strong> Director: </strong>${movieDetails.director}</p>
    <p><strong> Sinopsis: </strong>${movieDetails.sinopsis}</p>
		`

    render()
  }
}
