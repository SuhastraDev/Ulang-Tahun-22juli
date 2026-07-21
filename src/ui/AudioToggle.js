import { AudioManager } from '../audio/AudioManager.js';
import { GAME_WIDTH, colorText, palette } from '../data/gameConfig.js';

export class AudioToggle {
  constructor(scene, state) {
    this.scene = scene;
    this.state = state;
    this.audio = new AudioManager(scene);
    this.button = scene.add.rectangle(GAME_WIDTH - 48, 32, 48, 30, palette.shadowPlum, 0.92).setDepth(48);
    this.button.setStrokeStyle(2, palette.duskLavender, 0.8);
    this.label = scene.add.text(GAME_WIDTH - 48, 32, 'BGM', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: colorText.gentleCream
    }).setOrigin(0.5).setDepth(49);

    this.button.setInteractive({ useHandCursor: true });
    this.button.on('pointerdown', () => this.toggle());
    this.render();
  }

  toggle() {
    if (!this.state.audioEnabled) {
      this.audio.unlock();
    } else {
      this.audio.setEnabled(false);
    }
    this.render();
  }

  render() {
    this.button.setFillStyle(this.state.audioEnabled ? palette.warmLantern : palette.shadowPlum, 0.95);
    this.label.setColor(this.state.audioEnabled ? colorText.cinemaNavy : colorText.gentleCream);
    this.label.setText(this.state.audioEnabled ? 'ON' : 'BGM');
  }
}
