async function fetchData(){
    try {
        const response = await fetch(`json/monster-biomes.json`);
        if (response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch monster data.');
        }
    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

function generateEncounter(data, cr, biome){
    // Lets do a 1d6 encounte
    const listOfMonsters = data.filter(monster => monster.cr == cr && monster.biomes.includes(biome)).sort(() => Math.random() - 0.5).slice(0,6);
    return listOfMonsters;
}

export {fetchData, generateEncounter};