import 'phaser';

class Packets extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 99,
      key: 'redpacket',
      active: false,
      visible: false,
      setScale: {
        x: 0.5,
        y: 0.5,
      },
    });
  }

  firePacket(x: any, y: any, velocityX: any, velocityY: any) {
    const packet = this.getFirstDead(false);

    if (packet) {
      packet.body.reset(x, y);
      if (velocityX) {
        packet.setVelocityX(velocityX);
      }
      if (velocityY) {
        packet.setVelocityY(velocityX);
      }

      packet.setVisible(true);

      packet.setActive(true);
    }
  }
}
export default Packets;
