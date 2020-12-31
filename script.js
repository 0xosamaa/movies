let page = 1
let API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=63826f266260379148385925b851f028&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=63826f266260379148385925b851f028&query="'
const main = document.querySelector('.main')
const form = document.querySelector('form')
const search = document.querySelector('#search')
const buttons = document.querySelectorAll('.pages button a')
const pageNum = document.querySelector('.page')
const pages = document.querySelector('.pages')

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''
    let color
    for (let i = 0; i < movies.length; i++) {
        if(movies[i].vote_average < 5) color = 'red'
        else if(movies[i].vote_average < 8) color = 'orange'
        else color = 'green'

        main.innerHTML = main.innerHTML + `<div class="movie">
        <img src="${IMG_PATH + movies[i].backdrop_path}"
          alt="${movies[i].title}"/>
        <div class="movie-info">
          <h3>${movies[i].title}</h3>
          <span class="${color}">${movies[i].vote_average}</span>
        </div>
        <div class="overview">
          <h3>${movies[i].title}</h3>
          ${movies[i].overview}
        </div>
      </div>`
    }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm.trim() !== '') {
    getMovies(SEARCH_API + searchTerm + '"')
    search.value = ''
  } else window.location.reload()
})

buttons.forEach(button => {
    button.addEventListener('click', () => {
        page = +button.innerText
        API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=63826f266260379148385925b851f028&page=${page}`
        getMovies(API_URL)
        pageNum.innerHTML = `Page ${page}`
    })
})

getMovies(API_URL)