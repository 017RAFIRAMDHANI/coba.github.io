$(".serrr").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=f54d78a9&s="+ $('.input-key').val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showcard(m);
      });
      $(".movies-c").html(cards);
      // ketika detail di klik
      $(".modal-detail-b").on("click", function () {
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=f54d78a9&i=" + $(this).data("imdbid"),
          success: (m) => {
            const movidetal = showsie(m);

            $(".modal-body").html(movidetal);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showcard(m) {
  return `<div class="col-md-4 my-5">
    <div class="card" style="width: 18rem">
      <img class="card-img-top" src="${m.Poster}" alt="Card image cap" />
  <div class="card-body">
    <h5 class="card-title">${m.Title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
    <a href="#" class="btn btn-primary modal-detail-b" data-toggle="modal" data-target="#movieModal" data-imdbid="${m.imdbID}" >Show Details</a>
  </div>
</div>
</div>`;
}

function showsie(m) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" alt="" class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
          <li class="list-group-item"><strong>Director :</strong>${m.Director}</li>
          <li class="list-group-item"><strong>Actors :</strong>${m.Actors}</li>
          <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
          <li class="list-group-item"><strong>Plot :</strong><br />${m.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`;
}
