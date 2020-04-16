function get() {
  fetch("https://frontendnina-aa49.restdb.io/rest/superheroes?max=100 ", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5e9604dd436377171a0c23a6",
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then((e) => console.log(e));
}
