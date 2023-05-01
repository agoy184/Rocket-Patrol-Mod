/*
Name: Abel Goy
Title: Rocket Patrol Revenge of the Spaceship
Approximate Time: * hours
Mods: 
5 pts:  High Score, 
        'FIRE' UI Text, 
        Background Music, 
        30 sec Speed Increase, 
        New Scrolling tile sprite,
        Control Rocket after fired, 
(30)
10 pts: 4 Random Explosion SFX,
        Display time remainings,
        Texture atlas (Santa's Sleigh?)
        Create New Title Screen (Add multiarrow icy BG?)
(40)
15 pts: Create new enemy spaceship (Reindeer?)
        Mouse Control?
(30)
Citations: 
https://freesound.org/people/derplayer/sounds/587186/
https://freesound.org/people/derplayer/sounds/587185/
https://freesound.org/people/derplayer/sounds/587189/
https://www.youtube.com/watch?v=jUOZc27B1f4
https://www.w3schools.com/js/js_random.asp
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