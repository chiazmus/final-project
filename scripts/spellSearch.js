import { searchSpells } from "./api.mjs";     

const spellWidgit = document.getElementById('spell-widgit');
const spellSearchButton = spellWidgit.querySelector('.search-button');
const spellNameInput = spellWidgit.querySelector('input');
const spellResultBox = spellWidgit.querySelector('.results');

//Helper Functions
function formatName(text){
    return text.replace(/\s+/g, '-').toLowerCase();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Maybe I should use a template for this, but now its already made so I don't really want to. V

function addSpell(spell){
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const stats = document.createElement('ul');
    const range = document.createElement('li');
    const components = document.createElement('li');
    const castingTime = document.createElement('li');
    const duration = document.createElement('li');
    const concentration = document.createElement('li');
    title.textContent = spell.name;
    description.textContent = spell.desc;
    range.textContent = `Range: ${spell.range}`;
    components.textContent = `Components: ${spell.components.join(',')}`;
    castingTime.textContent = `Casting Time: ${spell.casting_time}`;
    duration.textContent = `Duration: ${spell.duration}`;
    concentration.textContent = `Concentration: ${spell.concentration}`;
    stats.appendChild(range);
    stats.appendChild(components);
    stats.appendChild(castingTime);
    stats.appendChild(duration);
    stats.appendChild(concentration);
    spellResultBox.appendChild(title);
    spellResultBox.appendChild(description);
    spellResultBox.appendChild(stats);
    return true;
}

function clearSpells(){
    spellResultBox.textContent = '';
    while(spellResultBox.children.length > 0){
        spellResultBox.removeChild(spellResultBox.lastChild);
    }
    return true;
}

async function spellSearch(){
    spellResultBox.classList.add('loading');
    clearSpells();
    const spellName = formatName(spellNameInput.value);
    const result = await searchSpells(spellName);
    const startTime = Date.now();  // This is to make sure the animation gets a chance to play

    if (result) {
        const timePassed = Date.now() - startTime;
        if (1000 - timePassed > 0) await sleep(1000);
        addSpell(result);
        spellResultBox.classList.remove('loading');
    } else {
        const timePassed = Date.now() - startTime;
        if (1000 - timePassed > 0) await sleep(1000);
        console.log('Spell not found.')
        spellResultBox.classList.remove('loading');
    }
}

// search button/enter clicked V

spellSearchButton.addEventListener('click', spellSearch);
spellNameInput.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        spellSearch();
    }
});