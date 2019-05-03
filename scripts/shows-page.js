// API KEY
const API_KEY = "0443beba9f7c8579b67f3d7e3ec68152";

//Gets the tv show ID stored in the Session storage and uses it to display information about
//the tv show that has that ID.
function getShowInfo() {

    const showId = sessionStorage.getItem("showId");

    //Defines requests to the API as variable, so they can be used as part of Promise.all, to target
    //mulitple requests at once.
    const seriesPromise = axios.get("https://api.themoviedb.org/3/tv/" + showId + '?api_key=' + API_KEY + '&language=en-US');
    const imdbPromise = axios.get("https://api.themoviedb.org/3/tv/" + showId + '/external_ids?api_key=' + API_KEY + '&language=en-US');
    const seriesCast = axios.get("https://api.themoviedb.org/3/tv/" + showId + '/credits?api_key=' + API_KEY + '&language=en-US')

    //Uses the Promise.all to target multiple requests to the API, uses the defined variables as
    //link holders.
    Promise.all([seriesPromise, imdbPromise, seriesCast])
        .then(([seriesResponse, imdbResponse]) => {
            const series = seriesResponse.data;
            const imdb_id = imdbResponse.data.imdb_id;
            const genres = seriesResponse.data.genres;

            homepage = series.homepage;
            let output = `
			<div class="moviePage">
					<div class="poster"><img src="https://image.tmdb.org/t/p/w300/${series.poster_path}"></div>
					<div class="info">
						<h2>${series.name}</h2>
						<ul>
							<li><strong>Genres:</strong> `;
            for (let i = 0; i < genres.length; i++) {
                if (i != genres.length - 1) {
                    output += `${genres[i].name}, `;
                } else {
                    output += `${genres[i].name}.`;
                }
            }
            output += `</li>
							<li><strong>Episode runtime:</strong> ${series.episode_run_time[0]}min. </li>
							<li><strong>Frist air date:</strong> ${series.first_air_date}.</li>
							<li><strong>Networks:</strong> ${series.networks[0].name}.</li>
							<li><strong>Rating:</strong> ${series.vote_average} / 10 <span id="smallText">(${series.vote_count} votes)</span></li>
							<li><strong>Number of episodes:</strong> ${series.number_of_episodes}.</li>
							<li><strong>Number of seasons:</strong> ${series.number_of_seasons}.</li>
							<li><strong>Last episode to air:</strong> ${series.last_episode_to_air.air_date} "${series.last_episode_to_air.name}".</li>
							<li><strong>Status:</strong> ${series.status}.</li>
							<li><strong>Type: </strong>${series.type}.</li>
							<li><a href="${homepage}" target="_blank">Homepage</a></li>
						</ul>
						<div class="buttons">
							<a href="https://www.imdb.com/title/${imdb_id}"target="_blank"> IMDB Link </a>
							<a onclick="goBack()"> Go back </a>
						</div>
					</div>
				</div>
				<div class="plot">
					<h3>Plot: </h3>
					<p>${series.overview}</p>
				</div>
				`;

            // Display tv shows.
            let info = document.getElementById("movie");
            info.innerHTML = output;
        })
        // If there is an error, it logs the error in the console.
        .catch((err) => {
            let output = "";
            output += `<h1 id="errorTitle">SORRY !</h1>
			<p id="errorText">We could not provide informations about this tv show at this particular moment. Be sure to come back again. Thank you for your understanding. </p>
			<div class="buttons errorBack">
				<a onclick="goBack()"> Go back </a>
			</div>`;
            let info = document.getElementById("movie");
            info.innerHTML = output;
            document.getElementById("rec_title").style.display = 'none';
            document.querySelector(".page").style.display = "none";
            document.getElementById("trailer").style.display = "none";
            document.getElementById("trailer_title").style.display = "none";
        });

    // Another API call, if there's cast info about the tv show.
    Promise.all([seriesPromise, imdbPromise, seriesCast])
        .then(([seriesResponse, imdbResponse, seriesCastResponse]) => {
            const series = seriesResponse.data;
            const imdb_id = imdbResponse.data.imdb_id;
            const genres = seriesResponse.data.genres;
            let cast = seriesCastResponse.data.cast;
            // If the cast length is greater than 5, set it to 5, otherwise show if its < 5.
            if (cast.length > 5) {
                cast.length = 5;
            }

            homepage = seriesResponse.data.homepage;
            let i = 0;
            let output = `
			<div class="moviePage">
					<div class="poster"><img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"></div>
					<div class="info">
						<h2>${series.name}</h2>
						<ul>
							<li><strong>Cast: </strong>`;
            for (i; i < cast.length; i++) {
                if (i != cast.length - 1) {
                    output += `${cast[i].name},`
                } else {
                    output += `${cast[i].name}.`
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
							<li><strong>Episode runtime:</strong> ${series.episode_run_time[0]}min. </li>
							<li><strong>Frist air date:</strong> ${series.first_air_date}.</li>
							<li><strong>Networks:</strong> ${series.networks[0].name}.</li>
							<li><strong>Rating:</strong> ${series.vote_average} / 10 <span id="smallText">(${series.vote_count} votes)</span></li>
							<li><strong>Number of episodes:</strong> ${series.number_of_episodes}.</li>
							<li><strong>Number of seasons:</strong> ${series.number_of_seasons}.</li>
							<li><strong>Last episode to air:</strong> ${series.last_episode_to_air.air_date} "${series.last_episode_to_air.name}".</li>
							<li><strong>Status:</strong> ${series.status}.</li>
							<li><strong>Type: </strong>${series.type}.</li>
							<li><a href="${homepage}" target="_blank">Homepage</a></li>
						</ul>
						<div class="buttons">
							<a href="https://www.imdb.com/title/${imdb_id}"target="_blank"> IMDB Link </a>
						</div>
					</div>
				</div>
				<div class="plot">
					<h3>Plot</h3>
					<p>${series.overview}</p>
				</div>
				`;
            // Display tv shows.
            let info = document.getElementById("movie");
            info.innerHTML = output;
        })
        .catch((err) => {
            console.log(err);
            let output = "";
            output += `<h1 id="errorTitle">SORRY !</h1>
			<p id="errorText">We could not provide informations about this tv show at this particular moment. Be sure to come back again. Thank you for your understanding. </p>
			<div class="buttons errorBack">
				<a onclick="goBack()"> Go back </a>
			</div>`;
            let info = document.getElementById("movie");
            info.innerHTML = output;
            document.getElementById("rec_title").style.display = 'none';
            document.querySelector(".page").style.display = "none";
            document.getElementById("trailer").style.display = "none";
            document.getElementById("trailer_title").style.display = "none";
        })
    // Gets the trailer link from youtube. Video is hidden until users click on TRAILER button.
    axios.get("https://api.themoviedb.org/3/tv/" + showId + '/videos?api_key=' + API_KEY + '&language=en-US')
        .then((response) => {

            //Targets the first item in the results Array, that hold the "key" parameter.
            let trailer = response.data.results;

            // RANDOM NUMBER FOR TRAILER OUTPUT (ON EVERY PAGE LOAD, A DIFFERENT TRAILER WILL SHOW).
            let min = 0;
            // -1 to take into account if theres only one item in the array at position 0.
            let max = trailer.length - 1;
            min = Math.ceil(min);
            max = Math.floor(max);
            let trailerNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            let output = `
					<div class="video">
					<iframe width="620" height="400" src="https://www.youtube.com/embed/${trailer[trailerNumber].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					</div>
				`;
            // Display tv shows.
            let trailerOutput = document.getElementById("trailer");
            trailerOutput.innerHTML = output;
        })
        // If there is an error, it logs the error in the console.
        .catch((err) => {
            let trailerOutput = document.getElementById("trailer");
            trailerOutput.innerHTML =
                `<div class="trailer_error">
					<h3>We are sorry! </h3>
					<br>
					<p>No video available at this moment. Try reloading the page.</p>
				 </div>`;
        });
}


// Detailed tv shows page.
function showSelected(id){
	sessionStorage.setItem("showId", id);
	location.replace("shows-page.html");
	return false;
}
