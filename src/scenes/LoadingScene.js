import Phaser from 'phaser';
import { audioAssets, backgroundAssets, characterAssets, realMediaAssets } from '../data/assets.js';
import { GAME_HEIGHT, GAME_WIDTH, palette } from '../data/gameConfig.js';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super('LoadingScene');
  }

  preload() {
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;
    const barWidth = 216;

    this.cameras.main.setBackgroundColor(palette.cinemaNavy);

    this.add
      .text(centerX, centerY - 86, 'Bioskop Kenangan', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#fff1d6',
        align: 'center'
      })
      .setOrigin(0.5);

    const statusText = this.add
      .text(centerX, centerY - 46, 'menyalakan lampu...', {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#efa5b8',
        align: 'center'
      })
      .setOrigin(0.5);

    const percentText = this.add
      .text(centerX, centerY + 30, '0%', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#fff1d6',
        align: 'center'
      })
      .setOrigin(0.5);

    const barBg = this.add.rectangle(centerX, centerY + 6, 220, 10, palette.shadowPlum).setOrigin(0.5);
    const bar = this.add.rectangle(centerX - 108, centerY + 6, 0, 6, palette.warmLantern).setOrigin(0, 0.5);

    this.tweens.add({
      targets: barBg,
      alpha: 0.55,
      duration: 700,
      yoyo: true,
      repeat: -1
    });

    this.load.on('progress', (value) => {
      bar.width = Math.max(2, barWidth * value);
      percentText.setText(`${Math.round(value * 100)}%`);
    });

    this.load.on('fileprogress', (file) => {
      statusText.setText(`memuat ${file.key}...`);
    });

    this.load.on('complete', () => {
      bar.width = barWidth;
      percentText.setText('100%');
      statusText.setText('pintu kenangan terbuka...');
    });

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

  }

  create() {
    this.time.delayedCall(350, () => this.scene.start('OpeningScene'));
  }
}
