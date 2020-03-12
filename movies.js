let currentId = 0; //list in numerical order
let moviesList = []; //container to hold list

$(function() {
    $("#new-movie-form").on("submit", function(event) { //select form which to add movies
        event.preventDefault();
        let title = $('#title').val(); //select title and its value
        let rating = $('#rating').val(); //select rating and its value

        let movieData = {title, rating, currentId};
        const appendHTML = createMovieDataHTML(movieData);

        currentId++; //increment currentId when new movie is added
        moviesList.push(movieData);

        $('#movie-table-body').append(appendHTML); //append movie data to table
        $('#new-movie-form').trigger("reset"); //trigger reset on clicking delete
    });
    
    //this function removes parent tr and remove from array of movies
    $("tbody").on("click", ".btn.btn-danger", function(event) { 
        //select tbody when clicking red remove button
        let indexRemove = moviesList.findIndex(movie => movie.currentId === +$(event.target).data("deleteId"))
        moviesList.splice(indexRemove, 1);
        $(event.target) 
            .closest("tr")
            .remove();
    });

    $(".fas").on("click", function(event) {
        let direction = $(event.target).hasClass("fa-sort-down") ? "down" : "up";
        let keyToSortBy = $(event.target).attr("id");
        let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

        $("#movie-table-body").empty();

        for(let movie of sortedMovies) {
            const appendHTML = createMovieDataHTML(movie);
            $("#movie-table-body").append(appendHTML);
        }

        $(event.target).toggleClass("fa-sort-down");
        $(event.target).toggleClass("fa-sort-up");
    });
});

function sortBy(array, keyToSortBy, direction) {
    return array.sort(function(a, b) {
        if (keyToSortBy === "rating") {
            a[keyToSortBy] =+ a[keyToSortBy];
            b[keyToSortBy] =+ b[keyToSortBy];
        }
        if (a[keyToSortBy] > b[keyToSortBy]) {
            return direction === "up" ? 1 : -1;
        } else if (b[keyToSortBy] > a[keyToSortBy]) {
            return direction === "up" ? -1 : 1;
        }
        return 0;
    });
}

function createMovieDataHTML(data) {
    return `
        <tr>
            <td>${data.title}</td>
            <td>${data.rating}</td>
            <td>
                <button class="btn btn-danger" data-delete-id=${data.currentId}>
                Delete
                </button>
            </td>
        <tr>
    `
}