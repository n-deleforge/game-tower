// =================================================
// =================================================
// ============ CALL SERVICE WORKER

"serviceWorker" in navigator && window.addEventListener ("load", function() {navigator.serviceWorker.register("serviceWorker.js")});

// =================================================
// =================================================
// ============ CORE VARIABLES

let GAME; let REFRESH_DISPLAY; let INTERVAL_RESFRESH;
const _VERSION = 1.8;
const _GITHUB = "<a href=\"https://github.com/n-deleforge/game-tower\" target=\"_blank\">GitHub</a>";
const _HOME = "<a href=\"https://nicolas-deleforge.fr\" target=\"_blank\">nd</a>";
const _MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
const _SETTINGS = {
    'data' : {
        'health' : 25,
        'healthMax' : 25,
        'strength' : 5,
        'shield' : 0,
        'xp' : 0,
        'xpTo' : 50,
        'level' : 1,
        'floor' : 1,
        'room' : 1,
        'itemHeal' : 0,
        'itemMagic' : 0,
        'itemEscape' : 0,
        'itemLimit' : 9,
        'score' : 0,
        'lvlUpHealth' : 20,
        'lvlUpStrength' : 2, 
        'lvlUpShield' : 0,
        'spiritHealth' : 5,
        'spiritStrength' : 1,
        'spiritShield' : 1
    },
    'images' : {
        'start' : "events/firstFloor.png",
        'monster01' : "monsters/monster_01.png",
        'monster02' : "monsters/monster_02.png",
        'monster03' : "monsters/monster_03.png",
        'monster04' : "monsters/monster_04.png",
        'monster05' : "monsters/monster_05.png",
        'monster06' : "monsters/monster_06.png",
        'monster07' : "monsters/monster_07.png",
        'monster08' : "monsters/monster_08.png",
        'monster09' : "monsters/monster_09.png",
        'monster10' : "monsters/monster_10.png",
        'monster11' : "monsters/monster_11.png",
        'monster12' : "monsters/monster_12.png",
        'monster13' : "monsters/monster_13.png",
        'monster14' : "monsters/monster_14.png",
        'monster15' : "monsters/monster_15.png",
        'monster16' : "monsters/monster_16.png",
        'monster17' : "monsters/monster_17.png",
        'noEvent' : "events/noEvent.png",
        'earthSpirit' : "events/spiritEarth.png",
        'lightSpirit' : "events/spiritLight.png",
        'fireSpirit' : "events/spiritFire.png",
        'waterSpirit' : "events/spiritWater.png",
        'chest' : "events/chest.png",
        'chestTrap' : "events/chestTrap.png",
        'chestEscape' : "events/chestEscape.png",
        'chestMagic' : "events/chestMagic.png",
        'chestHeal' : "events/chestHeal.png",
        'iconPotion' : "icons/potion.png",
        'iconMagic' : "icons/magic.png",
        'iconEscape' : "icons/escape.png",
        'iconHero' : "icons/hero.png",
        'iconHealth' : "icons/health.png",
        'iconExperience' : "icons/xp.png",
        'iconStrength' : "icons/strength.png",
        'iconShield' : "icons/shield.png"
    }
};
const _FRENCH = {
    'auto' : {
        'title' : "La Tour",
        'headerTitle' : "La Tour",
        'startScreenTitle' : "Bienvenue aventurier",
        'nameHeroLabel' : "Quel est ton nom ?",
        'startGame' : "Entrer",
        'startFooter' : "Disponible sur " + _GITHUB + " (v " + _VERSION + ")<br />Hébergé sur " + _HOME,
        'move' : "Avancer",
        'useHeal' : "Utiliser une potion",
        'openChest' : "Ouvrir le coffre",
        'closeChest' : "Ne pas l'ouvrir",
        'useAttack' : "Attaque",
        'useMagic' : "Sortilège",
        'useEscape' : "Fuite",
        'optionMenuTitle' : "Paramètres",
        'statsMenuTitle' : "Statistiques",
        'confirmRestart' : "Recommencer la partie",
        'confirmTotalRestart' : "⚠ EFFACER les données"
    },
    'stats' : {
        'bestScore' : "Meilleur score : ",
        'totalGame' : "Nombre de partie : ",
        'bestFloor' : "Étage atteint le plus haut : ",
        'totalRoom' : "Nombre de salle parcourue : ",
        'maxLevel' : "Niveau d'expérience le plus haut : ",
        'totalExp' : "Total de points d'expérience : ",
        'healUsed' : "Nombre de potion utilisé : ",
        'fightVictory' : "Monstre vaincu : ",
        'fightEscape' : "Combat esquivé : ",
        'chestOpen': "Coffre ouvert : ",
        'chestTrap' : "Coffre piégé : ",
        'chestNotOpened' : "Coffre non ouvert : ",
        'spiritMeet' : "Esprit rencontré : ",
    },
    'app' : {
        'nameHeroCheck' : "Votre nom doit être composé de 2 à 15 lettres",
        'health' : "Santé",
        'experience' : "Exp.",
        'level' : "niv.",
        'score' : "Score",
        'strength' : "Force",
        'shield' : "Bouclier",
        'floor' : "Étage",
        'room' : "Salle",
        'heal_singular' : "Potion",
        'heal_plural' : "Potions",
        'magic_singular' : "Sort",
        'magic_plural' : "Sorts",
        'escape_singular' : "Parchemin",
        'escape_plural' : "Parchemins",
        'point_singular' : "point",
        'point_plural' : "points",
        'hit_singular' : "coup",
        'hit_plural' : "coups",
        'levelUp_part1' : "Votre niveau augmente",
        'levelUp_part2' : "Votre santé est regénérée et vos statistiques augmentent",
        'healing' : "Vous avez utilisé une potion, vous regagnez toute votre santé",
        'noEvent' : "Vous traversez tranquillement de longs couloirs",
        'spiritEarth_part1' : "Un <strong>esprit de la terre</strong> vous protège",
        'spiritEarth_part2' : "Votre bouclier augmente de ",
        'spiritLight_part1' : "Un <strong>esprit de lumière</strong> se rapproche de vous",
        'spiritLight_part2' : "Vous gagnez ",
        'spiritLight_part3' : " d'expérience",
        'spiritFire_part1' : "Un <strong>esprit de feu</strong> partage son énergie",
        'spiritFire_part2' : "Votre force augmente de ",
        'spiritWater_part1' : "Un <strong>esprit d'eau</strong> partage sa vitalité",
        'spiritWater_part2' : "Votre santé augmente de ",
        'chest' : "Vous avez trouvé un <strong>coffre</strong>",
        'chest_notOpened' : "Mais vous décidez de ne pas l'ouvrir",
        'chestTrap_part1' : "Mais c'est un <strong>piège</strong>, le coffre vous attaque",
        'chestTrap_part2' : "Vous perdez ",
        'chestTrap_part3' : " de santé",
        'chestEscape' : "Vous trouvez un <strong>parchemin de fuite</strong>",
        'chestMagic' : "Vous trouvez un <strong>sort magique</strong>",
        'chestHeal' : "Vous trouvez une <strong>potion de soin</strong>",
        'chestLimit' : "Mais vous n'avez plus assez de place",
        'fightStart' : "apparaît !",
        'fightWin_part1' : " vaincu en ",
        'fightWin_part2' : "Vous avez perdu ",
        'fightWin_part3' : " de santé",
        'fightWin_part4' : " d'expérience",
        'fightWin_part5' : "Vous avez gagné ",
        'fightMagic' : "Vous avez vaincu le monstre grâce à un sort magique",
        'fightEscape' : "Vous vous échappez grâce au parchemin de fuite",
        'death' : "Vous tombez de fatigue ...",
        'results' : "Voir les résultats",
        'gameover' : "La partie est terminée.<br />Votre score : ",
        'gameoverButton' : "Recommencer",
        'shareScore_part1' : "Wahou! Je viens de faire un score de ",
        'shareScore_part2' : " points dans La Tour !",
        'shareScore_button' : "Partager",
        'startGame_part1' : "Une vieille pancarte. La plupart des mots sont effacés par le temps.",
        'startGame_part2' : "\"Celui qui ... le sommet pourra ... l'un de ses ... ! ... le danger, restez en ... et grimpez le ... haut ...\"",
        'startGame_part3' : "Vous continuez votre chemin d'un pas déterminé..",
        'confirmRestart' : "Êtes-vous certain de recommencer votre partie ?",
        'confirmDelete' : "Êtes-vous certain d'effacer toutes les données ?"
    },
    'monsters' : {
        'dragon' : "Dragon légendaire",
        'supDemon' : "Démon supérieur",
        'bigSpirit' : "Esprit errant",
        'deadWarrior' : "Guerrier mort-vivant",
        'troll' : "Chef-troll",
        'behemot' : "Béhémot",
        'minotaur' : "Minotaure",
        'cerberus' : "Cerbère",
        'goblin' : "Gobelin",
        'ghost' : "Fantôme",
        'cockatrice' : "Basilic",
        'lamia' : "Lamia",
        'imp' : "Diablotin",
        'plant' : "Plante venimeuse",
        'scorpio' : "Grand scorpion",
        'spider' : "Araignée géante",
        'slim' : "Blob"
    },
    'tips' : [
        "Lorsque la santé du héros tombe à 0, la partie est terminée. Cependant, un gain de niveau ou une potion restaure la totalité des points de santé.",
        "Chaque monstre nécessite un nombre de coups pour être vaincu qui est calculé de la manière suivante : <em>\"santé du monstre / force du héros\"</em>",
        "Les dégâts d'un monstre sont calculés selon la formule suivante : <em>\"(nombre de coups pour être vaincu * force du monstre) - le bouclier du héros\"</em>",
        "Vaincre un monstre avec un sort rapporte seulement 50% de points d'expérience mais peut éviter une morte certaine ou de très gros dégâts.",
        "Les combats se déroulent automatiquement alors veillez à bien choisir votre action de jeu. La fuite peut être une bonne solution pour rester en vie.",
        "La statistique de bouclier permet de réduire les dégâts lors d'une attaque dans un combat. Elle peut être uniquement augmentée par l'esprit de la terre.",    
        "La Tour est peuplée de divers esprits. La plupart d'entre eux vous aideront grandement lors de votre quête, néanmoins certains peuvent être aggressifs.",
        "Lorsque vous ouvrez un coffre, vous avez une chance de tomber sur un monstre qui vous infligera des dégâts qui ignorent votre statistique de bouclier.",
        "La Tour est divisé par étages. Chaque étage est lui-même composé de 10 salles. A chaque étage, les monstres deviennent plus puissants.",
        "Pour les plus curieux, le score de fin de partie est calculé selon la formule suivante : <em>\"((bouclier + force + santé maximale) * niveau) * étage\"</em>",
        "Un combat contre un adversaire puissant est plus compliqué. Vous ne pouvez pas fuir et il est nécessaire de posséder au moins 3 sorts pour gagner grâce au sortillège.",
        "En début de partie, chaque objet que vous pouvez récupérer est limité à une certaine quantité. Par la suite, vous pourrez en garder davantage. "
    ]
};
const _ENGLISH = {
    'auto' : {
        'title' : "The Tower",
        'headerTitle' : "The Tower",
        'startScreenTitle' : "Welcome adventurer",
        'nameHeroLabel' : "What's your name ?",
        'startGame' : "Enter",
        'footer' : "Available on " + _GITHUB + " (v " + _VERSION + ")<br />Hosted on  " + _HOME,
        'move' : "Move",
        'useHeal' : "Use a potion",
        'openChest' : "Open the chest",
        'closeChest' : "Do not open",
        'useAttack' : "Attack",
        'useMagic' : "Spell",
        'useEscape' : "Escape",
        'optionMenuTitle' : "Settings",
        'statsMenuTitle' : "Statistics",
        'closeStatsMenu' : "Close",
        'openStatsMenu' : "Statistics",
        'closeOptionMenu' : "Close",
        'confirmRestart' : "Restart the game",
        'confirmTotalRestart' : "⚠ DELETE all data",
        'openInfoMenu' : "More informations",
        'closeInfoMenu' : "Close"
    },
    'stats' : {
        'bestScore' : "Best score : ",
        'totalGame' : "Number of game : ",
        'bestFloor' : "Highest floor : ",
        'totalRoom' : "Number of rooms : ",
        'maxLevel' : "Highest exp. level : ",
        'totalExp' : "Total exp. point : ",
        'healUsed' : "Potion used : ",
        'fightVictory' : "Monsters defeated  : ",
        'fightEscape' : "Fight escaped : ",
        'chestOpen' : "Chest opened : ",
        'chestTrap' : "Trapped chest : ",
        'chestNotOpened' : "Chest not opened : ",
        'spiritMeet' : "Spirit meet : ",
    },
    'app' : {
        'nameHeroCheck' : "Your name must be composed between 2 to 15 letters.",
        'health' : "Health",
        'experience' : "Exp.",
        'level' : "lvl",
        'score' : "Score",
        'strength' : "Strength",
        'shield' : "Shield",
        'floor' : "Floor",
        'room' : "Room",
        'heal_singular' : "Potion",
        'heal_plural' : "Potions",
        'magic_singular' : "Spell",
        'magic_plural' : "Spells",
        'escape_singular' : "Scroll",
        'escape_plural' : "Scrolls",
        'point_singular' : "point",
        'point_plural' : "points",
        'hit_singular' : "hit",
        'hit_plural' : "hits",
        'levelUp_part1' : "Level up",
        'levelUp_part2' : "Your health is regenerated and your stats increase",
        'healing' : "You use a potion, you regain all your health",
        'noEvent' : "You walk quietly through long corridors",
        'spiritEarth_part1' : "A <strong>earth spirit</strong> protects you",
        'spiritEarth_part2' : "Your shield increases by ",
        'spiritLight_part1' : "A <strong>light spirit</strong> draws near to you",
        'spiritLight_part2' : "You win ",
        'spiritLight_part3' : " of experience",
        'spiritFire_part1' : "A <strong>fire spirit</strong> shares its energy",
        'spiritFire_part2' : "Your strength increases by ",
        'spiritWater_part1' : "A <strong>water spirit</strong> shares its vitality",
        'spiritWater_part2' : "Your health increases by ",
        'chest' : "You have found a <strong>chest</strong>",
        'chest_notOpened' : "But you decide not to open it",
        'chestTrap_part1' : "But it's a <strong>trap</strong>, the chest attacks you",
        'chestTrap_part2' : "You lost ",
        'chestTrap_part3' : " of health",
        'chestEscape' : "You find a <strong>escape scroll</strong>",
        'chestMagic' : "You find a <strong>magic spell</strong>",
        'chestHeal' : "You find a <strong>healing potion</strong>",
        'chestLimit' : "But you don't have enough room",
        'fightStart' : "appears !",
        'fightWin_part1' : " defeated with ",
        'fightWin_part2' : "You have lost ",
        'fightWin_part3' : " of health",
        'fightWin_part4' : " of experience",
        'fightWin_part5' : "You have won ",
        'fightMagic' : "You have defeated the monster with a magic spell",
        'fightEscape' : "You escape thanks to the escape scroll",
        'death' : "You're very tired ...",
        'results' : "See the results",
        'gameover' : "The game is over.<br />Your score : ",
        'gameoverButton' : "Restart",
        'shareScore_part1' : "Wow! I just made a score of ",
        'shareScore_part2' : " points in The Tower!",
        'shareScore_button' : "Share",
        'startGame_part1' : "An old sign. Most of the words are erased by time.",
        'startGame_part2' : "\"Whoever ... the top may ... one of its ...! ... danger, stay in ... and climb the ... top ...\"",
        'startGame_part3' : "You continue your journey with a determined step.",
        'confirmRestart' : "Are you sure to restart your game ?",
        'confirmDelete' : "Are you sure to delete all your data ?"
    },
    'monsters' : {
        'dragon' : "Legendary dragon",
        'supDemon' : "Superior demon",
        'bigSpirit' : "Wandering spirit",
        'deadWarrior' : "Undead warrior",
        'troll' : "Chief troll",
        'behemot' : "Behemot",
        'minotaur' : "Minotaur",
        'cerberus' : "Cerberus",
        'goblin' : "Goblin",
        'ghost' : "Ghost",
        'cockatrice' : "Cockatrice",
        'lamia' : "Lamia",
        'imp' : "Imp",
        'plant' : "Poisonous plant",
        'scorpio' : "Big scorpion",
        'spider' : "Giant spider",
        'slim' : "Blob"
    },
    'tips' : [
        "When the hero's health drops to 0, the game is over. However, leveling up or a potion restores all health points.",
        "Each monster requires a number of hits to be defeated which is calculated as follows: <em>\" monster health / hero strength \"</em>",
        "The damage of a monster is calculated according to the following formula: <em>\" (number of hits to be defeated * strength of the monster) - hero's shield \"</em>",
        "Defeating a monster with a spell only grants 50% experience points but can prevent certain death or very large damage.",
        "The fights take place automatically so be sure to choose your game action. Escape can be a good way to stay alive.",
        "The shield stat is used to reduce damage when attacked in combat. It can only be increased by the spirit of the earth.",
        "The Tower is populated by various spirits. Most of them will help you greatly on your quest, however some can be aggressive.",
        "When you open a chest, you have a chance to stumble upon a monster that will deal damage to you that ignores your shield stat.",
        "The Tower is divided by floors. Each floor itself is made up of 10 rooms. On each floor, the monsters become more powerful.",
        "For the more curious, the end-of-game score is calculated according to the following formula: <em>\" ((shield + strength + maximum health) * level) * floor \"</em>",
        "A fight against a powerful opponent is more complicated. You cannot flee and it is necessary to have at least 3 spells to win thanks to the spell.",
        "At the start of the game, each item you can collect is limited to a certain quantity. Later, you can keep more."
    ]
};

// =================================================
// =================================================
// ============ CORE INITIALISATION

// ===> Correct the bug of the viewport on mobile
if (_MOBILE) get("#container").style.minHeight = window.innerHeight + 'px';

// ===> Create data game or parse it if existing
if (!storage("get", "TOWER-save")) {
    GAME = {
        'core' : {
            'ongoing' : false, 
            'name' : null, 
            'sound' : true,
            'vibrate' : true,
            'version' : _VERSION
        },
        'events' : {
            'lastAction' : null,  
            'newAction' : null, 
            'subAction' : null, 
            'monster' : null,
            'currentEvent' : null
        },
        'stats' : {
            'bestScore' : 0,
            'totalGame' : 0,
            'bestFloor' : 0,
            'totalRoom' : 0,
            'maxLevel' : 0,
            'totalExp' : 0,
            'healUsed' : 0,
            'fightVictory' : 0,
            'fightEscape' : 0,
            'chestOpen': 0,
            'chestTrap' : 0,
            'chestNotOpened' : 0,
            'spiritMeet' : 0,
        },
        'character' : {
            'health' : _SETTINGS.data.health,
            'healthMax' : _SETTINGS.data.healthMax,
            'strength' : _SETTINGS.data.strength,
            'shield' : _SETTINGS.data.shield,
            'xp' : _SETTINGS.data.xp,
            'xpTo' : _SETTINGS.data.xpTo,
            'level' : _SETTINGS.data.level,
            'floor' : _SETTINGS.data.floor,
            'room' : _SETTINGS.data.room,
            'itemHeal' : _SETTINGS.data.itemHeal,
            'itemMagic' : _SETTINGS.data.itemMagic,
            'itemEscape' : _SETTINGS.data.itemEscape,
            'score' : _SETTINGS.data.score
        }
    }

    storage("set", "TOWER-gameSettings", JSON.stringify(GAME));
} else GAME = JSON.parse(storage("get", "TOWER-save"))

// ===> Determine language of the application
const _CONTENT = navigator.language == "fr" || navigator.language == "fr-FR" ? _FRENCH : _ENGLISH;
get('#manifest').href = navigator.language == "fr" || navigator.language == "fr-FR" ? "french.webmanifest" : "english.webmanifest";

for(let i = 0; i < Object.keys(_CONTENT).length - 4; i++) { 
    let data = _CONTENT[Object.keys(_CONTENT)[i]];
    let names = Object.keys(data);
    let values = Object.values(data);
    
    for (let j = 0; j < names.length; j++) {
        get("#" + names[j]).innerHTML = values[j];
    }
}