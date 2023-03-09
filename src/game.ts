import 'phaser';

export default class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }

    preload() {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create() {
        const logo = this.add.image(400, 70, 'logo');
        this.tweens.add({
            targets: logo,
            y: 530,
            duration: 2000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }
}
