
const createList = (score) => {

      var newHtml;
      const element = document.querySelector('.sco');
      console.log(score);

      var html = '<div class = "cards">'
      +'<h2 class = "name">%name%</h2>'
      +'<h4 class = "score">%score%</h4>'
      +'</div>';

    newHtml = html.replace('%name%', score.name);
    newHtml = newHtml.replace('%score%', score.score);

  element.insertAdjacentHTML('beforeend', newHtml);
}

// add best score to player if it is bigger
const addScore = (score) => {
    axios.post('http://localhost:8080/playing', score)
    .then(response => {
      const player = response.data;
      console.log(score);
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
        })
        .catch(error => console.error(error));

        };

         const uses = document.querySelector(".list");

         uses.addEventListener("click", event => {

             const score = { score: 3000 };
             bestScore(score);

        });



        const printScore = () => {
            axios.get('http://localhost:8080/getscore')
            .then(response => {
              const player = response.data;
              console.log(player);

    const createList = (score) => {

      var newHtml;
      const element = document.querySelector('.sco');
      console.log(score);

      var html = '<div class = "cards">'
      +'<h2 class = "name">%name%</h2>'
      +'<h4 class = "score">%score%</h4>'
      +'</div>';

    newHtml = html.replace('%name%', score.name);
    newHtml = newHtml.replace('%score%', score.score);

  element.insertAdjacentHTML('beforeend', newHtml);
}
           player.forEach(createList);

//              const arr = player.map(post => {
//                          return createList(post);
//                          });

//              for(var i =0; i<player.size; i++){
//                createList(player[i]);
//                console.log(player[i].name);
//              }
            })
            .catch(error => console.error(error));

            };
            printScore();