import 'phaser';

class Pockets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 99,
            key: 'redpacket',
            active: false,
            visible: false,
            setScale: {
                x: 0.5,
                y: 0.5
            }
        });
    }

    firePocket(x, y, velocityX, velocityY) {
        let pocket = this.getFirstDead(false);

        if (pocket) {
            pocket.body.reset(x, y);
            if (velocityX) {
                pocket.setVelocityX(velocityX);
            }
            if (velocityY) {
                pocket.setVelocityY(velocityX);
            }
            pocket.setVisible(true);

            pocket.setActive(true);
        }
    }
}
export default Pockets;
