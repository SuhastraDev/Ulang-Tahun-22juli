import Phaser from 'phaser';
import './styles/main.css';
import { GAME_HEIGHT, GAME_WIDTH, gameScaleConfig } from './data/gameConfig.js';
import { BootScene } from './scenes/BootScene.js';
import { EndingScene } from './scenes/EndingScene.js';
import { FailureScene } from './scenes/FailureScene.js';
import { FeelingScene } from './scenes/FeelingScene.js';
import { LoadingScene } from './scenes/LoadingScene.js';
import { MemoryScene } from './scenes/MemoryScene.js';
import { OpeningScene } from './scenes/OpeningScene.js';
import { PlayScene } from './scenes/PlayScene.js';
import { WarmWorldScene } from './scenes/WarmWorldScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game-root',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#141827',
  pixelArt: true,
  roundPixels: true,
  scale: gameScaleConfig,
  scene: [
    BootScene,
    LoadingScene,
    OpeningScene,
    MemoryScene,
    FeelingScene,
    PlayScene,
    FailureScene,
    WarmWorldScene,
    EndingScene
  ],
  audio: {
    disableWebAudio: false
  }
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
