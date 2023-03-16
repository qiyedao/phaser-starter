import 'phaser';
const CDN = 'assets/stars/';

export default class Preload extends Phaser.Scene {
    scoreTextSafeArea!: Phaser.GameObjects.Text;
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
    private sky!: Phaser.GameObjects.TileSprite;
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
        const world = {
            width: 1600, // the width of 2 ground platforms
            height: 800 // the hight of the game
        };

        // the width and height of the world map
        this.cameras.main.setBounds(0, 0, world.width, world.height);
        this.physics.world.setBounds(0, 0, world.width, world.height);

        // this.add.image(400, 300, 'sky');
        // this.sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        // this.sky.setOrigin(0, 0);
        // this.platforms = this.physics.add.staticGroup();
        // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        // this.platforms.create(600, 400, 'ground');
        // this.platforms.create(50, 250, 'ground');
        // this.platforms.create(750, 220, 'ground');
        this.sky = this.add
            .tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'sky')
            .setOrigin(0)
            // take the full height
            .setScale(Math.max(this.cameras.main.height / 600, 1))
            .setScrollFactor(0);

        // add all platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 800, 'ground').setScale(2).refreshBody().setOrigin(0.5, 1);
        this.platforms.create(1200, 800, 'ground').setScale(2).refreshBody().setOrigin(0.5, 1);
        this.platforms.create(600, 632, 'ground');
        this.platforms.create(50, 482, 'ground');
        this.platforms.create(750, 453, 'ground');
        this.platforms.create(1150, 312, 'ground');
        this.platforms.refresh();
        this.player = this.physics.add.sprite(100, 50, 'dude');

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

        // draw safe area
        let safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(1, 0xffffff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0);
        // this is fixed to the safeArea
        this.scoreTextSafeArea = this.add
            .text(safeArea.x + 16, safeArea.y + 16, 'score: 0', { fontSize: '32px', color: '#000' })
            .setOrigin(0)
            .setScrollFactor(0);
        // this is fixed to the safeArea
        this.scoreText = this.add
            .text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' })
            .setOrigin(0)
            .setScrollFactor(0);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.bombs);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);

        // camera should follow the player
        this.cameras.main.startFollow(this.player, true);

        // the resize function
        const resize = () => {
            // update position of safe area
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2;
            safeArea.y = this.cameras.main.height - +this.game.config.height;

            // adjust the score text
            this.scoreTextSafeArea.x = safeArea.x + 16;
            this.scoreTextSafeArea.y = safeArea.y + 16;
            this.scoreText.x = 16;
            this.scoreText.y = 16;

            // adjust sky
            this.sky.width = this.cameras.main.width;
            this.sky.height = this.cameras.main.height;
            this.sky.setScale(Math.max(this.cameras.main.height / 600, 1));
        };

        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height);
            resize();
        });
        resize();
    }

    collectStar(player: any, star: any) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('score:' + this.score);
        this.scoreTextSafeArea.setText('Score: ' + this.score);
        var x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        // var bomb = this.bombs.create(x, 16, 'bomb');
        // bomb.setBounce(1);
        // bomb.setCollideWorldBounds(true);
        // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        // if (this.stars.countActive(true) === 0) {
        //     this.stars.children.iterate(function (child: any) {
        //         child.enableBody(true, child.x, 0, true, true);
        //     });
        // }
    }
    hitBomb(player: any, bomb: any) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }
    update() {
        // this.sky.tilePositionY += 1;
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-800);
        }
    }
}
