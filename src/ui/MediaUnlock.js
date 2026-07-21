import { AudioManager } from '../audio/AudioManager.js';
import { GAME_HEIGHT, GAME_WIDTH, colorText, palette } from '../data/gameConfig.js';

export class MediaUnlock {
  constructor(scene) {
    this.scene = scene;
    this.audio = new AudioManager(scene);
    this.container = scene.add.container(0, 0).setDepth(70).setVisible(false);
    this.backdrop = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x050711, 0.78);
    this.frame = scene.add.rectangle(GAME_WIDTH / 2, 342, 310, 214, palette.ink, 1);
    this.frame.setStrokeStyle(3, palette.warmLantern, 0.95);
    this.title = scene.add.text(GAME_WIDTH / 2, 250, '', {
      fontFamily: 'monospace',
      fontSize: '15px',
      color: colorText.warmLantern,
      align: 'center'
    }).setOrigin(0.5);
    this.body = scene.add.text(GAME_WIDTH / 2, 438, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: colorText.gentleCream,
      align: 'center',
      lineSpacing: 7,
      wordWrap: { width: 276, useAdvancedWrap: true }
    }).setOrigin(0.5);
    this.close = scene.add.rectangle(GAME_WIDTH / 2, 536, 204, 42, palette.warmLantern, 1);
    this.close.setInteractive({ useHandCursor: true });
    this.closeText = scene.add.text(GAME_WIDTH / 2, 536, 'Simpan Kenangan', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: colorText.cinemaNavy
    }).setOrigin(0.5);

    this.container.add([this.backdrop, this.frame, this.title, this.body, this.close, this.closeText]);
    this.close.on('pointerdown', () => {
      this.container.setVisible(false);
      this.onClose?.();
    });
  }

  show({ title, body }, onClose) {
    this.onClose = onClose;
    this.audio.playSfx('unlock', { volume: 0.28 });
    this.mediaObject?.destroy();
    this.mediaObject = null;
    this.title.setText(title);
    this.body.setText(body);
    this.container.setVisible(true);
  }

  showImage({ title, body, imageKey }, onClose) {
    this.show({ title, body }, onClose);

    if (!imageKey || !this.scene.textures.exists(imageKey)) {
      return;
    }

    const image = this.scene.add.image(GAME_WIDTH / 2, 342, imageKey).setDepth(71);
    const source = this.scene.textures.get(imageKey).getSourceImage();
    const scale = Math.min(274 / source.width, 176 / source.height);
    image.setScale(scale);
    this.mediaObject = image;
    this.container.bringToTop(this.close);
    this.container.bringToTop(this.closeText);
    this.container.add(image);
    this.container.bringToTop(this.body);
    this.container.bringToTop(this.close);
    this.container.bringToTop(this.closeText);
  }
}
