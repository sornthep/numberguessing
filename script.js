console.log('start...');

const maxi = 50;

let secret = Math.trunc(Math.random() * maxi) + 1;
let yourGuess;
let numScore = maxi;
let highestScore = 0;
let won = false;

const msgEl = document.querySelector('.message');
const guessEl = document.querySelector('.guess');
const btnEl = document.querySelector('.btn');
const score = document.querySelector('.score');
const reset = document.querySelector('.reset-btn');

myFunction = () => {
    if (! won) {
        yourGuess = Number(guessEl.value);
        // console.log(guessEl.value,yourGuess);
        if (yourGuess >= 1 && yourGuess <= maxi) {
            if (yourGuess === secret) {
                won = true;
                msgEl.textContent = yourGuess + " is correct.  ";
                if (numScore > highestScore) {
                    highestScore = numScore;
                    score.textContent = `Your score: ${numScore}. Highest score: ${highestScore}.`;
                }
            } else {
                const howWrong = (yourGuess > secret) ? " is too high.  " : " is too low.  ";
                msgEl.textContent = yourGuess + howWrong;
                numScore--;
                score.textContent = `Your score: ${numScore}. Highest score: ${highestScore}.`;
            }
        } else {
            msgEl.textContent = `Please guess between 1 and ${maxi}.  `;
        }
    } else {
        msgEl.textContent = "You have won. Click reset to start a new game.";
    }
}
myResetFunction = () => {
    secret = Math.trunc(Math.random() * maxi) + 1;
    numScore = maxi;
    guessEl.value = '';
    msgEl.textContent = "Enter you guess here";
    score.textContent = `Your score: ${numScore}. Highest score: ${highestScore}.`;
    won = false;
}
myResetFunction();
btnEl.addEventListener("click", myFunction);
reset.addEventListener("click", myResetFunction);
