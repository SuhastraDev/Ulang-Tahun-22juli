import { AudioManager } from '../audio/AudioManager.js';
import { GAME_WIDTH, colorText, palette } from '../data/gameConfig.js';
import { characterAssets } from '../data/assets.js';

const characterColors = {
  Adek: {
    hair: 0x17111f,
    face: 0xffd6bd,
    outfit: palette.softRose,
    accent: palette.gentleCream
  },
  Akak: {
    hair: 0x151824,
    face: 0xd8a57f,
    outfit: palette.calmBlue,
    accent: palette.warmLantern
  },
  'Mba Ana': {
    hair: 0x24182a,
    face: 0xf0bf9b,
    outfit: 0x7f5fba,
    accent: palette.gentleCream
  },
  'Yuk Ulan': {
    hair: 0x1b1725,
    face: 0xf0c3a5,
    outfit: 0x5f8bc6,
    accent: palette.softRose
  },
  Jihan: {
    hair: 0x3a2536,
    face: 0xffd2a7,
    outfit: 0xf3a950,
    accent: palette.successMint
  },
  'Penjaga Waktu': {
    hair: 0x0a0c15,
    face: 0xaeb6d6,
    outfit: 0x22273b,
    accent: palette.duskLavender
  }
};

export class PixelCharacter {
  constructor(scene, { name, x, y, scale = 1, depth = 18, label = true, height = 82, enterFrom = null }) {
    this.scene = scene;
    this.name = name;
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.depth = depth;
    this.height = height;
    this.audio = new AudioManager(scene);
    this.colors = characterColors[name] ?? characterColors.Adek;
    const startX = enterFrom === 'left' ? -90 : enterFrom === 'right' ? GAME_WIDTH + 90 : x;
    this.container = scene.add.container(startX, y).setDepth(depth);
    this.draw(label);

    if (enterFrom) {
      this.moveTo(x, 1500);
    }
  }

  draw(showLabel) {
    const textureKey = characterAssets[this.name]?.key;
    const hasTexture = textureKey && this.scene.textures.exists(textureKey);

    if (hasTexture) {
      const image = this.scene.add.image(0, 0, textureKey).setOrigin(0.5, 1);
      image.displayHeight = this.height * this.scale;
      image.scaleX = image.scaleY;
      this.container.add(image);
    } else {
      this.drawFallbackCharacter();
    }

    if (showLabel) {
      const label = this.scene.add
        .text(0, 12, this.name, {
          fontFamily: 'monospace',
          fontSize: `${Math.max(9, Math.round(10 * this.scale))}px`,
          color: colorText.gentleCream,
          backgroundColor: '#0f1220aa',
          padding: { left: 4, right: 4, top: 2, bottom: 2 }
        })
        .setOrigin(0.5);
      this.container.add(label);
    }

    this.bobTween = this.scene.tweens.add({
      targets: this.container,
      y: this.y - 3,
      duration: 1300 + this.x,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  drawFallbackCharacter() {
    const g = this.scene.add.graphics();
    const s = this.scale;
    const c = this.colors;

    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(0, 48 * s, 42 * s, 10 * s);

    g.fillStyle(c.outfit, 1);
    g.fillRect(-14 * s, 12 * s, 28 * s, 34 * s);
    g.fillStyle(c.accent, 1);
    g.fillRect(-10 * s, 20 * s, 20 * s, 5 * s);

    g.fillStyle(c.face, 1);
    g.fillRect(-12 * s, -16 * s, 24 * s, 26 * s);
    g.fillStyle(c.hair, 1);
    g.fillRect(-14 * s, -22 * s, 28 * s, 10 * s);
    g.fillRect(-14 * s, -12 * s, 6 * s, 16 * s);
    g.fillRect(8 * s, -12 * s, 6 * s, 16 * s);

    g.fillStyle(0x111111, 1);
    g.fillRect(-6 * s, -4 * s, 3 * s, 3 * s);
    g.fillRect(4 * s, -4 * s, 3 * s, 3 * s);
    g.fillStyle(c.accent, 1);
    g.fillRect(-4 * s, 5 * s, 8 * s, 2 * s);

    g.fillStyle(c.outfit, 1);
    g.fillRect(-20 * s, 16 * s, 7 * s, 23 * s);
    g.fillRect(13 * s, 16 * s, 7 * s, 23 * s);
    g.fillStyle(0x17111f, 1);
    g.fillRect(-11 * s, 46 * s, 8 * s, 10 * s);
    g.fillRect(3 * s, 46 * s, 8 * s, 10 * s);

    this.container.add(g);
  }

  getDialogAnchor() {
    return {
      x: this.container.x,
      y: this.container.y - this.height * this.scale
    };
  }

  moveTo(x, duration = 700, onComplete) {
    this.x = x;
    this.audio.playSfx('walk', { volume: 0.22 });
    this.scene.tweens.add({
      targets: this.container,
      x,
      duration,
      ease: 'Sine.easeInOut',
      onComplete
    });
  }

  exit(direction = 'right', onComplete) {
    const targetX = direction === 'left' ? -110 : GAME_WIDTH + 110;
    this.moveTo(targetX, 1500, onComplete);
  }

  focus() {
    this.scene.tweens.add({
      targets: this.container,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 140,
      yoyo: true,
      ease: 'Sine.easeOut'
    });
  }

  fadeOut(onComplete) {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 520,
      ease: 'Sine.easeInOut',
      onComplete
    });
  }
}
