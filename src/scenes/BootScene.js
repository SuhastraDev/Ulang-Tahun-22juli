import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.setPath('/assets');
  }

  create() {
    this.scene.start('LoadingScene');
  }
}
