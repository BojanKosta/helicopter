 let myHero;
    let called = false;
    let walls = [];
    let wallsCount = 2;
    let points = 0;
    let crashes = 1;
	let myMusic = new Audio('/music/crash.mp3');
	let mySound = new Audio('/music/DaysBehindTheWheel.mp3');

	const minHeight = 0;
	const maxHeight = 310;
	const height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
	const gap = 300;

    var myGameArea = {
        canvas: document.getElementById("myFishingGame"),
        start: function() {
            this.context = this.canvas.getContext("2d");
            this.interval = setInterval(updateGameArea, 25)
        },
        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop: function() {
            clearInterval(this.interval);
        }
    }

    function startGame() {
				mySound.play();
				mySound.loop = true;
				called = true;
				document.getElementById("crashes").innerHTML = "Begginer";
				crashes=1;
				points=0;
				document.getElementById("points").innerHTML = points;
				myGameArea.start();
		myHero = new Component(140,100, "/images/helicopter.png", 120, 120, 2, "image");
		document.getElementById("user_action").style.display="none";
			walls.push(new Rect(100,height,"red",1360,0,5));
			walls.push(new Rect(100,610-height-gap,"red",1360,height+gap,5));
    }

    function updateGameArea() {
        myGameArea.clear();
		document.getElementById("myFishingGame").style.animation = 'mymove 10s linear infinite';

		if(crashes<1){
		   end();
		   return;
		}

		for (let i = 0; i < wallsCount; i++) {
			walls[i].x -= walls[i].speed;
			walls[i].update();
		}

			if (walls[0].x < -100 ) {
				updatingWalls();
				walls[0].speed += 2;
				walls[1].speed += 2;
				points += 5;
			}

			if(isCollide(myHero,walls[0]) || isCollide(myHero,walls[1]) || myHero.y <= 0 || myHero.y >= 520 ){
				updatingWalls();
				walls[0].speed = 5;
				walls[1].speed = 5;
				crashes--;
				myMusic.play();
				mySound.pause();
			}

		document.getElementById("points").innerHTML = points;
		myHero.y += myHero.speed;
		myHero.update();

    }

	function getRandomColor() {
			let r = function () {
					return Math.floor(Math.random()*256)
					};
			return "rgb(" + r() + "," + r() + "," + r() + ")";
}

	function updatingWalls(){
				let level = "Begginer";
			if(points > 19 && points < 35){
					level = "Good";
					document.getElementById("myFishingGame").style.backgroundImage = 'url(/images/back3.png)';
			} else if (points > 34 && points < 55){
					level = "Very Good";
					document.getElementById("myFishingGame").style.backgroundImage = 'url(/images/back5.png)';
			} else if (points > 54 && points < 75){
					level = "Awesome";
					document.getElementById("myFishingGame").style.backgroundImage = 'url(/images/back2.jpg)';
			} else if (points > 74 && points < 95){
					level = "Advanced";
					document.getElementById("myFishingGame").style.backgroundImage = 'url(/images/back1.jpg)';
			} else if (points > 94 && points < 115){
					level = "Master";
					document.getElementById("myFishingGame").style.backgroundImage = 'url(/images/back6.jpg)';
			} else if (points > 114) {
					level = "Pro";
					document.getElementById("myFishingGame").style.backgroundImage = 'url(/images/back7.jpg)';
			}

		document.getElementById("crashes").innerHTML = level;
			let speed = walls[0].speed;
				walls.splice(0, 2);
			let randomColor = getRandomColor();
				walls.push(new Rect(100,height,randomColor,1360,0,speed));
				walls.push(new Rect(100,620-height-gap,randomColor,1360,height+gap,speed));
	}

	function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

    function Component(width, height, src, x, y, speed, type) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = src;
        this.speed = speed;
        this.update = function() {
            let ctx = myGameArea.context;
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        };
    }

	function Rect(width,height,color,x,y,speed){
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speed = speed;

		this.update = function() {
            let rectangle = myGameArea.context;
            rectangle.fillStyle = color;
			rectangle.fillRect(this.x, this.y,this.width,this.height);
        };
	}

    window.onkeydown = function(e) {
        let keyCode = e.which;
		console.log(keyCode);
        if (keyCode === 38){
            myHero.y = myHero.y - 40;
		}
        else if (keyCode === 40){
            myHero.y = myHero.y + 10;
		} else {
			if(!called){
				startGame();
			}
		}
    }

    function end() {
		document.getElementById("myFishingGame").style.animationPlayState = "paused";
		called = false;

		const addScore = async (score) => {
           await axios.post('http://localhost:8080/playing', score)
            .then(response => {
              const player = response.data;
              console.log(score);
            })
            .catch(error => console.error(error));

            };

		const score = { score : points};

		addScore(score);

		 const bestScore = async (score) => {
                await axios.post('http://localhost:8080/score', score)
                .then(response => {
                  const player = response.data;
                  console.log(player);
                })
                .catch(error => console.error(error));

                };

        bestScore(score);



window.setTimeout(function(){

 const printScore =  () => {
                    axios.get('http://localhost:8080/getscore')
                    .then(response => {
                      const player = response.data;
                      console.log(player);
                        var rank = 1;
                      const createList = (score) => {

                            var newHtml;
                            const element = document.getElementById("user_action");

                            var html = '<p class = "name-player">%rank% Player: %name%   Score: %score%</p>';

                          newHtml = html.replace('%name%', score.name);
                          newHtml = newHtml.replace('%score%', score.score);
                          newHtml = newHtml.replace('%rank%', rank);

                        rank++;
                        element.insertAdjacentHTML('beforeend', newHtml);
                      }
                      player.sort((a, b) => a.score - b.score);
                      for (var i = 9; i>=0; i--){
                      createList(player[i]);
                      }
                })
                .catch(error => console.error(error));
                };

                 printScore();

 }, 2000);



        myGameArea.stop();
        myGameArea.clear();
		document.getElementById("user_action").style.display="block";
		document.getElementById("message").innerHTML="BOOM! Your score is "+points;
		document.getElementById("top").innerHTML="Top 10 scores";
    }