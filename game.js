


const player = {
    x: 400, // Initial X position
    y: 300, // Initial Y position
    speed: 5 // Movement speed
};

const gameContainerWidth = 800; // Width of the game container in pixels
const gameContainerHeight = 600; // Height of the game container in pixels
const playerWidth = 20; // Assuming the player's width is 20px
const playerHeight = 20; // Assuming the player's height is 20px



function setup() {
    // Game setup logic here
    document.addEventListener('keydown', movePlayer);
}
setup();

function movePlayer(event) {

    const step = 10; // Adjust step size as needed
    let newX = player.x;
    let newY = player.y;

    console.log(`Before moving: x=${newX}, y=${newY}`); // Debug log

    switch (event.key) {
        case 'ArrowUp': newY -= step; break;
        case 'ArrowDown': newY += step; break;
        case 'ArrowLeft': newX -= step; break;
        case 'ArrowRight': newX += step; break;
        default: return; // Exit if other keys are pressed
    }

    // Boundary check
    if (newX >= 0 && newX <= gameContainerWidth - playerWidth && newY >= 0 && newY <= gameContainerHeight - playerHeight) {
        player.x = newX;
        player.y = newY;
        updatePlayerPosition();
    
    

    updateWorld();
    }
    console.log(`After moving: x=${player.x}, y=${player.y}`); // Debug log
}

setup();

// Placeholder for a function to generate terrain based on player's position
// This function simulates what you would do with actual Perlin noise data
function generateTerrainAt(x, y) {
    // Simulate different terrains: 0 for water, 1 for land, 2 for mountains
    let terrainType = Math.floor(Math.abs(Math.sin(x * 0.01) + Math.cos(y * 0.01)) * 3) % 3;
    return terrainType;
}

let lastTerrain = null;

function updateWorld() {
    // Determine the terrain around the player based on their x and y
    

    switch (terrainAroundPlayer) {
        

        case 0:
            gameContainer.style.backgroundColor = '#4a80b4'; // Water
            break;
        case 1:
            gameContainer.style.backgroundColor = '#8c7a6b'; // Land
            break;
        case 2:
            gameContainer.style.backgroundColor = '#767676'; // Mountains
            break;
    }
    let terrainAroundPlayer = generateTerrainAt(player.x, player.y);
    if (terrainAroundPlayer !== lastTerrain) {
        lastTerrain = terrainAroundPlayer;
    
}

// Update movePlayer function to include world update
function movePlayer(event) {
    let terrainAroundPlayer = calculateTerrain(player.x, player.y); // Placeholder for actual logic to determine terrain
    
    updateWorld(terrainAroundPlayer);


    switch (event.key) {
        case 'ArrowUp': player.y -= player.speed; break;
        case 'ArrowDown': player.y += player.speed; break;
        case 'ArrowLeft': player.x -= player.speed; break;
        case 'ArrowRight': player.x += player.speed; break;
    }
    updateWorld(); // Update the world based on new player position
}

// Simple resource and crafting item definitions
let resources = {wood: 0, stone: 0};
let craftableItems = {
    'woodenSword': {wood: 5},
    'stoneAxe': {wood: 2, stone: 3}
};

function craftItem(itemName) {
    let recipe = craftableItems[itemName];
    let canCraft = true;
    for (let resource in recipe) {
        if (resources[resource] < recipe[resource]) {
            canCraft = false;
            break;
        }
    }
    if (canCraft) {
        for (let resource in recipe) {
            resources[resource] -= recipe[resource];
        }
        console.log(`${itemName} crafted!`);
    } else {
        console.log(`Not enough resources to craft ${itemName}.`);
    }
}

// Example crafting action
craftItem('woodenSword');


function generateQuest() {
    // Simple AI to generate quests based on resources
    if (resources.wood < 5) {
        console.log("Quest: Gather 5 units of wood.");
    } else if (resources.stone < 3) {
        console.log("Quest: Gather 3 units of stone.");
    } else {
        console.log("Quest: Explore and find a mountain.");
    }
}

// Simulate quest generation
generateQuest();

function generateTerrainFeature(x, y) {
    // Extend terrain generation with more features
    let featureType = Math.floor(Math.abs(Math.sin(x * 0.05) * Math.cos(y * 0.05)) * 5) % 5;
    return featureType;
}

// Update the world update logic to incorporate new features
function updateWorld() {
    let terrainAroundPlayer = generateTerrainAt(player.x, player.y);
    let featureAroundPlayer = generateTerrainFeature(player.x, player.y);
    
    let gameContainer = document.getElementById('gameContainer');
    // Update to handle different terrain features
    switch (featureAroundPlayer) {
        case 0: gameContainer.style.backgroundColor = '#4a80b4'; break; // Water
        case 1: gameContainer.style.backgroundColor = '#8c7a6b'; break; // Land
        case 2: gameContainer.style.backgroundColor = '#767676'; break; // Mountains
        case 3: gameContainer.style.backgroundColor = '#228b22'; break; // Forests
        case 4: gameContainer.style.backgroundColor = '#a0522d'; break; // Villages
    }
}


const enemies = [
    { id: 1, type: 'goblin', x: 300, y: 300, health: 10 }
    // Add more enemies as needed
];

function spawnNPCs() {
    // Spawn NPCs in the game world
    npcs.push({id: 1, type: 'villager', x: 100, y: 100});
    // Add more NPCs as needed
}

function spawnEnemies() {
    // Spawn enemies in the game world
    enemies.push({id: 1, type: 'bandit', x: 150, y: 150});
    // Add more enemies as needed
}

// Call these functions as part of the game setup or during gameplay
spawnNPCs();
spawnEnemies();

// Example interaction logic (to be expanded)
function interactWithNPC(npc) {
    console.log("Interacted with NPC:", npc.type);
}

// Placeholder for client-side socket logic
const socket = io(); // Assuming Socket.IO client is included

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('updateWorld', (worldState) => {
    // Update local world state based on server broadcast
});

function sendPlayerUpdate() {
    // Send player's position or actions to the server
    socket.emit('playerUpdate', {x: player.x, y: player.y});
}

// Call sendPlayerUpdate() whenever the player moves or performs an action




function generateQuestBasedOnEnvironment() {
    // Example: If the player is near a forest, generate a wood gathering quest
    if (featureAroundPlayer === 3) { // Assuming 3 represents forests
        quests.push({id: quests.length + 1, type: 'Gather', objective: 'Collect 10 wood', reward: '20 gold'});
    }
    // More conditions based on player's environment and state
}

function checkQuestCompletion() {
    quests.forEach(quest => {
        if (!quest.completed && inventory[quest.required.resource] >= quest.required.amount) {
            console.log(`Quest "${quest.title}" completed!`);
            inventory[quest.reward.resource] += quest.reward.amount;
            quest.completed = true;
        }
    });
}

}

function playerAttack(target) {
    if (target.type === 'bandit') {
        // Simple attack logic
        let damage = Math.floor(Math.random() * 10); // Random damage between 0 to 10
        target.health -= damage;
        console.log(`Attacked ${target.type}, dealt ${damage} damage.`);
        
        if (target.health <= 0) {
            console.log(`${target.type} defeated.`);
            // Remove enemy from the game or spawn loot
        }
    }
}

function playerDefend() {
    // Simple defense logic
    player.defense = true; // Player is defending on this turn
    console.log("Player is defending against the next attack.");
}

socket.on('playerJoined', (newPlayer) => {
    console.log(`${newPlayer.name} has joined the game.`);
    // Update game state to include the new player
});

socket.on('playerMoved', (playerUpdate) => {
    console.log(`${playerUpdate.name} moved to ${playerUpdate.x}, ${playerUpdate.y}`);
    // Update the player's position in the game world
});

function sendPlayerAction(action) {
    // Send player's actions to the server for broadcasting
    socket.emit('playerAction', action);
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    // Update player's position and world visuals
}

gameLoop(); // Start the game loop



const resources = [
    { id: 1, type: 'wood', x: 100, y: 100, amount: 5 },
    { id: 2, type: 'stone', x: 200, y: 150, amount: 3 }
    // Add more resources as needed
];


function collectResource(playerX, playerY) {
    resources.forEach((resource, index) => {
        // Simple distance check to simulate collection
        if (Math.abs(playerX - resource.x) < 10 && Math.abs(playerY - resource.y) < 10) {
            console.log(`Collected ${resource.amount} of ${resource.type}`);
            // Update player inventory (to be implemented)
            // Remove resource from the world
            resources.splice(index, 1);
        }
    });
}


let inventory = {
    wood: 0,
    stone: 0
    // Add other resources as needed
};


// Inside collectResource, update inventory
console.log(`Collected ${resource.amount} of ${resource.type}`);
inventory[resource.type] += resource.amount;

function engageEnemy(playerX, playerY) {
    enemies.forEach((enemy, index) => {
        // Simple engagement logic based on proximity
        if (Math.abs(playerX - enemy.x) < 20 && Math.abs(playerY - enemy.y) < 20) {
            // Implement combat logic
            console.log(`Engaged with ${enemy.type}`);
            // Example: Reduce enemy health
            enemy.health -= 5;
            if (enemy.health <= 0) {
                console.log(`${enemy.type} defeated`);
                enemies.splice(index, 1); // Remove defeated enemy
            }
        }
    });
}

// Extend the existing resources structure
resources.push({ id: 3, type: 'iron', x: 400, y: 250, amount: 2 });

const craftingRecipes = {
    sword: { wood: 2, iron: 5 },
    potion: { herbs: 3, water: 1 }
};


function regenerateResources() {
    // Simple regeneration logic
    if (resources.length < 10) { // Example limit
        // Add new resources to the game world
        resources.push({ id: getNextResourceId(), type: 'wood', x: getRandomX(), y: getRandomY(), amount: 5 });
    }
}


function evolveEnemies() {
    if (player.level > 5) { // Example player progression metric
        // Spawn stronger enemies or increase spawn rate
        enemies.push({ id: getNextEnemyId(), type: 'troll', x: getRandomX(), y: getRandomY(), health: 20 });
    }
}




// Placeholder for multiplayer setup
function setupMultiplayer() {
    // Establish connection to multiplayer server
    // Listen for events such as other players joining, moving, or interacting
    // Handle sending player actions to the server and receiving updates
}


// Example of a collaborative quest structure
const collaborativeQuests = [
    { id: 1, title: "Build a Castle", description: "Gather resources and build a castle together", required: { wood: 100, stone: 100 }, completed: false }
];


// Example of a story-driven quest
const storyQuests = [
    { id: 1, title: "The Lost Kingdom", description: "Discover the history of the lost kingdom and uncover its secrets", completed: false }
];


// Example of a dynamic world event
function triggerWorldEvent() {
    // Trigger an event that aligns with the storyline, such as a festival or an invasion
    console.log("A mysterious portal has appeared in the forest...");
}

function updateEcosystem() {
    // Logic for updating the game world based on player interactions
    // Example: If too many trees are cut down, fewer animals appear
}


function changeWeather() {
    // Rotate through different weather patterns that affect the game
    // Example: Rain increases crop yields but makes certain areas difficult to navigate
}


const playerSkills = {
    combat: 0,
    crafting: 0,
    magic: 0
    // Define progression logic and skills
};


function craftGear(item) {
    // Crafting logic for gear that affects player stats and abilities
    // Example: A sword that grants fire damage
}

function createGuild(guildName) {
    // Logic for players to create or join guilds
    // Guild-specific quests and activities
}



function enterArena(player) {
    // PvP combat mechanics and tracking of wins and losses
    // Update leaderboards based on outcomes
}

function generateNewTerrains() {
    // Use Perlin noise or similar algorithms to create diverse landscapes
}

function loadWorldSegment(playerPosition) {
    // Load and unload world segments based on the player's location to optimize performance
}

function updateNPCBehavior(npc) {
    // Logic for NPCs to adapt their behavior to the world state and player actions
}


function simulateNPCRoutine(npc) {
    // NPCs follow daily routines, enhancing world immersion
}


function chooseStoryPath(choice) {
    // Adjust game world and future quests based on player choices
}


function updateGameLore(event) {
    // Record significant player and community events in the game's lore
}


function registerItemOnBlockchain(item) {
    // Securely register game items as digital assets on the blockchain
}


function hostInGameEvent() {
    // Schedule and manage in-game events with special rewards
}


function enableCommunityContentCreation() {
    // Provide tools and systems for players to create and submit their content
}


function updateWorldStateBasedOnPlayerActions() {
    // Logic to dynamically update the game world based on collective player actions
}


function simulateWeatherChanges() {
    // Create a weather system with impacts on gameplay and strategies
}



// Function to award players, updating their inventory or stats
function awardPlayer(playerId, reward) {
    // Example: Increase player's gold or give items
    let player = findPlayerById(playerId); // Implement player lookup
    player.inventory[reward.type] += reward.amount;
    console.log(`${player.name} awarded ${reward.amount} of ${reward.type}`);
}


let communityQuests = []; // Store community-submitted quests

function submitQuest(quest) {
    // Placeholder for quest submission logic
    // In a real scenario, this would include validation and review processes
    communityQuests.push(quest);
    console.log(`Quest "${quest.title}" submitted by ${quest.creator}`);
}

function approveQuest(questId) {
    // Find and mark a quest as approved, making it available in-game
    let quest = communityQuests.find(q => q.id === questId);
    if (quest) {
        quest.approved = true;
        // Implement logic to integrate quest into the game world
        console.log(`Quest "${quest.title}" approved and added to the game.`);
    }
}

function checkWorldStateUpdates() {
    // Example: Check if players have collectively gathered enough resources to rebuild a bridge
    const totalWood = getTotalResourceCollectedByPlayers('wood');
    if (totalWood >= 1000) {
        unlockNewArea('The Ancient Forest');
        console.log('Players have rebuilt the bridge to The Ancient Forest!');
    }
}

function unlockNewArea(areaName) {
    // Logic to make a new area accessible to players
    // Could involve updating the game map, notifying players, etc.
}

function environmentalImpact(playerAction, location) {
    // Example: Player actions leading to environmental changes
    switch (playerAction) {
        case 'deforest':
            decreaseForestDensity(location);
            break;
        case 'build':
            modifyTerrainForConstruction(location);
            break;
        // Add more cases as needed
    }
}

function decreaseForestDensity(location) {
    // Logic to reduce forest density at a location, affecting resources and NPC habitats
    console.log(`Forest density decreased at ${location}.`);
}

function modifyTerrainForConstruction(location) {
    // Adjust terrain data to reflect new constructions, possibly affecting local wildlife and resource availability
    console.log(`Terrain modified for construction at ${location}.`);
}


class DynamicEvent {
    constructor(type, location, duration, rewards) {
        this.type = type;
        this.location = location;
        this.startTime = Date.now();
        this.duration = duration; // Duration in milliseconds
        this.rewards = rewards;
        this.participants = new Set();
    }

    isEventActive() {
        return (Date.now() - this.startTime) < this.duration;
    }

    addParticipant(playerId) {
        if (this.isEventActive()) {
            this.participants.add(playerId);
            console.log(`Player ${playerId} joined event: ${this.type}`);
        }
    }

    concludeEvent() {
        if (!this.isEventActive()) {
            this.participants.forEach(participant => {
                // Logic to distribute rewards
                console.log(`Participant ${participant} received rewards for ${this.type} event.`);
            });
        }
    }
}


class Guild {
    constructor(name) {
        this.name = name;
        this.members = new Set();
        this.projects = [];
    }

    addMember(playerId) {
        this.members.add(playerId);
        console.log(`Player ${playerId} has joined guild ${this.name}`);
    }

    launchProject(projectName, requiredResources, completionTime) {
        const project = { projectName, requiredResources, completionTime, startTime: Date.now() };
        this.projects.push(project);
        console.log(`Guild ${this.name} has started project: ${projectName}`);
    }

    completeProject(projectName) {
        const projectIndex = this.projects.findIndex(project => project.projectName === projectName);
        if (projectIndex !== -1) {
            const project = this.projects[projectIndex];
            // Additional logic to check if resources were gathered and time elapsed
            console.log(`Project ${projectName} completed by guild ${this.name}`);
            this.projects.splice(projectIndex, 1);
        }
    }
}



function updateEnvironment() {
    Object.keys(environmentalChanges).forEach(change => {
        applyEnvironmentalChange(change);
    });
}

function applyEnvironmentalChange(changeType) {
    switch (changeType) {
        case 'forestRegrowth':
            // Assuming a function that gradually increases forest density in areas previously deforested by players
            increaseForestDensity();
            break;
        case 'construction':
            // Assuming a function that updates the map to reflect player-built structures, affecting NPC pathfinding and local resources
            updateMapWithConstructions();
            break;
    }
}

function increaseForestDensity() {
    // Specific logic to increase forest density, affecting resource availability
    console.log("Forest density is increasing in previously deforested areas.");
}

function updateMapWithConstructions() {
    // Logic to incorporate player constructions into the game world
    console.log("New player constructions have been added to the map.");
}

class EventManager {
    constructor() {
        this.events = [];
    }

    createEvent(eventDetails) {
        const newEvent = new GameEvent(eventDetails);
        this.events.push(newEvent);
        console.log(`New event created: ${newEvent.title}`);
    }

    checkEvents() {
        this.events.forEach(event => {
            if (event.isEventActive()) {
                event.updateParticipants();
            } else {
                event.distributeRewards();
            }
        });
    }
}

class GameEvent {
    constructor({ title, startTime, duration, rewards }) {
        this.title = title;
        this.startTime = new Date(startTime).getTime();
        this.duration = duration;
        this.endTime = this.startTime + this.duration;
        this.rewards = rewards;
        this.participants = new Set();
    }

    isEventActive() {
        const currentTime = Date.now();
        return currentTime >= this.startTime && currentTime <= this.endTime;
    }

    addParticipant(playerId) {
        if (this.isEventActive()) {
            this.participants.add(playerId);
        }
    }

    updateParticipants() {
        // Logic to manage participant actions during the event
    }

    distributeRewards() {
        this.participants.forEach(playerId => distributeRewardToPlayer(playerId, this.rewards));
    }
}

function distributeRewardToPlayer(playerId, rewards) {
    // Assuming a function to find player by ID and update their inventory or stats
    console.log(`Distributed ${rewards} to player ${playerId}`);
}

class CraftingSystem {
    constructor() {
        this.recipes = new Map();
    }

    registerRecipe(recipeName, ingredients, output) {
        this.recipes.set(recipeName, { ingredients, output });
    }

    canCraft(recipeName, playerInventory) {
        const recipe = this.recipes.get(recipeName);
        if (!recipe) return false;

        return recipe.ingredients.every(ingredient =>
            playerInventory[ingredient.type] >= ingredient.amount
        );
    }

    craftItem(recipeName, playerInventory) {
        if (this.canCraft(recipeName, playerInventory)) {
            const recipe = this.recipes.get(recipeName);
            recipe.ingredients.forEach(ingredient => {
                playerInventory[ingredient.type] -= ingredient.amount;
            });
            playerInventory[recipe.output.type] = (playerInventory[recipe.output.type] || 0) + recipe.output.amount;
            console.log(`Crafted ${recipe.output.type}`);
        } else {
            console.log("Cannot craft item, missing ingredients.");
        }
    }
}

// Example usage
const craftingSystem = new CraftingSystem();
craftingSystem.registerRecipe('Iron Sword', [{ type: 'iron', amount: 10 }, { type: 'wood', amount: 2 }], { type: 'Iron Sword', amount: 1 });

class ReputationSystem {
    constructor() {
        this.reputations = new Map();
    }

    adjustReputation(playerId, faction, amount) {
        if (!this.reputations.has(playerId)) {
            this.reputations.set(playerId, new Map());
        }

        const playerReputations = this.reputations.get(playerId);
        playerReputations.set(faction, (playerReputations.get(faction) || 0) + amount);
    }

    getReputation(playerId, faction) {
        if (this.reputations.has(playerId)) {
            const playerReputations = this.reputations.get(playerId);
            return playerReputations.get(faction) || 0;
        }
        return 0;
    }
}

// Example usage
const reputationSystem = new ReputationSystem();
reputationSystem.adjustReputation('player1', 'Forest Guild', 10);


class ExplorationSystem {
    constructor() {
        this.discoveredLocations = new Set();
    }

    discoverLocation(playerId, locationId) {
        const key = `${playerId}-${locationId}`;
        if (!this.discoveredLocations.has(key)) {
            this.discoveredLocations.add(key);
            this.rewardDiscovery(playerId, locationId);
            console.log(`Player ${playerId} discovered ${locationId}`);
        }
    }

    rewardDiscovery(playerId, locationId) {
        // Logic to reward players based on the significance of the discovery
        // Rewards could include experience points, items, or unlocking new quests
    }
}

// Example usage
const explorationSystem = new ExplorationSystem();
explorationSystem.discoverLocation('player1', 'Ancient Ruins');


class MarketSystem {
    constructor() {
        this.listings = []; // Array of {itemId, price, quantity, sellerId}
    }

    list(item) {
        this.listings.push(item);
        console.log(`${item.quantity}x ${item.itemId} listed for ${item.price} each by ${item.sellerId}.`);
    }

    buy(buyerId, listingIndex, quantity) {
        if (listingIndex < 0 || listingIndex >= this.listings.length) {
            console.log("Listing does not exist.");
            return;
        }

        const listing = this.listings[listingIndex];
        if (quantity > listing.quantity) {
            console.log("Not enough quantity available.");
            return;
        }

        // Simplified transaction logic
        listing.quantity -= quantity;
        console.log(`${buyerId} bought ${quantity}x ${listing.itemId} for ${listing.price} each.`);
        
        if (listing.quantity === 0) {
            this.listings.splice(listingIndex, 1); // Remove listing if quantity is depleted
        }
    }

    // Additional methods for managing listings, adjusting prices, etc.
}


class SkillProgression {
    constructor() {
        this.skills = new Map(); // Map of skillName to level
    }

    improveSkill(skillName, amount) {
        this.skills.set(skillName, (this.skills.get(skillName) || 0) + amount);
        console.log(`Improved ${skillName} by ${amount}.`);
    }

    getSkillLevel(skillName) {
        return this.skills.get(skillName) || 0;
    }

    unlockAbility(skillName) {
        const level = this.getSkillLevel(skillName);
        if (level >= certainThreshold) { // Define thresholds per skill
            // Logic to unlock new abilities, recipes, or skills
            console.log(`Unlocked new abilities for ${skillName} at level ${level}.`);
        }
    }
}


class Storytelling {
    constructor() {
        this.stories = new Map(); // key: locationId, value: story details
    }

    discoverStory(playerId, locationId) {
        if (this.stories.has(locationId)) {
            const story = this.stories.get(locationId);
            console.log(`Player ${playerId} discovered: ${story}`);
            // Potential integration with player's journal or quest log
        } else {
            console.log("Nothing unusual found.");
        }
    }

    addStory(locationId, storyDetails) {
        this.stories.set(locationId, storyDetails);
    }
}


function setupEventListeners() {
    document.addEventListener('keydown', (event) => {
        console.log(`Key pressed: ${event.key}`); // Verify this logs when pressing arrow keys
        movePlayer(event);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    setupEventListeners();
});


window.onload = function() {
    setupEventListeners();
    // Any other initialization logic
};

function updatePlayerPosition() {
    const playerElement = document.getElementById('player');
    playerElement.style.left = `${player.x}px`;
    playerElement.style.top = `${player.y}px`;
}

class WeatherSystem {
    constructor() {
        this.currentWeather = "Sunny";
        this.weatherProbabilities = {
            "Sunny": 50,
            "Rainy": 30,
            "Stormy": 15,
            "Foggy": 5
        };
    }

    updateWeather() {
        const weatherRoll = Math.random() * 100;
        let cumulative = 0;
        for (const [weather, probability] of Object.entries(this.weatherProbabilities)) {
            cumulative += probability;
            if (weatherRoll <= cumulative) {
                this.currentWeather = weather;
                break;
            }
        }
        console.log(`The weather has changed to ${this.currentWeather}.`);
        // Additional effects on the game world based on the weather
    }
}

class AchievementSystem {
    constructor() {
        this.achievements = [];
        this.unlockedAchievements = new Set();
    }

    addAchievement(achievement) {
        this.achievements.push(achievement);
    }

    checkAchievements(player) {
        this.achievements.forEach(achievement => {
            if (!this.unlockedAchievements.has(achievement.id) && achievement.condition(player)) {
                console.log(`Achievement unlocked: ${achievement.name}`);
                this.unlockedAchievements.add(achievement.id);
                // Apply any rewards or effects related to unlocking the achievement
            }
        });
    }
}


class WorldEventSystem {
    constructor() {
        this.activeEvents = [];
    }

    triggerEvent(event) {
        this.activeEvents.push(event);
        console.log(`World event triggered: ${event.name}`);
        // Implement logic to apply the event's effects on the world or players
    }

    concludeEvent(eventName) {
        const eventIndex = this.activeEvents.findIndex(event => event.name === eventName);
        if (eventIndex !== -1) {
            // Implement logic to conclude the event and revert its effects, if necessary
            console.log(`World event concluded: ${eventName}`);
            this.activeEvents.splice(eventIndex, 1);
        }
    }
}

class NPC {
    constructor(name) {
        this.name = name;
        this.relationshipLevels = {}; // Tracks player ID against relationship level
    }

    interact(playerId) {
        if (this.relationshipLevels[playerId]) {
            this.relationshipLevels[playerId]++;
        } else {
            this.relationshipLevels[playerId] = 1; // Initialize relationship level
        }
        console.log(`${playerId} has interacted with ${this.name}. Relationship level is now ${this.relationshipLevels[playerId]}.`);
    }

    offerQuest(playerId) {
        if (this.relationshipLevels[playerId] >= 5) { // Assuming level 5 is required for a quest
            console.log(`${this.name} has a quest for ${playerId}.`);
            // Implement quest offering logic here
        }
    }
}

class GameResource {
    constructor(name, quantity, regenerationRate) {
        this.name = name;
        this.quantity = quantity;
        this.regenerationRate = regenerationRate; // How much resource regenerates per time unit
    }

    consume(amount) {
        if (this.quantity >= amount) {
            this.quantity -= amount;
            console.log(`${amount} ${this.name} consumed, ${this.quantity} left.`);
            return true;
        } else {
            console.log(`Not enough ${this.name} available.`);
            return false;
        }
    }

    regenerate() {
        this.quantity += this.regenerationRate;
        console.log(`${this.name} regenerated, now ${this.quantity}.`);
    }
}


class Territory {
    constructor(name) {
        this.name = name;
        this.controllingParty = null; // Could be a player ID or a guild ID
    }

    attemptToControl(partyId) {
        if (this.controllingParty === null) {
            this.controllingParty = partyId;
            console.log(`${partyId} now controls ${this.name}.`);
            // Implement effects of control here (e.g., resource bonuses)
        } else if (this.controllingParty !== partyId) {
            console.log(`${this.name} is already controlled by another party.`);
            // Potential conflict resolution or battle for control
        }
    }

    relinquishControl() {
        console.log(`${this.controllingParty} has lost control of ${this.name}.`);
        this.controllingParty = null;
        // Reset territory benefits
    }
}


class Player {
    constructor() {
        this.level = 1;
        this.experience = 0;
        this.experienceToNextLevel = 100; // Initial XP required to reach level 2
    }

    gainExperience(amount) {
        this.experience += amount;
        console.log(`Gained ${amount} XP.`);
        this.checkLevelUp();
    }

    checkLevelUp() {
        while (this.experience >= this.experienceToNextLevel) {
            this.experience -= this.experienceToNextLevel;
            this.level++;
            this.experienceToNextLevel *= 1.2; // Increase the XP requirement for the next level
            console.log(`Leveled up to ${this.level}!`);
            // Optionally, improve player attributes or grant skill points here
        }
    }
}


class CombatSystem {
    constructor() {
        this.damageTypes = ['physical', 'fire', 'ice'];
    }

    calculateDamage(attacker, defender, damageType, baseDamage) {
        let damageMultiplier = 1;

        // Example: Checking for elemental weaknesses or resistances
        if (defender.weaknesses.includes(damageType)) {
            damageMultiplier = 1.5;
        } else if (defender.resistances.includes(damageType)) {
            damageMultiplier = 0.5;
        }

        const totalDamage = baseDamage * damageMultiplier;
        defender.health -= totalDamage;
        console.log(`${attacker.name} deals ${totalDamage} ${damageType} damage to ${defender.name}.`);

        if (defender.health <= 0) {
            console.log(`${defender.name} defeated.`);
            attacker.gainExperience(defender.xpValue); // Assuming the defender grants XP
        }
    }
}


class EconomySystem {
    constructor() {
        this.marketListings = []; // Array of { item, price, seller }
    }

    listForSale(item, price, sellerId) {
        this.marketListings.push({ item, price, sellerId });
        console.log(`${item.name} listed for sale by ${sellerId} at ${price} gold.`);
    }

    purchaseItem(buyerId, listingIndex) {
        const listing = this.marketListings[listingIndex];
        if (listing) {
            // Assuming a method to deduct gold and add the item to the buyer's inventory
            console.log(`${buyerId} purchased ${listing.item.name} for ${listing.price} gold.`);
            this.marketListings.splice(listingIndex, 1); // Remove the listing
        } else {
            console.log("Item not found.");
        }
    }
}

class Quest {
    constructor(title, description, checkCompletion) {
        this.title = title;
        this.description = description;
        this.isCompleted = false;
        this.checkCompletion = checkCompletion; // Function to check quest completion
    }

    attemptToComplete(player) {
        this.isCompleted = this.checkCompletion(player);
        if (this.isCompleted) {
            console.log(`Quest completed: ${this.title}`);
            // Reward the player
            this.rewardPlayer(player);
        }
    }

    rewardPlayer(player) {
        // Implementation depends on quest specifics, such as increasing player stats, giving items, etc.
        player.experience += 100; // Example reward
        console.log(`Player rewarded for completing: ${this.title}`);
    }
}

// Dynamic objective example: A quest that requires a changing number of items based on world state
const dynamicQuest = new Quest(
    "Gather Resources",
    "Gather the necessary resources to help rebuild the town.",
    player => player.inventory['wood'] >= dynamicWoodRequirement // dynamicWoodRequirement is a variable that changes based on world events
);


class Trade {
    constructor(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.playerOneItems = [];
        this.playerTwoItems = [];
    }

    addItemToTrade(player, item) {
        if (player === this.playerOne) {
            this.playerOneItems.push(item);
        } else if (player === this.playerTwo) {
            this.playerTwoItems.push(item);
        }
    }

    completeTrade() {
        // Transfer items between players
        this.playerOneItems.forEach(item => {
            this.playerOne.inventory.removeItem(item);
            this.playerTwo.inventory.addItem(item);
        });
        this.playerTwoItems.forEach(item => {
            this.playerTwo.inventory.removeItem(item);
            this.playerOne.inventory.addItem(item);
        });
        console.log("Trade completed between " + this.playerOne.name + " and " + this.playerTwo.name);
    }
}


class EndgameContent {
    constructor(name, description, checkEligibility) {
        this.name = name;
        this.description = description;
        this.checkEligibility = checkEligibility; // Function to check if player(s) can attempt this content
    }

    attemptContent(player) {
        if (this.checkEligibility(player)) {
            console.log(`Player attempting endgame content: ${this.name}`);
            // Implement the challenge, battle, or puzzle logic here
            this.completeChallenge(player);
        } else {
            console.log(`Player not eligible for: ${this.name}`);
        }
    }

    completeChallenge(player) {
        // Reward player upon successful completion
        console.log(`Player completed endgame content: ${this.name}`);
        // Example: grant unique items or unlockables
    }
}

// Example endgame content that requires a high level or specific items
const worldBoss = new EndgameContent(
    "World Boss",
    "Defeat the ancient world boss to obtain legendary rewards.",
    player => player.level >= 50 && player.inventory.hasItem("Legendary Sword")
);













