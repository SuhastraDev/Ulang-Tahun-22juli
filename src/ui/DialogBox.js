import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';
import { GAME_HEIGHT, GAME_WIDTH, colorText, palette } from '../data/gameConfig.js';

export class DialogBox {
  constructor(scene) {
    this.scene = scene;
    this.queue = [];
    this.onComplete = null;
    this.currentLine = null;
    this.isActive = false;
    this.audio = new AudioManager(scene);

    this.container = scene.add.container(0, 0).setDepth(50).setVisible(false);
    this.tail = scene.add.triangle(0, 60, -10, 0, 10, 0, 0, 14, palette.ink, 0.96);
    this.panel = scene.add.rectangle(0, 0, 272, 112, palette.ink, 0.96);
    this.panel.setStrokeStyle(3, palette.warmLantern, 0.9);
    this.speakerText = scene.add.text(-124, -44, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: colorText.warmLantern
    });
    this.bodyText = scene.add.text(-124, -18, '', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: colorText.gentleCream,
      lineSpacing: 6,
      wordWrap: { width: 246, useAdvancedWrap: true }
    });
    this.hintText = scene.add.text(124, 42, 'tap', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: colorText.softRose
    }).setOrigin(1, 0.5);

    this.container.add([this.tail, this.panel, this.speakerText, this.bodyText, this.hintText]);
    this.panel.setInteractive({ useHandCursor: true });
    this.panel.on('pointerdown', () => this.next());
    this.tail.setInteractive({ useHandCursor: true });
    this.tail.on('pointerdown', () => this.next());
  }

  play(lines, onComplete) {
    this.queue = [...lines];
    this.onComplete = onComplete;
    this.isActive = true;
    this.container.setVisible(true);
    this.next();
  }

  next() {
    if (!this.isActive) {
      return;
    }

    this.currentLine = this.queue.shift();
    this.audio.playSfx('click', { volume: 0.12 });

    if (!this.currentLine) {
      this.hide();
      this.onComplete?.();
      return;
    }

    this.speakerText.setText(this.currentLine.speaker ?? '');
    this.bodyText.setText(this.currentLine.text ?? '');
    this.positionAboveSpeaker(this.currentLine.speaker);
  }

  positionAboveSpeaker(speaker) {
    const anchor = this.scene.getSpeakerAnchor?.(speaker) ?? { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 246 };
    const panelHalfWidth = 136;
    const x = Phaser.Math.Clamp(anchor.x, panelHalfWidth + 14, GAME_WIDTH - panelHalfWidth - 14);
    const y = Phaser.Math.Clamp(anchor.y - 92, 104, GAME_HEIGHT - 224);

    this.container.setPosition(x, y);
    this.tail.setPosition(anchor.x - x, 58);
    this.scene.focusSpeaker?.(speaker);
  }

  hide() {
    this.isActive = false;
    this.container.setVisible(false);
  }
}
