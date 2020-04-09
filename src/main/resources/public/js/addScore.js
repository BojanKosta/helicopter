
// add best score to player if it is bigger
const addScore = (score) => {
    axios.post('http://localhost:8080/playing', score)
    .then(response => {
      const player = response.data;
      location.replace("login.html")
    })
    .catch(error => console.error(error));

    };

     const use = document.querySelector(".score");

     use.addEventListener("click", event => {

         const score = { score: 1000 };
         addScore(score);

    });


// add score to score board if it is bigger the top 5
    const bestScore = (score) => {
        axios.post('http://localhost:8080/score', score)
        .then(response => {
          const player = response.data;
          console.log(player);
    //      location.replace("login.html")
        })
        .catch(error => console.error(error));

        };

         const uses = document.querySelector(".list");

         uses.addEventListener("click", event => {

             const score = { score: 3000 };
             bestScore(score);

        });