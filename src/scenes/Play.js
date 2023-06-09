class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        //audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion1', './assets/explosion00.wav');//https://freesound.org/people/derplayer/sounds/587186/
        this.load.audio('sfx_explosion2', './assets/explosion01.wav');//https://freesound.org/people/derplayer/sounds/587185/
        this.load.audio('sfx_explosion3', './assets/explosion05.wav');//https://freesound.org/people/derplayer/sounds/587189/
        this.load.audio('sfx_explosion4', './assets/explosion38.wav');//(Default sound from Nathan)
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

        //music (Kevin MacLeod Dance of the Sugar Plum Fairies)
        this.load.audio('bg_music', './assets/dance_plum.mp3');

        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('waves', './assets/waves.png');
        this.load.image('mountains', './assets/mountains.png');
        this.load.image('sleigh', './assets/sleigh.png');

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //tile sprite background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.mountains = this.add.tileSprite(0, game.config.height - borderUISize*4, 640, 144, 'mountains').setOrigin(0, 0);
        this.waves = this.add.tileSprite(0, game.config.height - borderUISize*2, 640, 48, 'waves').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width * 2, borderUISize * 2, 0xFFFFFF)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        //add rocket(p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //add spaceship
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderUISize*4, 'spaceship', 0, 10).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*7 + borderPadding*2, 'sleigh', 0, 40).setOrigin(0, 0);//NEW Spaceship is worth 40 points!
        this.ship04.moveSpeed = 6;//ALSO it's FASTER than all the other ships

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //SCORE initialize
        this.p1Score = 0;
        this.fireDisplay = "FIRE";
        let scoreConfig = {
            fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text((game.config.width - 3.5 * (borderUISize + borderPadding)), borderUISize + borderPadding*2, this.hiScore, scoreConfig);//display high score
        this.fireText = this.add.text(game.config.width/2, borderUISize + borderPadding*2, this.fireDisplay, scoreConfig);//Fire UI
        this.fireText.visible = false;
        this.gameOver = false;

        //60 sec clock
        this.timeLeft = 3600;
        this.timeLeftUI = this.add.text(borderUISize + borderPadding + 125, borderUISize + borderPadding*2, Math.ceil(this.timeLeft / 60), scoreConfig);

        // 30 second speedup
        this.clock = this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed = 5;
            this.ship02.moveSpeed = 5;
            this.ship03.moveSpeed = 5;
        }, null, this);
        //start music
        this.sound.play('bg_music');
    }

    update() {
        if (this.p1Rocket.isFiring) {//Fire UI checks
            this.fireText.visible = true;
        }
        if (!this.p1Rocket.isFiring) {
            this.fireText.visible = false;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            if (this.p1Score > this.hiScore || this.hiScore == null) {//High score checks
                this.hiScore = this.p1Score;
            }
            this.sound.stopAll();//stop music
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if (this.p1Score > this.hiScore || this.hiScore == null) {
                this.hiScore = this.p1Score;
            }
            this.sound.stopAll();//stop music
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        this.mountains.tilePositionX += 3;
        this.waves.tilePositionX -= 2;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();  
            this.ship04.update();   
        }
        let textConfig = { 
            fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
        }
        this.timeLeft--;
        if (this.timeLeft >= 0) {
            this.timeLeftUI.text = Math.ceil(this.timeLeft / 60);
        }
        if (this.timeLeft <= 0) {//Time checker
            textConfig.fixedWidth = 0;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', textConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)){//Mechanism adding time implemented here
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
            this.timeLeft += 180;
        }       
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.timeLeft += 60;
        }       
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.timeLeft += 60;
        }       
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.timeLeft += 60;
        }       
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship){
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.scoreRight.text = this.hiScore;
        let randomSound = Math.floor(Math.random() * 4) + 1;//From https://www.w3schools.com/js/js_random.asp
        if (randomSound == 1) {
            this.sound.play('sfx_explosion1');
        } else if (randomSound == 2) {
            this.sound.play('sfx_explosion2');
        } else if (randomSound == 3) {
            this.sound.play('sfx_explosion3');
        } else if (randomSound == 4) {
            this.sound.play('sfx_explosion4');
        }
      }
}