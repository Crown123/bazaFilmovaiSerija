// API KEY
const API_KEY = "0443beba9f7c8579b67f3d7e3ec68152";

//Get the value from the form on submit and then run the functions.
const form = document.getElementById("form");

form.addEventListener("submit", (e)=>{
    let input = document.getElementById("inputField").value;
    let searchedFor = document.getElementById("searchedFor");

    if (isNaN(input)){
        // IF THE INPUT VALUE IS A STRING:
        searchedFor.innerHTML = "Title:  " +"<span>" +input+ "</span>"
        showByTitle(input);
    } else {
        // IF THE INPUT VALUE IS A NUMBER:
        searchedFor.innerHTML = "Search by year does not work: " +"<span>" +input+ "</span>"
    }

    e.preventDefault();
})

function showByTitle(input){
    sessionStorage.setItem("tvShowsTitle", input);

    axios.get("https://api.themoviedb.org/3/search/tv?query="+input+'&api_key='+API_KEY+'&language=en-US&page=1')
        .then((response)=>{
            console.log(response);
            let series = response.data.results;
            let output = "";
            for(let i = 0; i < series.length; i++){
                let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
				if(favoriteSeries.indexOf(id) === -1){
					output += `
					<div class="card">
						<div class="overlay">
						<div class="movie">
							<h2>${series[i].name}</h2>
                                <p id="p_rating"><strong>Rating:</strong> <span>${series[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
								<p><strong>First air date:</strong> <span>${series[i].first_air_date} <i class="material-icons date">date_range</i> </span></p>
								<a onclick="showSelected('${series[i].id}')" href="#">Details</a>
						</div>
						</div>
						<div class="card_img">
							<img src="http://image.tmdb.org/t/p/w400/${series[i].poster_path}" onerror="this.onerror=null;this.src='../Slike/download.png';">
						</div>
					</div>
					`;
				} else {
					output += `
                    <div class="card">
                    <div class="overlay">
                    <div class="movie">
                        <h2>${series[i].name}</h2>
                            <p id="p_rating"><strong>Rating:</strong> <span>${series[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
                            <p><strong>First air date:</strong> <span>${series[i].first_air_date} <i class="material-icons date">date_range</i> </span></p>
                            <a onclick="showSelected('${series[i].id}')" href="#">Details</a>
                    </div>
                    </div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w400/${series[i].poster_path}" onerror="this.onerror=null;this.src='../Slike/download.png';">
                    </div>
                </div>
				`;
				}
            }
            let shows = document.getElementById("movies");
            shows.innerHTML = output;
        })
}


//Takes the user to detailed tv show info page.
function showSelected(id){
    sessionStorage.setItem("showId", id);
    window.open("../html/shows-page.html");
    return false;
}