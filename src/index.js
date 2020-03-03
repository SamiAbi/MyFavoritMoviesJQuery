const star = '<i class="fas fa-star" style="color:  burlywood;">';
const emptyRow = '<tr id="emptyRow"><td></td><td class="text-center">empty</td><td></td></tr>'
var numberOfMovies = 0;
var movies = [];
var sortedAsc = false;
$(document).ready(function () {
    !!checkIfEmptyTable() && AddToTable(emptyRow);
    $('#addMovie').on('click', function () {
        var title = $('#movieTitle').val();
        var rating = $('#movieRate').val();
        if (title == '') {
            $('#movieTitle').addClass('is-invalid');
            return;
        }
        else
            $('#movieTitle').removeClass('is-invalid');
        if (rating == '' || rating > 10 || rating < 1) {
            $('#movieRate').addClass('is-invalid');
            return;
        }
        else
            $('#movieRate').removeClass('is-invalid');
        bindToMovies(title, rating);
        $('#movieTitle').val('');
        $('#movieRate').val('');
        numberOfMovies++;
        $('#addModal').modal('hide')
    });
    $('#sortRating').on('click', ['rating'], sortHandler);
    $('#sortTitles').on('click', ['title'], sortHandler);
});
function checkIfEmptyTable() {
    if (movies.length == 0)
        return true;
    return false;
}
function AddToTable(row) {
    $('#moviesTable').append(row);
}
function sortHandler(event) {
    var sortedMovies = movies.sort(function (a, b) {
        if (event.data == 'rating') {
            if (!sortedAsc)
                return a[event.data] - b[event.data];
            return b[event.data] - a[event.data];
        }
        else {
            if (!sortedAsc)
                return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
            return (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0);
        }
    })
    if (!sortedAsc)
        sortedAsc = true;
    else
        sortedAsc = false;
    $('#moviesTable').empty();
    !!checkIfEmptyTable() && AddToTable(emptyRow);
    movies = [];
    sortedMovies.map(value => bindToMovies(value.title, value.rating));
}
function ratingStars(numberOfStar) {
    var stars = '';
    for (var i = 0; i < numberOfStar; i++)
        stars += star;
    return stars;
}
function bindToMovies(title, rating) {
    if (numberOfMovies == 0)
        $('tr').remove(`#emptyRow`);
    var id = numberOfMovies++;
    var movieRow = `<tr id='${id}'>
                        <td>${title}</td>
                        <td>${ratingStars(rating)}</td>
                        <td><button type="button" class="btn" id='delete-${id}'><i class="fas fa-trash-alt"></i></button></td>
                    </tr>`;
    AddToTable(movieRow);
    $(`#delete-${id}`).on('click', function () {
        $('tr').remove(`#${id}`);
        movies = movies.filter((movie) => id != movie['id']);
        !!checkIfEmptyTable() && AddToTable(emptyRow);
    });
    movies.push({ 'id': id, 'title': title, 'rating': rating });
}