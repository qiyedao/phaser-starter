import React, { useEffect } from 'react';
import Preload from '../watermelon/preload';
import Demo from '../watermelon/game';

export default () => {
    let game: Phaser.Game;
    useEffect(() => {
        const config = {
            canvas: document.getElementById('game') as HTMLCanvasElement,
            type: Phaser.WEBGL,
            backgroundColor: '#ffe8a3', //改为游戏的背景颜色
            mode: Phaser.Scale.FIT, // 缩放模式
            width: window.innerWidth,
            height: window.innerHeight,
            physics: {
                default: 'matter', //使用matterjs物理引擎
                matter: {
                    gravity: {
                        y: 2
                    },
                    debug: true //开启调试
                }
            },

            scene: [Preload, Demo]
        };
        game = new Phaser.Game(config);
    }, []);

    return <canvas id="game"></canvas>;
};
