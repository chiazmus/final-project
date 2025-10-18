const encounterTracker = document.getElementById('encounter-tracker-widgit');

const savedEncounter = localStorage.getItem('savedEncounter');
if (savedEncounter) encounterTracker.innerHTML = savedEncounter;

const addMonsterButton = document.getElementById('add-monster');
const newEncounterButton = document.getElementById('new-encounter');
const saveEncounterButton = document.getElementById('save-encounter');
const dialog = document.getElementById('monster-dialog');
const modifyDialog = document.getElementById('monster-add-sub');
const closeModifyDialog = document.getElementById('health-submit');
const finalizeMonsterSelection = document.getElementById('finalize');

let currentMonsterModified;
let modification;

const addMonster = (monster) => {
    if (monster){
        const resultbox = encounterTracker.querySelector('.results');
        const monsterDiv = encounterTracker.querySelector('template').content.cloneNode(true);
        const monsterStat = monsterDiv.querySelector('.monster-stat')
        const title = monsterStat.querySelector('h3');
        const health = monsterStat.querySelector('p');

        title.textContent = monster.name;
        health.textContent = monster.health;

        const addButton = monsterStat.querySelector('.add-health');
        const subButton = monsterStat.querySelector('.subtract-health');

        addButton.addEventListener('click', () => {
            modification = 'add';
            currentMonsterModified = monsterStat;
            modifyDialog.classList.add('open');
            modifyDialog.showModal();
        });

        subButton.addEventListener('click', () => {
            modification = 'sub';
            currentMonsterModified = monsterStat;
            modifyDialog.classList.add('open');
            modifyDialog.showModal();
        });

        resultbox.appendChild(monsterDiv);
    };
};

const clearResultBox = () => {
    const resultBox = encounterTracker.querySelector('.results');
    const template = resultBox.querySelector('template');
    while(resultBox.children.length > 0){
        if (resultBox.lastChild != template)
            resultBox.removeChild(resultBox.lastChild);
        else
            break;
    }
    return true;
};

closeModifyDialog.addEventListener('click', () => {
    const resultbox = encounterTracker.querySelector('.results');
    const modAmount = modifyDialog.querySelector('#health-mod');
    if (!currentMonsterModified) return;
    const health = currentMonsterModified.querySelector('p')
    if (currentMonsterModified && modification && modAmount.value){
        if (modification == 'add'){
            health.textContent = parseInt(health.textContent) + parseInt(modAmount.value);
        } else {
            health.textContent = parseInt(health.textContent) - parseInt(modAmount.value);
        }
    }
    if (parseInt(health.textContent) <= 0) resultbox.removeChild(currentMonsterModified);
    currentMonsterModified = null
    modification = null
    modifyDialog.classList.remove('open');
    modifyDialog.close();
});

addMonsterButton.addEventListener('click', () => {
    dialog.classList.add('open');
    dialog.showModal();
});

newEncounterButton.addEventListener('click', clearResultBox);

saveEncounterButton.addEventListener('click', () => {
    localStorage.setItem('savedEncounter', encounterTracker.innerHTML);
    encounterTracker.classList.add('saved');
    setTimeout(() => {
        encounterTracker.classList.remove('saved');
    }, 2000);
});

finalizeMonsterSelection.addEventListener('click', () => {
    const monsterWidgit = dialog.querySelector('.widgit');
    const resultBox = monsterWidgit.querySelector('.results');
    let monster;
    if (resultBox.children.length > 1) {
        monster = {
            'name': resultBox.querySelector('.name').textContent,
            'health': resultBox.querySelector('.hp').textContent.split(' ')[0],
            'armorClass': resultBox.querySelector('.ac').textContent,
            'speed': resultBox.querySelector('.speed').textContent
        };
    }
    addMonster(monster);
    dialog.classList.remove('open');
    dialog.close();
});