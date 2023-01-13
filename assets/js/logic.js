const timer = document.querySelector('#time');

let time = 90;

setInterval(function () {
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  timer.textContent = `0${minutes}:${seconds}`;
  time--;
}, 1000);

console.log(time);