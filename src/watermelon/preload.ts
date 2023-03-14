import 'phaser';

const CDN = 'assets/watermelon';

export default class Preload extends Phaser.Scene {
    constructor() {
        super('preload');
    }
    private progressText!: Phaser.GameObjects.Text;
    preload() {
        this.progressText = this.add.text(
            window.innerWidth / 2,
            window.innerHeight / 2,
            'progress' + 0 + '%'
        );
        this.load.on('progress', (value: any) => {
            console.log(value);
            this.progressText.setText('progress' + value * 100 + '%');
        });
        this.load.on('complete', function () {
            console.log('file complete');
        });
        this.load.image('ground', CDN + '/ground.png');
        this.load.image('endLine', CDN + '/endLine.png');
        this.load.image('light', CDN + '/endLine.png');
        this.load.image('gameOver', CDN + '/gameover.png');
        this.load.image('tryagain', CDN + '/tryagain.png');
        this.load.image('yes', CDN + '/yes.png');
        this.load.image('no', CDN + '/no.png');
        for (let i = 1; i <= 11; i++) {
            this.load.image(`${i}`, `${CDN}/${i}.png`);
        }
        this.load.atlas('success', CDN + '/confi.png', CDN + '/confi.json');
    }
    create() {
        this.progressText.destroy();
        this.scene.launch('demo');
    }
}
