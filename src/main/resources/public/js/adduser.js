
// add new player
const createUser = (player) => {
    axios.post('http://localhost:8080/player', player)
    .then(response => {
      const player = response.data;
      location.replace("index.html")
    })
    .catch(error => console.error(error));

    };

    const use = document.querySelector(".userform");

    use.addEventListener("submit", event => {

    event.preventDefault();

    const password = document.querySelector(".password").value;
    const username = document.querySelector(".name").value;

    const player = {username, password};

    createUser(player);
    });