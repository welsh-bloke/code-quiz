const highScoresContainer = document.querySelector('#highscores');

let li = document.createElement('li');
li.textContent = localStorage.getItem('initials') + ' - ' + localStorage.getItem('score');

highScoresContainer.append(li);
