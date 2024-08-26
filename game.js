const colors = ['green', 'red', 'yellow', 'blue'];
let level = 0;
let userColorsChoice = [];
let gameColorsChoice = [];
let started = false;

$(document).keypress(startGame);

$('.btn').click(function () {
  if (started === false) { return };
  let userColor = $(this).attr('id');
  userColorsChoice.push(userColor);
  $(userColor).addClass('clicked');
  setTimeout(() => {
    $(userColor).removeClass('clicked');
  }, 100);
  soundPlay(userColor);
  checkUserColorsChoice(userColorsChoice.length - 1)
})

function startGame() {
  let timeStart = 3;
  timer(timeStart)
  if (!started) {
    setTimeout(() => {
      runGame();
      started = true;
    }, 5500)
  }
}

function runGame() {
  userColorsChoice = [];
  level++;
  $("#level-title").css("transform", "scale(1)")

  if (level > 3) {
    win()
  } else {
    message(`Level ${level}`)
    const random = randomButton();
    const randomColor = colors[random];
    soundPlay(randomColor)
    gameColorsChoice.push(randomColor);
    $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  }
}

function checkUserColorsChoice(current) {
  if (started === false) { return };
  if (userColorsChoice[current] === gameColorsChoice[current]) {
    if (userColorsChoice.length === gameColorsChoice.length) {
      setTimeout(() => {
        runGame();
      }, (level / 2) * 1000)
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  soundPlay('wrong');
  restart();
  $("body").addClass('game-over');
  setTimeout(() => {
    $("body").removeClass('game-over');
  }, 200);
  message('Game over')
  $('body').fadeIn(100).fadeOut(100).fadeIn(100);
  setTimeout(() => {
    message("To restart game, click any key on keyboard");
  }, 3000);
}

function win() {
  soundPlay('beep');
  started = false;
  message("You are winner !!! 🎉🎉🎉");
  setTimeout(() => {
    message("To restart game, click any key on keyboard");
  }, 3000);
  restart();
}

function restart() {
  level = 0;
  userColorsChoice = [];
  gameColorsChoice = [];
  started = false;
}

function timer(num) {
  let sec = num;
  const time = 1500;
  const timeDuration = num * time;
  message('Start')
  let timerSet = setInterval(() => {
    $("#level-title").css("transform", "scale(2)")
    $("#level-title").text(`${sec--} `);
  }, time)
  setTimeout(() => {
    clearInterval(timerSet)
  }, timeDuration)
}

function randomButton() {
  const random = Math.floor(Math.random() * colors.length);
  return random;
}

function message(msg) {
  $("#level-title").text(msg);
}

function soundPlay(color) {
  const sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}
