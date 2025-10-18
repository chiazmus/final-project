import { searchMonster } from "./api.mjs";     

const monsterWidgit = document.getElementById('monster-widgit');
const spellWidgit = document.getElementById('spell-widgit');
const monsterSearchButton = monsterWidgit.querySelector('.search-button');
const monsterNameInput = monsterWidgit.querySelector('input');
const monsterResultBox = monsterWidgit.querySelector('.results');

//Helper Functions
function formatName(text){
    return text.replace(/\s+/g, '-').toLowerCase();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function addMonster(monster){
    const template = document.getElementById('monster-card-template');
    const clone = template.content.cloneNode(true);
    const set_atr = (atr_name, value) => {
        clone.querySelector(`[data-placeholder="${atr_name}"]`).textContent = value;
    };
    set_atr('name', monster.name);
    set_atr('type', monster.type);
    set_atr('size', monster.size);
    set_atr('alignment', monster.alignment);
    set_atr('armorClass', `${monster.armor_class[0].value} (${monster.armor_class[0].type})`);
    set_atr('hp', `${monster.hit_points} (${monster.hit_dice})`);
    set_atr('speed', `Walk: ${monster.speed.walk}, Fly: ${monster.speed.fly}, Swim: ${monster.speed.swim}`);
    set_atr('str', `${monster.strength} (${Math.floor(monster.strength/2)-5})`);
    set_atr('dex', `${monster.dexterity} (${Math.floor(monster.dexterity/2)-5})`);
    set_atr('con', `${monster.constitution} (${Math.floor(monster.constitution/2)-5})`);
    set_atr('int', `${monster.intelligence} (${Math.floor(monster.intelligence/2)-5})`);
    set_atr('wis', `${monster.wisdom} (${Math.floor(monster.wisdom/2)-5})`);
    set_atr('cha', `${monster.charisma} (${Math.floor(monster.charisma/2)-5})`);
    set_atr('languages',monster.languages);
    set_atr('challenge', `${monster.challenge_rating} (${monster.xp}xp)`);
    for (const action of monster.actions) {
        const title = document.createElement('h4');
        const desc = document.createElement('p');
        const bonus = document.createElement('p');
        title.textContent = action.name;
        desc.textContent = action.desc;
        bonus.textContent = `Attack Bonus: ${action.attack_bonus}`;
        clone.querySelector('#actions').appendChild(title);
        clone.querySelector('#actions').appendChild(desc);
        clone.querySelector('#actions').appendChild(bonus);
    }
    monsterResultBox.appendChild(clone);
    return true;
}

function clearMonsters(){
    const template = monsterResultBox.querySelector('template');
    while(monsterResultBox.children.length > 0){
        if (monsterResultBox.lastChild != template)
            monsterResultBox.removeChild(monsterResultBox.lastChild);
        else
            break;
    }
    return true;
}

async function monsterSearch(){
    monsterResultBox.classList.add('loading');
    clearMonsters();
    const monsterName = formatName(monsterNameInput.value);
    const result = await searchMonster(monsterName);
    const startTime = Date.now();  // This is to make sure the animation gets a chance to play

    if (result) {
        const timePassed = Date.now() - startTime;
        if (1000 - timePassed > 0) await sleep(1000);
        addMonster(result);
        monsterResultBox.classList.remove('loading');
    } else {
        const timePassed = Date.now() - startTime;
        if (1000 - timePassed > 0) await sleep(1000);
        console.log('Monster not found.');
        monsterResultBox.classList.remove('loading');
    }
}

// search button/enter clicked V

monsterSearchButton.addEventListener('click', monsterSearch);
monsterNameInput.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        monsterSearch();
    }
});