/*
Name: Abel Goy
Title: Rocket Patrol Revenge of the Spaceship
Approximate Time: 10 hours
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
        Create New Title Screen
        Parallax Scrolling
(40)
15 pts: Create New enemy spaceship
        Timing/scoring mechanism that adds time to  clock for successful hits
(30)
30 + 40 + 30 = 100 pts
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