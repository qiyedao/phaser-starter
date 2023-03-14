import 'phaser';
const CDN = 'assets/stars/';

export default class Preload extends Phaser.Scene {
    constructor() {
        super('preload');
    }
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars!: Phaser.Physics.Arcade.Group;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private bombs!: Phaser.Physics.Arcade.Group;
    private bg!: Phaser.GameObjects.TileSprite;
    private gameOver = false;
    preload() {
        console.log('preload');

        this.load.image('sky', CDN + 'sky.png');
        this.load.image('ground', CDN + 'platform.png');
        this.load.image('star', CDN + 'star.png');
        this.load.image('bomb', CDN + 'bomb.png');
        this.load.spritesheet('dude', CDN + 'dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create() {
        console.log('create');

        // this.add.image(400, 300, 'sky');
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'sky');
        // this.bg.setOrigin(0, 0);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        this.player = this.physics.add.sprite(100, 50, 'dude');
        this.scoreText = this.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            color: '#000'
        });
        this.player.setBounce(0.2);
        this.player.body.setGravityY(300);

        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));
            child.setBounceX(Phaser.Math.FloatBetween(0.5, 0.8));
            child.setVelocity(Phaser.Math.Between(-20, 20), 20);

            child.setCollideWorldBounds(true);
        });
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.bombs);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);
    }

    collectStar(player: any, star: any) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('score:' + this.score);
        var x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child: any) {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }
    hitBomb(player: any, bomb: any) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }
    update() {
        this.bg.tilePositionY += 1;
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-500);
        }
    }
}
export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Preload],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};
