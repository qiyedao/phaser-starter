import { useEffect, useState } from 'react';
import './App.css';
import Demo from './game';

function App() {
    const [count, setCount] = useState(0);
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
        <div className="App">
            <canvas id="game"></canvas>
        </div>
    );
}

export default App;
