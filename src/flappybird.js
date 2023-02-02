const game = document.getElementById("game");
const background = document.getElementById("background");
const bird = document.getElementById("bird");

let xPosition = 0;
let xVelocity = 2;
let yVelocity = 0;
let imgUrls = ["bird.png", "a.jpg", "b.jpg", "c.jpg"], imgIdx = 0;

document.addEventListener("keydown", function(event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    yVelocity = -10;
  } else if (event.code === "ArrowLeft") {
    xVelocity = Math.max(xVelocity - 0.5, 0);
  } else if (event.code === "ArrowRight") {
    xVelocity += 0.5;
  } else if (event.code === "ArrowDown") {
    yVelocity = 10;
    setTimeout(function() {
      yVelocity = 0;
    }, 1000);
  }
});

game.addEventListener("click", function() {
  yVelocity = -10;
});

const setFullWidth = function() {
  game.style.width = window.innerWidth + "px";
  background.style.backgroundSize = "auto 100%";
  background.style.backgroundRepeat = "repeat-x";
};

const centerBird = function() {
  bird.style.left = (game.offsetWidth - bird.offsetWidth) / 2 + "px";
};

setFullWidth();
centerBird();
window.addEventListener("resize", function() {
  setFullWidth();
  centerBird();
});

setInterval(function() {
  yVelocity += 1;
  let newTop = bird.offsetTop + yVelocity;
  if (newTop + bird.offsetHeight >= game.offsetHeight) {
    yVelocity = -10;

    bird.style.backgroundImage = `url(${imgUrls[imgIdx]})`;
    imgIdx = ++imgIdx % 4;
  }
  bird.style.top = newTop + "px";
  xPosition -= xVelocity;
  background.style.left = xPosition + "px";
}, 50);