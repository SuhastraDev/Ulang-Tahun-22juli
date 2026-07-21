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

export class OpeningScene extends Phaser.Scene {
  constructor() {
    super('OpeningScene');
  }

  create() {
    gameState.reset();
    this.characters = {};
    this.audio = new AudioManager(this);
    this.cameras.main.setBackgroundColor(palette.cinemaNavy);
    this.cameras.main.fadeIn(420, 5, 7, 17);
    this.drawCinema();
    this.drawCharacters();
    this.inventoryHud = new InventoryHud(this, gameState);
    this.audioToggle = new AudioToggle(this, gameState);
    this.dialogBox = new DialogBox(this);
    this.choiceMenu = new ChoiceMenu(this);
    this.timerBar = new TimerBar(this);
    this.mediaUnlock = new MediaUnlock(this);
    this.introCopy = this.drawIntroCopy();
    this.drawStartButton();
  }

  update(time, delta) {
    this.timerBar?.update(time, delta);
  }

  drawCinema() {
    this.drawCoverBackground(backgroundAssets.oldCinema.key);

    const graphics = this.add.graphics();
    graphics.fillStyle(0x070914, 0.48);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    graphics.fillGradientStyle(0x050711, 0x050711, 0x141827, 0x141827, 0.1, 0.1, 0.9, 0.9);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  drawCoverBackground(textureKey) {
    const image = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, textureKey).setDepth(0);
    const source = this.textures.get(textureKey).getSourceImage();
    const scale = Math.max(GAME_WIDTH / source.width, GAME_HEIGHT / source.height);
    image.setScale(scale);
  }

  drawCharacters() {
    this.characters['Penjaga Waktu'] = new PixelCharacter(this, {
      name: 'Penjaga Waktu',
      x: 258,
      y: 456,
      scale: 1,
      height: 108,
      depth: 22
    });

    this.characters.Adek = new PixelCharacter(this, {
      name: 'Adek',
      x: 126,
      y: 456,
      scale: 1,
      height: 84,
      depth: 28
    });
  }

  getSpeakerAnchor(speaker) {
    return this.characters?.[speaker]?.getDialogAnchor();
  }

  focusSpeaker(speaker) {
    this.characters?.[speaker]?.focus();
  }

  drawIntroCopy() {
    const title = this.add
      .text(GAME_WIDTH / 2, 626, 'Ada undangan untuk Adek.', {
        fontFamily: 'monospace',
        fontSize: '19px',
        color: colorText.gentleCream,
        align: 'center'
      })
      .setOrigin(0.5);

    const subtitle = this.add
      .text(GAME_WIDTH / 2, 660, 'Bioskop Kenangan sudah terbuka,\ntapi waktunya tidak menunggu lama.', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#c9c0e8',
        align: 'center',
        lineSpacing: 7
      })
      .setOrigin(0.5);

    return [title, subtitle];
  }

  drawStartButton() {
    const button = this.add
      .rectangle(GAME_WIDTH / 2, 742, 238, 48, palette.warmLantern)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    const label = this.add
      .text(GAME_WIDTH / 2, 742, 'Mulai Perjalanan', {
        fontFamily: 'monospace',
        fontSize: '15px',
        color: '#141827'
      })
      .setOrigin(0.5);

    button.on('pointerdown', () => {
      this.audio.unlock();
      this.time.delayedCall(100, () => this.audio.playAmbience('dark'));
      button.destroy();
      label.destroy();
      this.introCopy?.forEach((node) => node.destroy());
      this.startPhaseTwoDemo();
    });
  }

  startPhaseTwoDemo() {
    this.dialogBox.play(
      [
        {
          speaker: 'Penjaga Waktu',
          text: 'Hai, Adek. Selamat datang di Bioskop Kenangan, tempat semua yang pernah disimpan akan diuji oleh waktu.'
        },
        {
          speaker: 'Penjaga Waktu',
          text: 'Di balik layar ini ada foto, video, dan pesan yang seharusnya menjadi hadiah untuk hari ini.'
        },
        {
          speaker: 'Penjaga Waktu',
          text: 'Tapi hanya yang tepat waktu boleh membukanya. Yang terlambat akan kehilangan hak untuk melihatnya.'
        },
        {
          speaker: 'Adek',
          text: 'Itu hadiah untukku? Kalau aku ingin melihat isinya, apa yang harus kulakukan?'
        },
        {
          speaker: 'Penjaga Waktu',
          text: 'Kumpulkan tiga kunci: ingatan, rasa, dan ceria. Setelah kunci lengkap, waktu terakhir akan berjalan.'
        },
        {
          speaker: 'Penjaga Waktu',
          text: 'Mulailah dari Ruang Ingatan. Di sana, seseorang menunggu Adek dengan kunci pertama dan potongan kenangan yang belum padam.'
        },
        {
          speaker: 'Adek',
          text: 'Baik. Aku akan ke sana.'
        }
      ],
      () => this.transitionTo('MemoryScene', 'Pintu bioskop terbuka pelan.\nAdek melangkah menuju ruang pertama: Ruang Ingatan.')
    );
  }

  transitionTo(sceneKey, message = '') {
    const startBlackout = () => this.playBlackout(sceneKey, message);
    const adek = this.characters?.Adek;

    if (adek) {
      this.dialogBox?.hide();
      adek.exit('right', startBlackout);
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

  showFeelingChoice() {
    this.choiceMenu.show(
      'Untuk tahun baru Adek, rasa apa yang paling ingin Adek genggam dulu?',
      [
        { id: 'tenang', label: 'Tenang' },
        { id: 'kuat', label: 'Kuat' },
        { id: 'bahagia', label: 'Bahagia' },
        { id: 'dicintai', label: 'Dicintai' }
      ],
      (choice) => {
        gameState.selectedFeeling = choice.id;
        gameState.addKey('Rasa');
        this.inventoryHud.render();
        this.mediaUnlock.show(
          {
            title: 'Potongan Media Terbuka',
            body: `Placeholder foto/video: Adek memilih rasa "${choice.label}". Nanti bagian ini bisa diganti media asli.`
          },
          () => this.startTimerDemo()
        );
      }
    );
  }

  startTimerDemo() {
    this.dialogBox.play(
      [
        {
          speaker: 'Penjaga Waktu',
          text: 'Sekarang buktikan bahwa Adek bisa mengejar waktu.'
        },
        {
          speaker: 'Sistem',
          text: 'Timer demo akan berjalan 5 detik. Di cerita final, fase ini menjadi pintu menuju konflik gagal.'
        }
      ],
      () => {
        this.timerBar.start(5, () => this.showTimerResult());
      }
    );
  }

  showTimerResult() {
    this.dialogBox.play([
      {
        speaker: 'Sistem',
        text: 'Timer, pilihan, inventory, media unlock, dan audio toggle sudah aktif untuk Phase 2.'
      }
    ]);
  }
}
