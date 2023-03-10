import React, { useEffect } from 'react';
import Preload from '../preload';
import Demo from '../game';

export default () => {
    useEffect(() => {
        const config = {
            canvas: document.getElementById('game') as HTMLCanvasElement,
            type: Phaser.WEBGL,
            backgroundColor: '#ffe8a3', //改为游戏的背景颜色
            mode: Phaser.Scale.FIT, // 缩放模式
            physics: {
                default: 'matter', //使用matterjs物理引擎
                matter: {
                    gravity: {
                        y: 2
                    },
                    debug: true //开启调试
                }
            },
            width: window.innerWidth,
            height: window.innerHeight,
            scene: [Preload, Demo]
        };
        const game = new Phaser.Game(config);
        console.log('game', game);
    }, []);
    return <canvas id="game"></canvas>;
};
