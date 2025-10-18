import {fetchData, generateEncounter} from './randomEncounter.mjs'

const randomWidgit = document.getElementById('random-encounter-widgit')
const encounterTrackerWidgit = document.getElementById('encounter-tracker-widgit')
const randomCreateButton = randomWidgit.querySelector('button');

const monsterData = await fetchData();

const clearEncounterBox = () => {
    const resultBox = randomWidgit.querySelector('.results');
    while (resultBox.children.length > 1) resultBox.removeChild(resultBox.lastChild);
};

randomCreateButton.addEventListener('click', () => {
    const challengeRating = randomWidgit.querySelector('#level-select').value;
    const biome = randomWidgit.querySelector('#biome-select').value;
    const randomResult = randomWidgit.querySelector('.results');
    const encounterData = generateEncounter(monsterData, challengeRating, biome);
    const template = document.getElementById('monsterCard');
    clearEncounterBox();
    const title = document.createElement('h3')
    title.textContent = `Monsters of CR ${challengeRating} in the ${biome} biome:`;
    randomResult.appendChild(title);
    encounterData.forEach(element => {
        let clone = template.content.cloneNode(true);
        clone.querySelector('h4').textContent = element.name;
        clone.querySelector('p').textContent = `XP: ${element.xp}`;
        randomResult.appendChild(clone);
    });
});