const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", movieDropdownClickHandler);
renderDropdownOptions();

async function fetchMovieDetails(movieName){
    const url = "https://www.omdbapi.com/?i=" + movieName + "&apikey=5e52b91f";
    try{
        const response = await fetch(url);
        const json = await response.json();
        return json;
    //Error handling
    } catch (error) {
        console.log(error);
    }
}

/*creates dropdown options*/
function renderDropdownOptions (){
    const myMovies = [{"title" : "Monkey Man", "id" : "tt9214772"},
                    {"title" : "Civil War", "id" : "tt17279496"},
                    {"title" : "Abigail", "id" : "tt27489557"},
                    {"title" : "The Fall Guy", "id" : "tt1684562"},
                    {"title" : "Tarot", "id" : "tt14088510"},
                    {"title" : "Furiosa", "id" : "tt12037194"}];
    const select = document.getElementById("dropdown");    

    myMovies.forEach(movie => {
        const option = document.createElement("option");
        option.textContent = movie.title;
        option.value = movie.id;
        select.appendChild(option);
    });
}
/* Button click event handler */
async function movieDropdownClickHandler(event){
    const select = document.getElementById("dropdown");
    const movieId = select.options[select.selectedIndex].value;

    const data = await fetchMovieDetails(movieId);
    const card = createCardElement({
        title: data.Title,
        year: data.Year,
        genre: data.Genre,
        poster: data.Poster,
        linkid: data.imdbID
    });
    document.getElementById("movie-card").innerHTML = card;
}

/*HTML from API call*/
function createCardElement(item) {
    return `
        <img class="poster" src=${item.poster} alt="Poster for the movie ${item.title}">
        <div class="card-content">
            <h2>
                ${item.genre}
            </h2>
            <h3 class="header">
                ${item.title} - ${item.year}
            </h3>
            <a href="https://www.imdb.com/title/${item.linkid}">IMDb: ${item.title} Link</a>
        </div>
      `;
  }
