import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import Side from '../../components/Side';
import Preload from '../../stars/preload';
import classNames from 'classnames';

type scaleMode = 'FIT' | 'SMOOTH';

const DEFAULT_WIDTH_PC: number = 1024;
const DEFAULT_HEIGHT_PC: number = 576;
const MAX_WIDTH_PC: number = 1536;
const MAX_HEIGHT_PC: number = 864;
const DEFAULT_WIDTH_M: number = 375;
const DEFAULT_HEIGHT_M: number = 667;
const MAX_WIDTH_M: number = 576;
const MAX_HEIGHT_M: number = 1024;
let DEFAULT_WIDTH: number = 375;
let DEFAULT_HEIGHT: number = 667;
let MAX_WIDTH: number = 576;
let MAX_HEIGHT: number = 1024;
let SCALE_MODE: scaleMode = 'SMOOTH'; // FIT OR SMOOTH
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
                height: DEFAULT_HEIGHT
            },
            scene: [Preload],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 500 }
                }
            }
        };

        if (window.innerWidth >= 1024) {
            setIsPC(true);
            config.scale.width = window.innerWidth - SIDE_WIDTH;
            config.scale.height = window.innerHeight;

            DEFAULT_WIDTH = DEFAULT_WIDTH_PC;
            DEFAULT_HEIGHT = DEFAULT_HEIGHT_PC;
            MAX_WIDTH = MAX_WIDTH_PC;
            MAX_HEIGHT = MAX_HEIGHT_PC;
        } else {
            config.scale.width = window.innerWidth;
            config.scale.height = window.innerHeight;
            DEFAULT_WIDTH = DEFAULT_WIDTH_M;
            DEFAULT_HEIGHT = DEFAULT_HEIGHT_M;
            MAX_WIDTH = MAX_WIDTH_M;
            MAX_HEIGHT = MAX_HEIGHT_M;
        }
        console.log('config', config);

        const game = new Phaser.Game(config);

        const resize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            let width = DEFAULT_WIDTH;
            let height = DEFAULT_HEIGHT;
            let maxWidth = MAX_WIDTH;
            let maxHeight = MAX_HEIGHT;
            let scaleMode = SCALE_MODE;
            let scale = Math.min(w / width, h / height);
            let newWidth = Math.min(w / scale, maxWidth);
            let newHeight = Math.min(h / scale, maxHeight);
            let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;
            let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT;
            let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT;
            // smooth scaling
            let smooth = 1;
            if (scaleMode === 'SMOOTH') {
                const maxSmoothScale = 1.15;
                const normalize = (value: number, min: number, max: number) => {
                    return (value - min) / (max - min);
                };
                if (width / height < w / h) {
                    smooth =
                        -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) /
                            (1 / (maxSmoothScale - 1)) +
                        maxSmoothScale;
                } else {
                    smooth =
                        -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) /
                            (1 / (maxSmoothScale - 1)) +
                        maxSmoothScale;
                }
            }
            game.scale.resize(newWidth * smooth, newHeight * smooth);
            if (w > DEFAULT_WIDTH_PC) {
                game.canvas.style.width = newWidth * scale - SIDE_WIDTH + 'px';
            } else {
                game.canvas.style.width = newWidth * scale + 'px';
            }
            game.canvas.style.height = newHeight * scale + 'px';
            game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`;
            game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`;
        };
        window.addEventListener('resize', event => {
            resize();
        });
        resize();
    };
    useEffect(() => {
        initGame();
    }, []);

    return (
        <div id="game" className={classNames(styles.game)}>
            {isPC && <Side width={SIDE_WIDTH} />}
        </div>
    );
};
