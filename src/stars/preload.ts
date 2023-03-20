import 'phaser';
import Pockets from './Pockets';

//初始化图片
let imgjishi = 'assets/red/img/daojishi.png';
let bgPlan = 'assets/red/img/bg-plan.jpg';
let bgRainer = 'assets/red/img/bg-rainer.jpg';
let redpacket = 'assets/red/img/redpacket.png';
let close = 'assets/red/img/close.png';
let dialogExit = 'assets/red/img/dialog-exit.png';
let buttonCancel = 'assets/red/img/button-cancel.png';
let buttonExit = 'assets/red/img/button-exit.png';
let openRedpacket = 'assets/red/img/open-redpacket.png';
let open = 'assets/red/img/open.png';
let redpacketResult = 'assets/red/img/redpacket-result.png';
let buttonUseTicket = 'assets/red/img/button-use-ticket.png';
let buttonContinue = 'assets/red/img/button-continue.png';
let cursorAnimation = 'assets/red/img/cursor-animation.png';
let ids = [0, 1, 2, 3, 4, 5];
let redpackets = [
    '全场优惠50元',
    '20元代金券',
    '全场优惠50元',
    '20元代金券',
    '全场优惠50元',
    '20元代金券'
];
let time = 5;
let getIds = [];
let radio = document.documentElement.clientWidth / 375;
let e;
let config = {
    selfPool: 40,
    selfPic: 'redpacket',
    rate: 0.5,
    maxSpeed: 1200,
    minSpeed: 400,
    max: 95
};
function rfuc(n) {
    return n * radio;
}
export default class Preload extends Phaser.Scene {
    scoreTextSafeArea!: Phaser.GameObjects.Text;
    cursorPointer: Phaser.GameObjects.Sprite;
    daojishi: Phaser.GameObjects.Sprite;
    bgRainer: any;
    leftTimeText: Phaser.GameObjects.Text;
    leftTime: number;
    timerEventCountDown: Phaser.Time.TimerEvent;
    timerEventPocket: Phaser.Time.TimerEvent;
    modal: Phaser.GameObjects.Graphics;
    constructor() {
        super('preload');
    }
    private bg: any;
    private redGroups!: Phaser.Physics.Arcade.Group;

    preload() {
        console.log('preload');

        this.load.spritesheet('daojishi', imgjishi, { frameWidth: 250, frameHeight: 120 });
        this.load.image('bgPlan', bgPlan);
        this.load.image('bgRainer', bgRainer);
        this.load.spritesheet('redpacket', redpacket, { frameWidth: 144, frameHeight: 173 });
        this.load.image('close', close);
        this.load.image('dialogExit', dialogExit);
        this.load.image('buttonExit', buttonExit);
        this.load.image('buttonCancel', buttonCancel);
        this.load.image('openRedpacket', openRedpacket);
        this.load.image('open', open);
        this.load.image('redpacketResult', redpacketResult);
        this.load.image('buttonContinue', buttonContinue);
        this.load.image('buttonUseTicket', buttonUseTicket);
        this.load.spritesheet('cursorAnimation', cursorAnimation, {
            frameWidth: 73,
            frameHeight: 108
        });
    }
    create() {
        console.log('this.game', this, this.game.config.width, this.game.config.height);

        this.bg = this.add.tileSprite(0, 0, 719, 1280, 'bgPlan').setScale(1).setOrigin(0.215);
        this.cursorPointer = this.add.sprite(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'cursorAnimation'
        );
        this.anims.create({
            key: 'cursorAnimation',
            frames: this.anims.generateFrameNumbers('cursorAnimation', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        this.cursorPointer.anims.play('cursorAnimation', true);

        this.daojishi = this.add
            .sprite(this.game.config.width / 2, this.game.config.height / 2 - 300, 'daojishi')
            .setScale(0.5);
        this.anims.create({
            key: 'daojishi',
            frames: this.anims.generateFrameNumbers('daojishi', { start: 0, end: 3 }),
            frameRate: 1,
            repeat: 0
        });
        this.daojishi.on(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            () => {
                this.startGame();
            },
            this
        );
        this.daojishi.anims.play('daojishi');
    }
    refreshTime() {
        this.leftTime--;
        var tem = this.leftTime;
        this.leftTimeText.setText(tem);
        if (this.leftTime === 0) {
            this.scene.pause('preload');
            this.createModal();
        }
    }
    createPockets(num: number) {
        for (let i = 0; i < num; i++) {
            this.redGroups.firePocket(
                Phaser.Math.FloatBetween(0, window.innerWidth),
                0,
                Phaser.Math.FloatBetween(0, -100),
                Phaser.Math.FloatBetween(100, 300)
            );
        }
    }
    createModal() {
        //背景
        this.modal = this.add.graphics();
        this.modal.fillStyle(0x000000, 0.5).fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    startGame() {
        this.daojishi.setVisible(false);
        this.bgRainer = this.add
            .tileSprite(0, 0, 719, 1280, 'bgRainer')
            .setScale(1)
            .setOrigin(0.215);
        this.leftTime = time;
        this.leftTimeText = this.add.text(this.game.config.width - 50, 0, this.leftTime, {
            fill: '#FFF',
            fontSize: '40px',
            fontWeight: 'bolder'
        });

        this.redGroups = new Pockets(this);
        this.createPockets(3);

        this.time.removeAllEvents();
        this.timerEventCountDown = this.time.addEvent({
            delay: 1000,
            timeScale: 1.0,
            loop: true,
            callback: e => {
                this.refreshTime();
                console.log(e, 'timerEventCountDown', new Date().toLocaleTimeString());
            }
        });
        this.timerEventPocket = this.time.addEvent({
            delay: 300,
            timeScale: 0.3,
            loop: true,
            callback: e => {
                this.createPockets(3);
            }
        });

        this.leftTimeText.setScale(rfuc(1));
    }
    update() {}
}
