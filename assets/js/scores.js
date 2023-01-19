let users = JSON.parse(localStorage.getItem("users") || "[]");

const highScoresContainer = document.querySelector('#highscores');
const clearScoresButton = document.querySelector('#clear');

// if (localStorage.getItem('initials') && localStorage.getItem('score')) {
if (users.length) {
  // sort the users by their score
  users.sort((a, b) => (a.time > b.time) ? 1 : -1);
  users.forEach(user => {
    let li = document.createElement('li');
    li.textContent = user.initials + ' - ' + user.score;
    highScoresContainer.append(li);
  });
}

clearScoresButton.addEventListener('click', () => {
    localStorage.clear();
    highScoresContainer.innerHTML = "";
})

console.log(users.length);
