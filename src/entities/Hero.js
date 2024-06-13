import Phaser from "phaser";
import StateMachine from 'javascript-state-machine';

class Hero extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'hero-idle-sheet', 0); 

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.body.setSize(12, 40);
        this.body.setOffset(12, 23);
        this.body.setMaxSpeed(250, 400);
        this.body.setDragX(250);

        this.keys = scene.cursorKeys; 
        this.input = {};

        this.setupAnimations();
        this.setupMovement();
    }

    setupAnimations() {
        this.animsState = new StateMachine({
            init: 'idle',
            transitions: [
                { name: 'idle', from: ['falling', 'running', 'pivoting'], to: 'idle' },
                { name: 'run', from: ['falling', 'idle', 'pivoting'], to: 'running' },
                { name: 'pivot', from: ['falling', 'running'], to: 'pivoting' },
                { name: 'jump', from: ['idle', 'running', 'pivoting'], to: 'jumping' },
                { name: 'flip', from: ['jumping', 'falling', 'pivoting'], to: 'flipping' },
                { name: 'fall', from: '*', to: 'falling' },
            ],
            methods: {
                onEnterState: (lifecycle) => {
                    this.anims.play('hero-' + lifecycle.to);
                    console.log('Entering state:', lifecycle.to); 
                },
            },
        });

        this.animPredicates = {
            idle: () => this.body.onFloor() && this.body.velocity.x === 0,
            run: () => this.body.onFloor() && Math.abs(this.body.velocity.x) > 0,
            pivot: () => this.body.onFloor() && (Math.sign(this.body.velocity.x) > 0) === (this.flipX ? 1 : -1),
            jump: () => this.body.velocity.y < 0,
            flip: () => this.body.velocity.y < 0 && this.moveState.is('flipping'),
            fall: () => this.body.velocity.y > 0,
        };
    }

    setupMovement() {
        this.moveState = new StateMachine({
            init: 'standing',
            transitions: [
                { name: 'jump', from: 'standing', to: 'jumping' },
                { name: 'flip', from: 'jumping', to: 'flipping' },
                { name: 'fall', from: 'standing', to: 'falling' },
                { name: 'touchdown', from: ['jumping', 'flipping', 'falling'], to: 'standing' }
            ],
            methods: {
                onJump: () => this.body.setVelocityY(-400),
                onFlip: () => this.body.setVelocityY(-300),
            },
        });

        this.movePredicates = {
            jump: () => this.input.didPressJump,
            flip: () => this.input.didPressJump,
            fall: () => !this.body.onFloor(),
            touchdown: () => this.body.onFloor(),
        };
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.input.didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

        if (this.keys.left.isDown) {
            this.body.setAccelerationX(-1000);
            this.setFlipX(true);
            this.body.offset.x = 8;
        } else if (this.keys.right.isDown) {
            this.body.setAccelerationX(1000);
            this.setFlipX(false);
            this.body.offset.x = 12;
        } else {
            this.body.setAccelerationX(0);
        }

        if (this.moveState.is('jumping') || this.moveState.is('flipping')) {
            if (!this.keys.up.isDown && this.body.velocity.y < -150) {
                this.body.setVelocityY(-150);
            }
        }

        for (const t of this.moveState.transitions()) {
            if (t in this.movePredicates && this.movePredicates[t]()) {
                this.moveState[t]();
                break;
            }
        }

        for (const t of this.animsState.transitions()) {
            if (t in this.animPredicates && this.animPredicates[t]()) {
                this.animsState[t]();
                break;
            }
        }
    }
}

export default Hero;
