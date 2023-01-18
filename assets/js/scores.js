const highScoresContainer = document.querySelector('#highscores');
const clearScoresButton = document.querySelector('#clear');

let li = document.createElement('li');
li.textContent = localStorage.getItem('initials') + ' - ' + localStorage.getItem('score');

highScoresContainer.append(li);

clearScoresButton.addEventListener('click', () => {
  localStorage.clear();
  highScoresContainer.removeChild(li);
})
