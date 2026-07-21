import { AudioManager } from '../audio/AudioManager.js';
import { GAME_WIDTH, colorText, palette } from '../data/gameConfig.js';

export class TimerBar {
  constructor(scene) {
    this.scene = scene;
    this.audio = new AudioManager(scene);
    this.duration = 0;
    this.remaining = 0;
    this.isRunning = false;
    this.onComplete = null;

    this.container = scene.add.container(GAME_WIDTH / 2, 82).setDepth(45).setVisible(false);
    this.bg = scene.add.rectangle(0, 0, 252, 16, palette.shadowPlum, 0.95);
    this.fill = scene.add.rectangle(-124, 0, 248, 10, palette.warmLantern, 1).setOrigin(0, 0.5);
    this.label = scene.add.text(0, -24, 'Waktu', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: colorText.softRose
    }).setOrigin(0.5);
    this.container.add([this.label, this.bg, this.fill]);
  }

  start(seconds, onComplete) {
    this.duration = seconds;
    this.remaining = seconds;
    this.onComplete = onComplete;
    this.isRunning = true;
    this.container.setVisible(true);
    this.audio.playSfx('timer', { volume: 0.26 });
    this.render();
  }

  stop() {
    this.isRunning = false;
    this.container.setVisible(false);
  }

  update(_, delta) {
    if (!this.isRunning) {
      return;
    }

    this.remaining -= delta / 1000;
    this.render();

    if (this.remaining <= 0) {
      this.isRunning = false;
      this.remaining = 0;
      this.render();
      this.onComplete?.();
    }
  }

  render() {
    const progress = Math.max(this.remaining, 0) / this.duration;
    this.fill.width = 248 * progress;
    this.fill.setFillStyle(progress < 0.3 ? palette.dangerRed : palette.warmLantern);
    this.label.setText(`Waktu: ${Math.ceil(Math.max(this.remaining, 0))} detik`);
  }
}
