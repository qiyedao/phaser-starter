import React, { useEffect } from 'react';
import { config } from '../stars/preload';

export default () => {
    useEffect(() => {
        const game = new Phaser.Game(config);
    }, []);
    return <div></div>;
};
