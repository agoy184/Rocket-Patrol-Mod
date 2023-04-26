/*
Name: Abel Goy
Title: Rocket Patrol Revenge of the Spaceship
Approximate Time: * hours
Mods: 
5 points: High Score, 'FIRE' UI Text, Background Music

Citations: 
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene:  [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;