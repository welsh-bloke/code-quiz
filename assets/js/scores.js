let users = JSON.parse(localStorage.getItem("users") || "[]");
console.log(users);
const highScoresContainer = document.querySelector('#highscores');
const clearScoresButton = document.querySelector('#clear');

// if (localStorage.getItem('initials') && localStorage.getItem('score')) {
if (users.length) {
  // sort the users by their score
  users.sort((a, b) => (a.score > b.score) ? 1 : -1).reverse();
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

console.log(users);
