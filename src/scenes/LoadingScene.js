import Phaser from 'phaser';
import { audioAssets, backgroundAssets, characterAssets, realMediaAssets } from '../data/assets.js';
import { GAME_HEIGHT, GAME_WIDTH, palette } from '../data/gameConfig.js';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super('LoadingScene');
  }

  preload() {
    this.load.setPath('/assets');

    Object.values(backgroundAssets).forEach((asset) => {
      this.load.image(asset.key, asset.path);
    });

    Object.values(characterAssets).forEach((asset) => {
      this.load.image(asset.key, asset.path);
    });

    Object.values(audioAssets).forEach((asset) => {
      this.load.audio(asset.key, asset.path);
    });

    realMediaAssets.images.forEach((asset) => {
      this.load.image(asset.key, asset.path);
    });

    realMediaAssets.videos.forEach((asset) => {
      this.load.video(asset.key, asset.path, 'loadeddata', false, false);
    });
  }

  create() {
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;

    this.cameras.main.setBackgroundColor(palette.cinemaNavy);

    this.add
      .text(centerX, centerY - 80, 'Bioskop Kenangan', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#fff1d6',
        align: 'center'
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 44, 'menyalakan lampu...', {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#efa5b8',
        align: 'center'
      })
      .setOrigin(0.5);

    const barBg = this.add.rectangle(centerX, centerY + 6, 220, 10, palette.shadowPlum).setOrigin(0.5);
    const bar = this.add.rectangle(centerX - 108, centerY + 6, 0, 6, palette.warmLantern).setOrigin(0, 0.5);

    bar.width = 216;

    this.tweens.add({
      targets: barBg,
      alpha: 0.55,
      duration: 700,
      yoyo: true,
      repeat: -1
    });

    this.time.delayedCall(450, () => this.scene.start('OpeningScene'));
  }
}
