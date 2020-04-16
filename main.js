// add preloader.....

const endpoint = "https://frontendnina-aa49.restdb.io/rest/movies";
const apiKey = "5e9604dd436377171a0c23a6";

window.addEventListener("load", (e) => {
  document.querySelector("button.add-new").addEventListener("click", () => {
    const data = {
      Title: "Fight Club",
      Genre: "Thriller",
      Year: "12.06.1999",
      Tagline: [
        " The first rule of Fight Club is: You do not talk about Fight Club.",
      ],
    };
    post(data);
  });
});

function get() {
  document.querySelector("main").innerHTML = "";
  fetch(endpoint + "?max=100", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then(showMovies);
}
get();

function showMovies(data) {
  data.forEach(showMovie);
}
function showMovie(movie) {
  console.log(movie);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector("main");
  copy.querySelector("article").dataset.id = movie._id;
  copy.querySelector("h1").textContent = movie.Title;
  copy.querySelector("h2").textContent = movie.Genre;
  copy.querySelector(".date").textContent = movie.Year;
  copy.querySelector("h5").textContent = movie.Tagline;
  //copy.querySelector(".poster").src = movie.Image;
  // const poster = copy.querySelector(".poster");
  //poster.src = movie.Image;
  copy
    .querySelector("button")
    .addEventListener("click", () => deleteIt(movie._id));
  parent.appendChild(copy);
}
function post(data) {
  //OPTIMISTIC INSERTS
  //showMovie(data);
  const postData = JSON.stringify(data);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => showMovie(data));
}
//-------------delete
function deleteIt(id) {
  document.querySelector(`article[data-id="${id}"]`).remove();
  fetch(`${endpoint}/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
function put(id) {
  const data = {
    Title: "Fight Club",
    Genre: "Thriller",
    Year: "12.06.1999",
    Tagline: [" I don't want to die without any scars."],
  };
  let postData = JSON.stringify(data);

  fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((d) => d.json())
    .then((data) => {
      const copy = document.querySelector(`article[data-id="${id}"]`);
      copy.querySelector("h1").textContent = data.Title;
      copy.querySelector("h2").textContent = data.Genre;
      copy.querySelector(".date").textContent = data.Year;
      copy.querySelector("h5").textContent = data.Tagline;
    });
}
