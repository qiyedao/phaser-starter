import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import Side from '../../components/Side';
import Preload from '../../stars/preload';
import classNames from 'classnames';
const DEFAULT_WIDTH: number = window.innerWidth;
const DEFAULT_HEIGHT: number = window.innerHeight;
const SIDE_WIDTH = 300;
export default () => {
  const [isPC, setIsPC] = useState(false);
  const initGame = () => {
    const config = {
      backgroundColor: '#ffffff',

      scale: {
        // we do scale the game manually in resize()
        // please check if the parent matched the id in your index.html file
        parent: 'game',
        mode: Phaser.Scale.NONE,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      },
      scene: [Preload],
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { y: 600 },
        },
      },
    };
    new Phaser.Game(config);
  };
  useEffect(() => {
    initGame();
    setIsPC(false);
  }, []);

  return (
    <div id="game" className={classNames(styles.game)}>
      {isPC && <Side width={SIDE_WIDTH} />}
    </div>
  );
};
