console.log('start...');

const maxi = 20;
const youhavelost = "คุณแพ้แล้ว กดปุ่ม Reset เพื่อเริ่มเกมใหม่";
const youhavewon = "คุณชนะแล้ว กดปุ่ม Reset เพื่อเริ่มเกมใหม่";

maxScore = () => {
    let i = 0;
    while (2**i<maxi) i++;
    return i;
}
//maxScore = () => Math.trunc(maxi/2)+1;
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

updateScore = (num) => score.textContent = `${num}.`;
updateHighestScore = (num) => highest.textContent = `${num}.`;

msgClass = (msgType) => {
    switch (msgType) {
        case 'normal':
            msgEl.classList.remove('alert');
            msgEl.classList.remove('inform');
            break;
        case 'inform':
            msgEl.classList.remove('alert');
            msgEl.classList.add('inform');
            break;
        case 'alert':
            msgEl.classList.add('alert');
            msgEl.classList.remove('inform');
            break;
    }
};

myFunction = () => {
    if (! won && ! lost) {
        yourGuess = Number(guessEl.value);
        if (yourGuess >= 1 && yourGuess <= maxi) {
            if (yourGuess === secret) {
                won = true;
                msgEl.textContent = `ยินดีด้วย!!! ${yourGuess} เป็นคำตอบที่ถูกต้อง คุณชนะแล้ว`;
                msgClass('inform');
                if (numScore > highestScore) {
                    highestScore = numScore;
                    updateHighestScore(highestScore); 
                }
            } else {
                const howWrong = (yourGuess > secret) ? " มากเกินไป  " : " น้อยเกินไป  ";
                numScore--;
                updateScore(numScore);
                if (numScore <= 0) {
                    lost = true;
                    msgEl.textContent = youhavelost;
                    msgClass('inform');
                } else {
                    msgEl.textContent = yourGuess + howWrong + " ลองทายใหม่";
                    msgClass('normal');
                }
            }
        } else {
            msgEl.textContent = `กรุณาทายตัวเลขระหว่าง 1 และ ${maxi}.  `;
            msgClass('alert');
        }
    } else if (won) {
        msgEl.textContent = youhavewon;
        msgClass('alert');
    } else { // must have lost
        msgEl.textContent = youhavelost;
        msgClass('alert');
    }
}

myResetFunction = () => {
    secret = calcSecret();
    numScore = maxScore();
    guessEl.value = '';
    msgEl.textContent = `เริ่มเล่นโดยทายตัวเลขระหว่าง 1 และ ${maxi}.`;
    msgClass('inform');
    score.textContent = `${numScore}`;
    highest.textContent = `${highestScore}`;
    won = false;
    lost = false;
}
myResetFunction();
btnEl.addEventListener("click", myFunction);
reset.addEventListener("click", myResetFunction);
