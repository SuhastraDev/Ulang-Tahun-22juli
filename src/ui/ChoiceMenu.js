import { AudioManager } from '../audio/AudioManager.js';
import { GAME_WIDTH, colorText, palette } from '../data/gameConfig.js';

export class ChoiceMenu {
  constructor(scene) {
    this.scene = scene;
    this.audio = new AudioManager(scene);
    this.container = scene.add.container(0, 0).setDepth(55).setVisible(false);
    this.nodes = [];
  }

  show(question, choices, onPick) {
    this.clear();
    this.container.setVisible(true);

    const questionText = this.scene.add.text(GAME_WIDTH / 2, 514, question, {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: colorText.gentleCream,
      align: 'center',
      lineSpacing: 6,
      wordWrap: { width: 320, useAdvancedWrap: true }
    }).setOrigin(0.5);

    this.container.add(questionText);
    this.nodes.push(questionText);

    choices.forEach((choice, index) => {
      const y = 566 + index * 62;
      const button = this.scene.add.rectangle(GAME_WIDTH / 2, y, 318, 52, palette.shadowPlum, 0.96);
      button.setStrokeStyle(2, palette.duskLavender, 0.9);
      button.setInteractive({ useHandCursor: true });

      const icon = this.drawChoiceIcon(choice.icon, 56, y);

      const label = this.scene.add.text(96, y, choice.label, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: colorText.gentleCream,
        align: 'left',
        wordWrap: { width: 230, useAdvancedWrap: true }
      }).setOrigin(0, 0.5);

      button.on('pointerdown', () => {
        this.audio.playSfx('click', { volume: 0.18 });
        this.hide();
        onPick(choice);
      });

      this.container.add([button, icon, label]);
      this.nodes.push(button, icon, label);
    });
  }

  drawChoiceIcon(type, x, y) {
    const graphics = this.scene.add.graphics();
    graphics.setPosition(x, y);

    if (type === 'photo') {
      graphics.fillStyle(palette.gentleCream, 1);
      graphics.fillRect(-15, -15, 30, 30);
      graphics.fillStyle(palette.calmBlue, 1);
      graphics.fillRect(-11, -11, 22, 22);
      graphics.fillStyle(palette.warmLantern, 1);
      graphics.fillRect(3, -8, 5, 5);
      graphics.fillStyle(palette.successMint, 1);
      graphics.fillTriangle(-10, 10, -1, 0, 8, 10);
    } else if (type === 'sound') {
      graphics.fillStyle(palette.warmLantern, 1);
      graphics.fillRect(-13, -4, 7, 12);
      graphics.fillTriangle(-6, -9, 9, -1, -6, 8);
      graphics.lineStyle(3, palette.softRose, 1);
      graphics.strokeCircle(12, 0, 6);
      graphics.strokeCircle(12, 0, 12);
    } else if (type === 'spark') {
      graphics.fillStyle(palette.warmLantern, 1);
      graphics.fillRect(-3, -18, 6, 36);
      graphics.fillRect(-18, -3, 36, 6);
      graphics.fillStyle(palette.softRose, 1);
      graphics.fillRect(-8, -8, 16, 16);
    } else if (type === 'heart') {
      graphics.fillStyle(palette.softRose, 1);
      graphics.fillCircle(-7, -5, 8);
      graphics.fillCircle(7, -5, 8);
      graphics.fillTriangle(-16, -2, 16, -2, 0, 17);
    } else if (type === 'shield') {
      graphics.fillStyle(palette.successMint, 1);
      graphics.fillTriangle(-15, -15, 15, -15, 11, 10);
      graphics.fillTriangle(-15, -15, 11, 10, 0, 18);
    } else if (type === 'smile') {
      graphics.fillStyle(palette.warmLantern, 1);
      graphics.fillCircle(0, 0, 17);
      graphics.fillStyle(palette.ink, 1);
      graphics.fillRect(-7, -5, 4, 4);
      graphics.fillRect(5, -5, 4, 4);
      graphics.fillRect(-6, 7, 12, 3);
    } else if (type === 'balloon') {
      graphics.fillStyle(palette.softRose, 1);
      graphics.fillCircle(0, -6, 15);
      graphics.fillTriangle(-5, 7, 5, 7, 0, 14);
      graphics.lineStyle(2, palette.gentleCream, 1);
      graphics.lineBetween(0, 14, 0, 24);
    } else if (type === 'gift') {
      graphics.fillStyle(palette.warmLantern, 1);
      graphics.fillRect(-15, -8, 30, 24);
      graphics.fillStyle(palette.softRose, 1);
      graphics.fillRect(-3, -12, 6, 28);
      graphics.fillRect(-15, -2, 30, 5);
    } else {
      graphics.fillStyle(palette.duskLavender, 1);
      graphics.fillRect(-14, -14, 28, 28);
    }

    return graphics;
  }

  hide() {
    this.container.setVisible(false);
  }

  clear() {
    this.nodes.forEach((node) => node.destroy());
    this.nodes = [];
  }
}
