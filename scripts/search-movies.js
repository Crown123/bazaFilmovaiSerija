// API KEY
const API_KEY = "0443beba9f7c8579b67f3d7e3ec68152";


//Get the value from the form on submit and then run the functions.
const form = document.getElementById("form");

form.addEventListener("submit", (e)=>{
    let input = document.getElementById("inputField").value;
    let searchedFor = document.getElementById("searchedFor");
    

    if(isNaN(input)){
        // If the input value is a STRING :
        searchedFor.innerHTML = "Movie title: " +"<span>" +input+ "</span>"
        searchedFor.style.fontSize = "30px";
        searchMovies(input);
    } else {
        //Call function.
        searchedFor.style.fontSize = "50px";
        searchedFor.innerHTML = "Search by year does not work: " + "<span>" +input+ "</span>";
    }
    e.preventDefault();
})
// MOVIES BY TITLE.
function searchMovies(searchText){

	axios.get("https://api.themoviedb.org/3/search/movie?query="+searchText+'&api_key='+API_KEY+'&language=en-US&page=pageNum=1&include_adult=false')
		.then( (response) =>{
            let movie = response.data.results;
            let output = "";
            
			//Appends to the output the info for each fetched result.
			for(let i = 0; i < movie.length; i++){
				let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
				if(favoriteMovies.indexOf(id) === -1){
					output += `
					<div class="card">
						<div class="overlay">
						<div class="movie">
							<h2>${movie[i].title}</h2>
								<p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
                                <p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
                                <a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
						</div>
						</div>
						<div class="card_img">
							<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../Slike/download.png';">
						</div>
					</div>
					`;
				} else {
					output += `
                    <div class="card">
                    <div class="overlay">
                    <div class="movie">
                        <h2>${movie[i].title}</h2>
                            <p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
                            <p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
                            						</div>
                    </div>
                    </div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../Slike/download.png';">
                    </div>
                </div>
				`;
				}
            }
			let moviesInfo = document.getElementById("movies");
            moviesInfo.innerHTML = output;

		})
		//If theres an error, it logs it in the console.
		.catch ((err)=>{
			console.log(err);
		})
}

//Get the movie ID, set it to storageSession and then re-direct the user to movie details page.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    window.open("../html/movie-page.html");
    return false;
}







