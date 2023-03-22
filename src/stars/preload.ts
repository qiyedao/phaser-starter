import 'phaser';
import Packets from './Packets';

//初始化图片
const imgjishi = 'assets/red/img/daojishi.png';
const bgPlan = 'assets/red/img/bg-plan.jpg';
const bgRainer = 'assets/red/img/bg-rainer.jpg';
const redpacket = 'assets/red/img/redpacket.png';
const close = 'assets/red/img/close.png';
const dialogExit = 'assets/red/img/dialog-exit.png';
const buttonCancel = 'assets/red/img/button-cancel.png';
const buttonExit = 'assets/red/img/button-exit.png';
const openRedpacket = 'assets/red/img/open-redpacket.png';
const open = 'assets/red/img/open.png';
const redpacketResult = 'assets/red/img/redpacket-result.png';
const buttonUseTicket = 'assets/red/img/button-use-ticket.png';
const buttonContinue = 'assets/red/img/button-continue.png';
const cursorAnimation = 'assets/red/img/cursor-animation.png';
const ids = [0, 1, 2, 3, 4, 5];
const redpackets = [
  '全场优惠50元',
  '20元代金券',
  '全场优惠50元',
  '20元代金券',
  '全场优惠50元',
  '20元代金券',
];
const time = 25;
const getIds = [];
const radio = document.documentElement.clientWidth / 375;
function rfuc(n: number) {
  return n * radio;
}
export default class Preload extends Phaser.Scene {
  scoreTextSafeArea!: Phaser.GameObjects.Text;
  cursorPointer!: Phaser.GameObjects.Sprite;
  daojishi!: Phaser.GameObjects.Sprite;
  bgRainer: any;
  leftTimeText!: Phaser.GameObjects.Text;
  leftTime!: number;
  timerEventCountDown!: Phaser.Time.TimerEvent;
  timerEventPacket!: Phaser.Time.TimerEvent;
  modal!: Phaser.GameObjects.Graphics;
  ticketText!: Phaser.GameObjects.Text;
  redpacketResult!: Phaser.GameObjects.Sprite;
  userTicket!: Phaser.GameObjects.Sprite;
  goOn!: Phaser.GameObjects.Sprite;
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
      frameHeight: 108,
    });
  }
  create() {
    console.log('this.game', this, this.game.config.width, this.game.config.height);

    this.bg = this.add.tileSprite(0, 0, 719, 1280, 'bgPlan').setScale(1).setOrigin(0.215);
    this.cursorPointer = this.add.sprite(
      (this.game.config.width as number) / 2,
      (this.game.config.height as number) / 2,
      'cursorAnimation',
    );
    this.anims.create({
      key: 'cursorAnimation',
      frames: this.anims.generateFrameNumbers('cursorAnimation', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: 'spriteDestroy',
      frames: this.anims.generateFrameNumbers('redpacket', { start: 0, end: 1 }),

      repeat: 0,
    });
    this.cursorPointer.anims.play('cursorAnimation', true);

    this.daojishi = this.add
      .sprite(
        (this.game.config.width as number) / 2,
        (this.game.config.height as number) / 2 - 300,
        'daojishi',
      )
      .setScale(0.5);
    this.anims.create({
      key: 'daojishi',
      frames: this.anims.generateFrameNumbers('daojishi', { start: 0, end: 3 }),
      frameRate: 1,
      repeat: 0,
    });
    this.daojishi.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      () => {
        this.startGame();
      },
      this,
    );
    this.daojishi.anims.play('daojishi');
  }
  refreshTime() {
    this.leftTime--;
    const tem = this.leftTime.toString();
    this.leftTimeText.setText(tem);
    if (this.leftTime === 0) {
      this.scene.pause('preload');
      this.createModal();
    }
  }
  hidePacketsModal() {
    this.redpacketResult.setVisible(false);
    this.ticketText.setVisible(false);

    this.userTicket.setVisible(false);

    this.goOn.setVisible(false);
  }
  createPacketModal(text: string | string[]) {
    this.redpacketResult = this.add
      .sprite(rfuc(0), rfuc(130), 'redpacketResult')
      .setOrigin(0, 0)
      .setScale(0.5)
      .setInteractive();
    console.log('this.redpacketResult', this.redpacketResult);

    this.redpacketResult.on('pointerdown', () => {});

    this.ticketText = this.add.text(0, rfuc(338), text, {
      color: '#ffe67d',
      fontSize: '20px',
    });
    this.ticketText.setX(window.innerWidth / 2 - this.ticketText.width / 2);

    this.userTicket = this.add
      .sprite(rfuc(78), rfuc(445), 'buttonUseTicket')
      .setScale(0.5)
      .setOrigin(0, 0)
      .setInteractive();
    this.userTicket.once('pointerdown', () => {
      alert('启动新场景');
    });
    this.goOn = this.add
      .sprite(rfuc(198), rfuc(445), 'buttonContinue')
      .setScale(0.5)
      .setOrigin(0, 0)
      .setInteractive();
    this.goOn.once('pointerdown', () => {
      alert('goOn');
      this.scene.resume('preload');
    });
  }
  handleHitPacket(sprite: any) {
    console.log('sprite', sprite);

    if (Math.random() < 1 / 2 && ids.length) {
      this.scene.pause('preload');

      const selectIdIndex = Math.floor(Math.random() * ids.length);
      getIds.push(ids[selectIdIndex]);
      ids.splice(selectIdIndex, 1);
      const text = redpackets[ids[selectIdIndex]];
      this.createModal();
      this.createPacketModal(text);
    } else {
      sprite.setVelocity(0, 0);
      sprite.setGravity(0, -600);

      sprite.anims.play('spriteDestroy');
      sprite.on(
        Phaser.Animations.Events.ANIMATION_COMPLETE,
        () => {
          this.killSprite(sprite);
        },
        this,
      );
    }
  }
  killSprite(sprite: any) {
    this.tweens.add({
      targets: sprite,
      alpla: {
        from: 1,
        to: 0,
      },
      duration: 300,
      onComplete: () => {
        sprite.destroy();
      },
    });
  }
  createPackets(num: number) {
    for (let i = 0; i < num; i++) {
      // @ts-ignore
      this.redGroups.firePacket(
        Phaser.Math.FloatBetween(0, window.innerWidth),
        0,
        Phaser.Math.FloatBetween(0, -100),
        Phaser.Math.FloatBetween(100, 300),
      );
    }
  }
  createModal() {
    //背景
    this.modal = this.add.graphics();
    this.modal
      .fillStyle(0x0000, 0.7)
      .fillRect(
        0,
        0,
        document.documentElement.clientWidth + 100,
        document.documentElement.clientHeight + 100,
      );
  }
  hideModal() {
    //背景
    this.modal.setVisible(false);
  }
  startGame() {
    this.daojishi.setVisible(false);
    this.bgRainer = this.add.tileSprite(0, 0, 719, 1280, 'bgRainer').setScale(1).setOrigin(0.215);
    this.leftTime = time;
    this.leftTimeText = this.add.text(
      (this.game.config.width as number) - 50,
      0,
      this.leftTime.toString(),
      {
        color: '#FFF',
        fontSize: '40px',
      },
    );

    this.redGroups = new Packets(this);
    this.redGroups.children.iterate((child: any) => {
      child.setInteractive();
      child.once('pointerdown', () => {
        this.handleHitPacket(child);
      });
    });

    this.time.removeAllEvents();
    this.timerEventCountDown = this.time.addEvent({
      delay: 1000,
      timeScale: 1.0,
      loop: true,
      callback: () => {
        this.refreshTime();
      },
    });
    this.timerEventPacket = this.time.addEvent({
      delay: 200,
      timeScale: 0.2,
      loop: true,
      callback: () => {
        this.createPackets(3);
      },
    });

    this.leftTimeText.setScale(rfuc(1));
    this.input.on('pointerdown', () => {
      console.log('全局');
    });
  }
  update() {}
}
