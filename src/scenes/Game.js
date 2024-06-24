import Phaser from 'phaser';
import Hero from '../entities/Hero';




class Game extends Phaser.Scene {


    constructor() {
        super({ key: 'GameScene' });
    }



    preload() {


        this.load.tilemapTiledJSON('level-1', 'assets/tilemaps/level-1.json');


        this.load.image('world-1-sheet', 'assets/tilesets/world-1.png');





        this.load.spritesheet('hero-idle-sheet', 'assets/hero/idle.png', {
            frameWidth: 32,
            frameHeight: 64,
        });


        this.load.spritesheet('hero-pivot-sheet', 'assets/hero/pivot.png', {
            frameWidth: 32,
            frameHeight: 64,
        });


        this.load.spritesheet('hero-jump-sheet', 'assets/hero/jump.png', {
            frameWidth: 32,
            frameHeight: 64,
        });


        this.load.spritesheet('hero-flip-sheet', 'assets/hero/spinjump.png', {
            frameWidth: 32,
            frameHeight: 64,
        });


        this.load.spritesheet('hero-fall-sheet', 'assets/hero/fall.png', {
            frameWidth: 32,
            frameHeight: 64,
        });


        this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', {
            frameWidth: 32,
            frameHeight: 64,
        });



    }


    

    create(data) {

        this.cursorKeys = this.input.keyboard.createCursorKeys();


        this.anims.create({
            key: 'hero-idle',
            frames: this.anims.generateFrameNumbers('hero-idle-sheet'),
            frameRate: 10,
            repeat: -1,
        });


        this.anims.create({
            key: 'hero-pivot',
            frames: this.anims.generateFrameNumbers('hero-pivot-sheet'),
            frameRate: 10,
            repeat: -1,
        });


        this.anims.create({
            key: 'hero-jumping',
            frames: this.anims.generateFrameNumbers('hero-jump-sheet'),
            frameRate: 10,
            repeat: -1,
        });


        this.anims.create({
            key: 'hero-flipping',
            frames: this.anims.generateFrameNumbers('hero-flip-sheet'),
            frameRate: 30,
            repeat: 0,
        });


        this.anims.create({
            key: 'hero-falling',
            frames: this.anims.generateFrameNumbers('hero-fall-sheet'),
            frameRate: 9,
            repeat: -1,
        });


        this.anims.create({
            key: 'hero-running',
            frames: this.anims.generateFrameNumbers('hero-run-sheet'),
            frameRate: 9,
            repeat: -1,
        });



        this.addMap();

        this.hero = new Hero(this, 250, 160);

       




    }




    addMap() {
        
    this.map = this.make.tilemap({ key: 'level-1' });
    console.log('Tilemap loaded:', this.map);  // Check if map loads correctly

    const tileset = this.map.addTilesetImage('world-1', 'world-1-sheet');
    console.log('Tileset loaded:', tileset);  // Check if tileset is correctly linked

    const groundLayer = this.map.createStaticLayer('Ground', tileset);
    console.log('Layer created:', groundLayer);  // Verify layer creation
}






    update(time, delta) {
        
    }




    
}








export default Game;
