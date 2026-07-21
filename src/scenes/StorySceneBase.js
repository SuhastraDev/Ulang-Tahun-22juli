import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';
import { backgroundAssets } from '../data/assets.js';
import { GAME_HEIGHT, GAME_WIDTH, colorText, palette } from '../data/gameConfig.js';
import { gameState } from '../state/GameState.js';
import { AudioToggle } from '../ui/AudioToggle.js';
import { ChoiceMenu } from '../ui/ChoiceMenu.js';
import { DialogBox } from '../ui/DialogBox.js';
import { InventoryHud } from '../ui/InventoryHud.js';
import { MediaUnlock } from '../ui/MediaUnlock.js';
import { PixelCharacter } from '../ui/PixelCharacter.js';
import { TimerBar } from '../ui/TimerBar.js';

export class StorySceneBase extends Phaser.Scene {
  setupStoryScene(backgroundKey, { overlayAlpha = 0.48, title = '' } = {}) {
    this.characters = {};
    this.audio = new AudioManager(this);
    this.cameras.main.setBackgroundColor(palette.cinemaNavy);
    this.drawCoverBackground(backgroundKey);
    this.drawAtmosphere(overlayAlpha);
    this.inventoryHud = new InventoryHud(this, gameState);
    this.audioToggle = new AudioToggle(this, gameState);
    this.dialogBox = new DialogBox(this);
    this.choiceMenu = new ChoiceMenu(this);
    this.timerBar = new TimerBar(this);
    this.mediaUnlock = new MediaUnlock(this);
    this.audio.playAmbience(this.ambience ?? 'dark');
    this.playSceneIntro(title);
  }

  drawCoverBackground(textureKey) {
    const image = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, textureKey).setDepth(0);
    const source = this.textures.get(textureKey).getSourceImage();
    const scale = Math.max(GAME_WIDTH / source.width, GAME_HEIGHT / source.height);
    image.setScale(scale);
  }

  drawAtmosphere(alpha) {
    const graphics = this.add.graphics().setDepth(1);
    graphics.fillStyle(0x070914, alpha);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    graphics.fillGradientStyle(0x050711, 0x050711, 0x141827, 0x141827, 0.05, 0.05, 0.82, 0.9);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  addCharacter(name, x, y, options = {}) {
    this.characters[name] = new PixelCharacter(this, {
      name,
      x,
      y,
      scale: options.scale ?? 1,
      height: options.height ?? 80,
      depth: options.depth ?? 28,
      label: options.label ?? true,
      enterFrom: options.enterFrom ?? null
    });
    return this.characters[name];
  }

  getSpeakerAnchor(speaker) {
    return this.characters?.[speaker]?.getDialogAnchor();
  }

  focusSpeaker(speaker) {
    this.characters?.[speaker]?.focus();
  }

  update(time, delta) {
    this.timerBar?.update(time, delta);
  }

  playSceneIntro(title) {
    this.cameras.main.fadeIn(420, 5, 7, 17);

    if (!title) {
      return;
    }

    const panel = this.add.rectangle(GAME_WIDTH / 2, 116, 294, 44, palette.ink, 0.82).setDepth(80);
    panel.setStrokeStyle(2, palette.warmLantern, 0.72);
    const text = this.add
      .text(GAME_WIDTH / 2, 116, title, {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: colorText.gentleCream,
        align: 'center'
      })
      .setOrigin(0.5)
      .setDepth(81);

    this.tweens.add({
      targets: [panel, text],
      alpha: 0,
      delay: 1100,
      duration: 520,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        panel.destroy();
        text.destroy();
      }
    });
  }

  transitionTo(sceneKey, message = '', options = {}) {
    const direction = options.exitDirection ?? 'right';
    const startBlackout = () => this.playBlackout(sceneKey, message);
    const exitNames = ['Adek', ...(options.exitCharacters ?? [])];
    const movers = exitNames
      .map((name) => this.characters?.[name])
      .filter(Boolean);

    if (movers.length && options.moveAdek !== false) {
      this.dialogBox?.hide();
      let completed = 0;
      movers.forEach((character) => {
        character.exit(direction, () => {
          completed += 1;
          if (completed === movers.length) {
            startBlackout();
          }
        });
      });
      return;
    }

    startBlackout();
  }

  playBlackout(sceneKey, message = '') {
    const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0)
      .setDepth(100);
    const text = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, message, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: colorText.gentleCream,
        align: 'center',
        lineSpacing: 10,
        wordWrap: { width: 320, useAdvancedWrap: true }
      })
      .setOrigin(0.5)
      .setAlpha(0)
      .setDepth(101);

    this.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 900,
      ease: 'Sine.easeInOut'
    });

    this.tweens.add({
      targets: text,
      alpha: message ? 1 : 0,
      delay: 620,
      duration: 720,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.time.delayedCall(message ? 2600 : 700, () => {
          this.scene.start(sceneKey);
        });
      }
    });
  }

  showContinueButton(label, onClick) {
    const button = this.add
      .rectangle(GAME_WIDTH / 2, 742, 246, 48, palette.warmLantern)
      .setDepth(52)
      .setInteractive({ useHandCursor: true });
    const text = this.add
      .text(GAME_WIDTH / 2, 742, label, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: colorText.cinemaNavy
      })
      .setOrigin(0.5)
      .setDepth(53);

    button.on('pointerdown', () => {
      button.destroy();
      text.destroy();
      onClick();
    });
  }

  get backgrounds() {
    return backgroundAssets;
  }
}
