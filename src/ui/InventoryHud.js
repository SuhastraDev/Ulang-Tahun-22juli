import { colorText, palette } from '../data/gameConfig.js';

export class InventoryHud {
  constructor(scene, state) {
    this.scene = scene;
    this.state = state;
    this.container = scene.add.container(16, 18).setDepth(40);
    this.label = scene.add.text(0, 0, 'Kunci: -', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: colorText.gentleCream
    });
    this.badges = scene.add.container(0, 28);
    this.container.add([this.label, this.badges]);
    this.render();
  }

  render() {
    this.badges.removeAll(true);
    this.label.setText(`Kunci: ${this.state.keys.length}/3`);

    const keys = ['Ingatan', 'Rasa', 'Ceria'];
    keys.forEach((key, index) => {
      const unlocked = this.state.hasKey(key);
      const x = index * 34;
      const badge = this.scene.add.rectangle(x, 0, 24, 24, unlocked ? palette.warmLantern : palette.shadowPlum, 1);
      badge.setStrokeStyle(2, unlocked ? palette.gentleCream : palette.duskLavender, 0.9);
      const text = this.scene.add.text(x, 0, unlocked ? 'K' : '?', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: unlocked ? colorText.cinemaNavy : colorText.duskLavender
      }).setOrigin(0.5);
      this.badges.add([badge, text]);
    });
  }
}
