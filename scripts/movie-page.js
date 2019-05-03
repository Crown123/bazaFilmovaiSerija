// API KEY
const API_KEY = "0443beba9f7c8579b67f3d7e3ec68152";

//Gets the movie ID stored in the Session storage and uses it to display information about
//the movie that has that ID.
function getMovie() {

    let movieId = sessionStorage.getItem("movieId");

    const movieInfo = axios.get("https://api.themoviedb.org/3/movie/" + movieId + '?api_key=' + API_KEY + '&language=en-US');
    const movieCast = axios.get("https://api.themoviedb.org/3/movie/" + movieId + '/credits?api_key=' + API_KEY)
    Promise.all([movieInfo, movieCast])
        .then(([movieInfoResponse, movieCastResponse]) => {
            const movie = movieInfoResponse.data;
            const cast = movieCastResponse.data.cast;
            const genres = movieInfoResponse.data.genres;
            cast.length = 5;

            //Grab the popularity parameter from the data and rounds it to a whole number%.
            popularity = movieInfoResponse.data.popularity;
            popularity = Math.floor(popularity)

            //Revenue - dynamically make it format itself into a standard looking currency.
            let revenue = movieInfoResponse.data.revenue;
            revenue = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(revenue);

            let output = `
			<div class="moviePage">
			<div class="poster"><img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"></div>
			<div class="info">
				<h2>${movie.title}</h2>
				<ul>
					<li><strong>Cast:</strong> `;
            for (let i = 0; i < cast.length; i++) {
                if (i != cast.length - 1) {
                    output += `${cast[i].name}, `;
                } else {
                    output += `${cast[i].name}.`;
                }
            }
            output += `</li>
					<li><strong>Genres:</strong> `;
            for (let i = 0; i < genres.length; i++) {
                if (i != genres.length - 1) {
                    output += `${genres[i].name}, `;
                } else {
                    output += `${genres[i].name}.`;
                }
            }
            output += `</li>
					<li><strong>Tagline:</strong> ${movie.tagline} </li>
					<li><strong>Release Date:</strong> ${movie.release_date}</li>
					<li><strong>Runtime:</strong> ${movie.runtime} (min)</li>
					<li><strong>Rating:</strong> ${movie.vote_average} / 10 <span id="smallText">(${movie.vote_count} votes)</span></li>
					<li><strong>Revenue:</strong> ${revenue}</li>
					<li><strong>Status:</strong> ${movie.status}</li>
					<li><strong>Production companies:</strong> ${movie.production_companies[0].name}</li>
				</ul>
				<div class="buttons">
					<a href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank"> IMDB Link </a>
				</div>
			</div>
		</div>
		<div class="plot">
			<h3>Plot</h3>
			<p>${movie.overview}</p>
		</div>`;

            //Targets the "movie" element and appends the output to it.
            const info = document.getElementById("movie");
            info.innerHTML = output;

        })
        //If there is an error, show this.
        .catch((err) => {
            let output = "";
            output += `<h1 id="errorTitle">SORRY !</h1>
			<p id="errorText">We could not provide informations about this movie at this particular moment. Be sure to come back again. Thank you for your understanding. </p>
			<div class="buttons errorBack">
				<a onclick="goBack()"> Go back </a>
			</div>`;
            // Hide elements if theres an error.
            let info = document.getElementById("movie");
            info.innerHTML = output;
            document.getElementById("rec_title").style.display = 'none';
            document.querySelector(".page").style.display = "none";
            document.getElementById("trailer").style.display = "none";
            document.getElementById("trailer_title").style.display = "none";
        });

    //Gets the trailer link from youtube.
    axios.get("https://api.themoviedb.org/3/movie/" + movieId + '/videos?api_key=' + API_KEY + '&language=en-US')
        .then((response) => {
            //Targets the first item in the results Array, that hold the "key" parameter.
            let trailer = response.data.results;

            // RANDOM NUMBER FOR TRAILER OUTPUT (ON EVERY PAGE LOAD, A DIFFERENT TRAILER WILL SHOW).
            let min = 0;
            // -1 so it takes into account if theres only 1 item in the trailer length( at position 0).
            let max = trailer.length - 1;
            min = Math.ceil(min);
            max = Math.floor(max);
            let trailerNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            let output = `
					<div class="video">
					<iframe width="620" height="400" src="https://www.youtube.com/embed/${trailer[trailerNumber].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					</div>`;
            // Display the trailer.
            let video = document.getElementById("trailer");
            video.innerHTML = output;
        })

        .catch((err) => {
            // Error message.
            let trailerOutput = document.getElementById("trailer");
            document.getElementById("trailer_title").style.display = "none";
            trailerOutput.innerHTML =
                `<div class="trailer_error">
					<h3>We are sorry! </h3>
					<br>
					<p>No video available at this moment. Try reloading the page.</p>
				 </div>`;
        });
}

// Take user to details page.
function movieSelected(id) {
    sessionStorage.setItem("movieId", id);
    location.replace("movie-page.html");
    return false;
}
