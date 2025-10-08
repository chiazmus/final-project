// This is the module that basically lets me use the apis.

async function searchMonster(monsterName){
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterName}`);
        if (response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch monster data.  Check that the name is correct.');
        }
    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

async function searchSpells(spellName){
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellName}`);
        if (response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch spell data.  Check that the name is correct.');
        }
    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

async function getDiceRoll(dice){
    try {
        const response = await fetch(`https://rolz.org/api/?${dice}.json`);
        if (response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch dice data.  Check that the name is correct.');
        }
    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

export {searchMonster, searchSpells, getDiceRoll};