// ===> Determine some settings of the game
let game;
let settings = {
    'version' : 1.5,
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
        'itemLimit' : 5,
        'score' : 0,
        'lvlUpHealth' : 20,
        'lvlUpStrength' : 2, 
        'lvlUpShield' : 0, 
        'spiritHealth' : 5,
        'spiritStrength' : 1,
        'spiritShield' : 1
    },
    'refreshDisplay' : null,
    'mobileDevice' : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    'messageTimeDisplay' : 1000,
    'floorBoss' : [8,11,14,17,20,23,26,29,32,35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80,83,86,89,91,94,97,99],
    'floorSpecial' : [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100],
    'lastFloor' : 100,
    'githubLink' : "<a href=\"https://github.com/n-deleforge/game-tower\" target=\"_blank\">GitHub</a>",
    'ndLink' : "<a href=\"https://nicolas-deleforge.fr\" target=\"_blank\">nd</a>"
}

// ===> Correct the bug of the viewport on mobile
if (settings.mobileDevice) get("#container").style.minHeight = window.innerHeight + 'px';

// ===> Create data game or parse it if existing
if (storage("get", "TOWER-gameSettings")) game = JSON.parse(storage("get", "TOWER-gameSettings"))
else {
    game = {
        'core' : {
            'ongoing' : false, 
            'name' : null, 
            'sound' : true,
            'version' : 1.3
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
            'health' : settings.data.health,
            'healthMax' : settings.data.healthMax,
            'strength' : settings.data.strength,
            'shield' : settings.data.shield,
            'xp' : settings.data.xp,
            'xpTo' : settings.data.xpTo,
            'level' : settings.data.level,
            'floor' : settings.data.floor,
            'room' : settings.data.room,
            'itemHeal' : settings.data.itemHeal,
            'itemMagic' : settings.data.itemMagic,
            'itemEscape' : settings.data.itemEscape,
            'score' : settings.data.score,
            'itemLimit' : settings.data.itemLimit,
            'lvlUpHealth' :settings.data.lvlUpHealth,
            'lvlUpStrength' :settings.data.lvlUpStrength,
            'lvlUpShield' :settings.data.lvlUpShield
        }
    }

    storage("set", "TOWER-gameSettings", JSON.stringify(game));
}

// ===> French translation
const FR = {
    'auto' : {
        'title' : "La Tour",

        'headerTitle' : "La Tour",
        'startScreenTitle' : "Bienvenue aventurier",
        'nameHeroLabel' : "Quel est ton nom ?",
        'startGame' : "Entrer",
        'footer' : "Disponible sur " + settings.githubLink + " (v " + settings.version + ")<br />Hébergé sur " + settings.ndLink,

        'move' : "Avancer",
        'useHeal' : "Utiliser une potion",
        'openChest' : "Ouvrir le coffre",
        'closeChest' : "Ne pas l'ouvrir",
        'useAttack' : "Attaque",
        'useMagic' : "Sortilège",
        'useEscape' : "Fuite",

        'optionMenuTitle' : "Paramètres",
        'statsMenuTitle' : "Statistiques",
        'closeStatsMenu' : "Fermer",
        'openStatsMenu' : "Statistiques",
        'closeOptionMenu' : "Fermer",
        'confirmRestart' : "Recommencer la partie",
        'confirmTotalRestart' : "⚠ EFFACER les données",
        'openInfoMenu' : "Plus d'informations",
        'closeInfoMenu' : "Fermer",
        'infoMenuTitle' : "Plus d'informations",
        'infoMenuContent' : `<li>L'application a été réalisée uniquement en Javascript pure, sans aucune librairies externes.</li>
                                         <li>La majorité des ressources (images et sons) proviennent de la librairie de base de RPG Maker MV que je possède. Les icones de statut proviennent d'un pack gratuit sur <a href="https://kyrise.itch.io/kyrises-free-16x16-rpg-icon-pack">Itchio</a>.</li>`
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

        'spiritWind' : "Un <strong>esprit du vent</strong> virevolte autour de vous",
        'spiritWind_noStealing' : "Et s'enfuit",
        'spiritWind_healStealing' : "Il dérobe une <strong>potion de soin</strong>",
        'spiritWind_magicStealing' : "Il dérobe un <strong>sort magique</strong>",
        'spiritWind_escapeStealing' : "Il dérobe un <strong>parchemin de fuite</strong>",

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

        'bossFight_start' : "Un adversaire puissant vous barre la route",
        'bossFight_win' : "L'adversaire puissant vaincu en ",
        'bossFight_magic' : "Vous avez vaincu l'adversaire puissant grâce à un sort magique",

        'death' : "Vous tombez de fatigue ...",
        'results' : "Voir les résultats",
        'gameover' : "La partie est terminée.<br />Votre score : ",
        'gameoverButton' : "Recommencer",
        'shareScore_part1' : "Wahou! Je viens de faire un score de ",
        'shareScore_part2' : " points dans La Tour !",
        'shareScore_button' : "Partager",

        'startGame' : `<div id="containerImage"><img src="assets/images/special/sign.png" alt=""></div>
                                    <p>Une vieille pancarte. La plupart des mots sont effacés par le temps.</p>
                                    <em>"Celui qui ... le sommet pourra ... l'un de ses ... ! ... le danger, restez en ... et grimpez le ... haut ..."</em>
                                    <p>Vous continuez votre chemin d'un pas déterminé.</p>`,

        'endGame' : `<div id="containerImage"><img src="assets/images/events/endGame.png" alt=""></div>
                                    <p>Vous êtes finalement arrivé en haut de la tour mais vous ne voyez rien d'autre qu'un ciel infini.</p>
                                    <p>Vous vous demandez alors la raison de tout ceci mais vous avez oublié le pourquoi du comment.</p>`                
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
}

// ===> English translation
const EN = {
    'auto' : {
        'title' : "The Tower",

        'headerTitle' : "The Tower",
        'startScreenTitle' : "Welcome adventurer",
        'nameHeroLabel' : "What's your name ?",
        'startGame' : "Enter",
        'footer' : "Soon available on " + settings.githubLink + " (v " + settings.version + ")<br />Hosted on  " + settings.ndLink,

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
        'closeInfoMenu' : "Close",
        'infoMenuTitle' : "More informations",
        'infoMenuContent' : `<li>The application has been realized only with pure Javascript, no external libraries has been used.</li>
                                         <li>The majority of the resources (images and sounds) are from the basic library of RPG Maker MV that I own. The icons of the top bar are from a free pack on <a href="https://kyrise.itch.io/kyrises-free-16x16-rpg-icon-pack">Itchio</a>.</li>`
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

        'spiritWind' : "A <strong>wind spirit</strong> flies around you",
        'spiritWind_noStealing' : "And fled",
        'spiritWind_healStealing' : "He steals a <strong>healing potion</strong>",
        'spiritWind_magicStealing' : "He steals a <strong>magic spell</strong>",
        'spiritWind_escapeStealing' : "He steals a <strong>escape scroll</strong>",

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

        'bossFight_start' : "A powerful opponent stands in your way",
        'bossFight_win' : "The mighty opponent defeated in ",
        'bossFight_magic' : "You defeated the mighty opponent with a magic spell",

        'death' : "You're very tired ...",
        'results' : "See the results",
        'gameover' : "The game is over.<br />Your score : ",
        'gameoverButton' : "Restart",
        'shareScore_part1' : "Wow! I just made a score of ",
        'shareScore_part2' : " points in The Tower!",
        'shareScore_button' : "Share",

        'startGame': `<div id ="containerImage"><img src="assets/images/special/sign.png" alt =""></div>
                                    <p>An old sign. Most of the words are erased by time.</p>
                                    <em>"Whoever ... the top may ... one of its ...! ... danger, stay in ... and climb the ... top ..."</em>
                                    <p>You continue your journey with a determined step.</p>`,

        'endGame' : `<div id="containerImage"><img src="assets/images/events/endGame.png" alt=""></div>
                                <p>Finally you reach the top of the tower but you only see an inifite sky.</p>
                                <p>You're asking yourself what was the reason of all that but you forgot the why of the how.</p>`    
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
}

// ===> Determine language of the app
if (navigator.language == "fr" || navigator.language == "fr-FR") {
    get("#htmlTag").lang = "fr";
    language = FR;
}
else {
    get("#htmlTag").lang = "en";
    language = EN;
}

// ===> Automatically display all the "language.auto" object
for(let i = 0; i < Object.keys(language).length - 4; i++) { 
    let allData = language[Object.keys(language)[i]];
        let idName = Object.keys(allData);
        let values = Object.values(allData);
    
        for (let j = 0; j < idName.length; j++) 
            get("#" + idName[j]).innerHTML = values[j];
}