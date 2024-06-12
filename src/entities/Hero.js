 import Phaser from "phaser";



 class Hero extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, 'hero-run-sheet', 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.anims.play('hero-running');

        this.body.setCollideWorldBounds(true);
        this.body.setSize(12, 40);
        this.body.setOffset(12, 23);


        this.keys = scene.cursorKeys;

    }


    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.keys.left.isDown) {
            this.body.setVelocityX(-250);
            this.setFlipX(true);
            this.body.offset.x = 8;
        } else if(this.keys.right.isDown) {
            this.body.setVelocityX(250);
            this.setFlipX(false);
            this.body.offset.x = 12;
        } else {
            this.body.setVelocityX(0);
        }
    }   




 }



 export default Hero;