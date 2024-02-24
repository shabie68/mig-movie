async function defaultMovies() {
	let res = await fetch('http://www.omdbapi.com/?apikey=8e76539a&s=pat&page=2')
	let movies = await res.json()
	loadMovies(movies.Search)

}

defaultMovies()


function appendMovies(id, movie) {
	
	let container = document.createElement('div')
	let cont = document.createElement('div')
	let movieImg = document.createElement('img')
	let title = document.createElement('h2')

	let rating = document.createElement("span")
	rating.id = `mig-rating-${movie.imdbID}`
	movieImg.className = 'mig-w-full'

	movieImg.src = movie.Poster != "N/A" ? movie.Poster : 'file:///D:/new_life/mignon-movie/images/default.jpg' 

	title.innerHTML = movie.Title

	cont.appendChild(movieImg)
	cont.appendChild(title)
	cont.appendChild(rating)

	container.className = ''
	container.appendChild(movieImg)
	container.appendChild(cont)

	document.getElementById(id).appendChild(container)
}

function loadMovies(movies) {
	
	movies.forEach((movie) => {
		appendMovies('mig-load-movies', movie)
		showRating(movie)
	})
}

async function showRating(movie) {
	
	let res = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=8e76539a`)
	let rating = await res.json()
	document.getElementById(`mig-rating-${movie.imdbID}`).innerHTML = "RATING: " + rating.Ratings[0]?.Value
	console.log(rating)
}

async function searchMovies() {

	document.getElementById('mig-search-movies').replaceChildren()
	let search = document.querySelector('input[type="search"]').value

	let res = await fetch(`http://www.omdbapi.com/?apikey=8e76539a&s=${search}`)
	let movies = await res.json()
	document.querySelector("#mig-load-movies").style.display = "none"
	
	movies.Search.forEach((movie)=> {
		appendMovies('mig-search-movies', movie)
		showRating(movie)
	})
}

document.querySelector('input[type="search"]').addEventListener('blur', searchMovies)