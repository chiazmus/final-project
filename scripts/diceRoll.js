import { getDiceRoll } from "./api.mjs";    

const diceWidgit = document.getElementById('dice-widgit');
const diceInput = diceWidgit.querySelector('input');
const rollButton = diceWidgit.querySelector('.search-button');
const resultBox = diceWidgit.querySelector('.results');

const writeResult = (out) => {
    const result = document.createElement('h4');
    const details = document.createElement('p');
    result.textContent = out.result;
    details.textContent = out.details;
    resultBox.appendChild(result);
    resultBox.appendChild(details);
};

const clearResults = () => {
    resultBox.textContent = '';
    while(resultBox.children.length > 0){
        resultBox.removeChild(resultBox.lastChild);
    }
    return true;
};

const rollDice = async () => {
    clearResults();
    resultBox.classList.add('loading');
    const output = await getDiceRoll(diceInput.value);
    if (output) {
        resultBox.classList.remove('loading');
        writeResult(output);
    } else {
        resultBox.classList.remove('loading');
        console.log('No such dice configuration exists...');
    }
};

rollButton.addEventListener('click', rollDice);
diceInput.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        rollDice();
    }
});