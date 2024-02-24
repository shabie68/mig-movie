async function defaultMovies() {
	let res = await fetch('http://www.omdbapi.com/?apikey=8e76539a&s=pat&page=2')
	let movies = await res.json()
	loadMovies(movies.Search)

}

defaultMovies()

let unratedMovies = [];
let sliderMovies = []

function appendSliderMovies(movie) {

	let container = document.createElement('div')
	let title = document.createElement('h2')
	let img = document.createElement('img')
	title.innerHTML = movie.Title
	img.src = movie.Poster !="N/A" ? movie.Poster : "file:///D:/new_life/mignon-movie/images/default.jpg"
	container.appendChild(img)
	container.appendChild(title)

	document.querySelector(".slider").appendChild(container)
}

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
	
	movies.forEach((movie, idx) => {
		console.log(idx)
		if(idx<4) {
			appendSliderMovies(movie)
		}
		appendMovies('mig-load-movies', movie)
		
		showRating(movie)

	})


}

async function showRating(movie) {
	
	let res = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=8e76539a`)
	let rating = await res.json()
	let elem = document.getElementById(`mig-rating-${movie.imdbID}`)
	elem.innerHTML = "RATING: " + rating.Ratings[0]?.Value

	if(!rating.Ratings[0]) {

		unratedMovies.push(movie)
		let rateElement = document.createElement('input')
		console.log(elem.closest("div"))
		rateElement.id = `mig-rate-movie--${movie.imdbID}`

		elem.closest("div").appendChild(rateElement)

		rateElement.addEventListener('blur', addRating)
		
	}

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

function addRating(event) {
	
	let [, omdbapi] = event.target.id.split("--")
	let id = `mig-rating-${omdbapi}`
	document.getElementById(id).innerHTML ="RATINGS: " + event.target.value + " / 10"
	document.getElementById(event.target.id).remove()

}

document.querySelector('input[type="search"]').addEventListener('blur', searchMovies)