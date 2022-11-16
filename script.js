console.log('start...');

const maxi = 50;
const youhavelost = "You have lost. Click reset to start a new game.";
const youhavewon = "You have won. Click reset to start a new game.";

maxScore = () => Math.trunc(maxi/2)+1;
calcSecret = () => Math.trunc(Math.random() * maxi) + 1;

let secret;
let yourGuess;
let numScore;
let highestScore = 0;
let won = false;
let lost = false;

const msgEl = document.querySelector('.message');
const guessEl = document.querySelector('.guess');
const btnEl = document.querySelector('.btn');
const score = document.querySelector('.score');
const highest = document.querySelector('.highest-score');
const reset = document.querySelector('.reset-btn');

updateScore = (num) => score.textContent = `Your score: ${num}.`;
updateHighestScore = (num) => highest.textContent = `Highest score: ${num}.`;

myFunction = () => {
    if (! won && ! lost) {
        yourGuess = Number(guessEl.value);
        // console.log(guessEl.value,yourGuess);
        if (yourGuess >= 1 && yourGuess <= maxi) {
            if (yourGuess === secret) {
                won = true;
                msgEl.textContent = `Congratulations!!! ${yourGuess} is correct. You have won.`;
                if (numScore > highestScore) {
                    highestScore = numScore;
                    updateHighestScore(highestScore); 
                }
            } else {
                const howWrong = (yourGuess > secret) ? " is too high.  " : " is too low.  ";
                numScore--;
                updateScore(numScore);
                if (numScore <= 0) {
                    lost = true;
                    msgEl.textContent = youhavelost;
                } else msgEl.textContent = yourGuess + howWrong + " Please try again.";
            }
        } else {
            msgEl.textContent = `Please guess between 1 and ${maxi}.  `;
        }
    } else if (won) {
        msgEl.textContent = youhavewon;
    } else { // must have lost
        msgEl.textContent = youhavelost;
    }
}
myResetFunction = () => {
    secret = calcSecret();
    numScore = maxScore();
    guessEl.value = '';
    msgEl.textContent = `Start playing by entering you guess between 1 and ${maxi}.`;
    score.textContent = `Your score: ${numScore}.`;
    highest.textContent = `Highest score: ${highestScore}.`;
    won = false;
    lost = false;
}
myResetFunction();
btnEl.addEventListener("click", myFunction);
reset.addEventListener("click", myResetFunction);
