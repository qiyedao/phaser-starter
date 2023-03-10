import React, { useEffect } from 'react';
import Demo from '../game';

export default () => {
    useEffect(() => {
        console.log('init game');
        const config = {
            type: Phaser.WEBGL,
            backgroundColor: '#125555',
            width: 800,
            height: 600,
            scene: Demo,
            canvas: document.getElementById('game') as HTMLCanvasElement
        };
        const game = new Phaser.Game(config);
    }, []);
    return (
        <div>
            <canvas id="game"></canvas>
        </div>
    );
};
