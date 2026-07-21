import { GAME_HEIGHT, GAME_WIDTH, colorText, palette } from '../data/gameConfig.js';
import { realMediaAssets } from '../data/assets.js';
import { StorySceneBase } from './StorySceneBase.js';

export class EndingScene extends StorySceneBase {
  constructor() {
    super('EndingScene');
    this.ambience = 'happy';
  }

  create() {
    this.setupStoryScene(this.backgrounds.cinemaExterior.key, {
      overlayAlpha: 0.1,
      title: 'Bioskop Langit'
    });
    this.addCharacter('Adek', 84, 642, { height: 96, enterFrom: 'left' });
    this.addCharacter('Akak', 166, 642, { height: 108 });
    this.addCharacter('Mba Ana', 256, 650, { height: 86 });
    this.addCharacter('Yuk Ulan', 324, 650, { height: 86 });
    this.addCharacter('Jihan', 34, 658, { height: 68 });
    this.drawCinemaScreen();

    this.time.delayedCall(1200, () => {
      this.dialogBox.play(
        [
          {
            speaker: 'Akak',
            text: 'Adek, lihat layarnya. Hadiahnya tidak pernah hilang. Ia cuma menunggu di tempat yang tidak dijaga oleh rasa takut.'
          },
          {
            speaker: 'Akak',
            text: 'Selamat ulang tahun, Adek. Bahkan saat Adek merasa gagal, Adek tetap sangat berarti untuk Akak.'
          },
          {
            speaker: 'Adek',
            text: 'Jadi semua ini memang disiapkan untuk Adek?'
          },
          {
            speaker: 'Akak',
            text: 'Iya. Bukan karena Adek berhasil tepat waktu, tapi karena Adek memang pantas dirayakan.'
          },
          {
            speaker: 'Akak',
            text: 'Hari ini Adek tidak perlu membuktikan apa pun. Cukup duduk di sini, lihat semua kenangan ini, dan tahu bahwa Adek disayangi.'
          },
          {
            speaker: 'Adek',
            text: 'Adek kira karena gagal, semuanya akan hilang. Tapi ternyata masih ada yang menunggu Adek di sini.'
          },
          {
            speaker: 'Akak',
            text: 'Terima kasih sudah tetap berjalan sampai hari ini. Akak bersyukur Adek ada.'
          }
        ],
        () => this.showReplay()
      );
    });
  }

  drawCinemaScreen() {
    const frame = this.add.rectangle(GAME_WIDTH / 2, 222, 322, 174, palette.ink, 0.9).setDepth(10);
    frame.setStrokeStyle(3, palette.warmLantern, 0.95);

    this.screenTitle = this.add
      .text(GAME_WIDTH / 2, 126, 'Selamat ulang tahun, Adek', {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: colorText.warmLantern,
        align: 'center',
        wordWrap: { width: 286, useAdvancedWrap: true }
      })
      .setOrigin(0.5)
      .setDepth(11);

    this.caption = this.add
      .text(GAME_WIDTH / 2, 315, '', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: colorText.gentleCream,
        align: 'center',
        lineSpacing: 6,
        wordWrap: { width: 292, useAdvancedWrap: true }
      })
      .setOrigin(0.5)
      .setDepth(11);

    this.videoButton = this.add.rectangle(GAME_WIDTH / 2, 360, 156, 34, palette.warmLantern, 0.94).setDepth(12);
    this.videoButton.setInteractive({ useHandCursor: true });
    this.videoLabel = this.add
      .text(GAME_WIDTH / 2, 360, 'Putar Video', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: colorText.cinemaNavy
      })
      .setOrigin(0.5)
      .setDepth(13);
    this.videoButton.on('pointerdown', () => this.playNextVideo());

    this.photoIndex = 0;
    this.videoIndex = 0;
    this.showPhoto(0);
    this.time.addEvent({
      delay: 2800,
      loop: true,
      callback: () => {
        if (this.isVideoPlaying) {
          return;
        }

        this.photoIndex = (this.photoIndex + 1) % realMediaAssets.images.length;
        this.showPhoto(this.photoIndex);
      }
    });
  }

  clearScreenMedia() {
    this.screenMedia?.destroy();
    this.screenMedia = null;
  }

  showPhoto(index) {
    const media = realMediaAssets.images[index];
    if (!media || !this.textures.exists(media.key)) {
      return;
    }

    this.isVideoPlaying = false;
    this.clearScreenMedia();

    const image = this.add.image(GAME_WIDTH / 2, 222, media.key).setDepth(11);
    const source = this.textures.get(media.key).getSourceImage();
    const scale = Math.min(292 / source.width, 148 / source.height);
    image.setScale(scale);
    image.setAlpha(0);
    this.tweens.add({
      targets: image,
      alpha: 1,
      duration: 450,
      ease: 'Sine.easeInOut'
    });

    this.screenMedia = image;
    this.caption.setText(media.caption);
  }

  playNextVideo() {
    const media = realMediaAssets.videos[this.videoIndex % realMediaAssets.videos.length];
    this.videoIndex += 1;

    if (!media || !this.cache.video.exists(media.key)) {
      return;
    }

    this.clearScreenMedia();
    this.isVideoPlaying = true;
    const video = this.add.video(GAME_WIDTH / 2, 222, media.key).setDepth(11);
    video.setDisplaySize(292, 148);
    video.play(false);
    video.once('complete', () => {
      this.isVideoPlaying = false;
      this.showPhoto(this.photoIndex);
    });
    this.screenMedia = video;
    this.caption.setText(media.caption);
  }

  showReplay() {
    this.showContinueButton(
      'Main Ulang',
      () => this.transitionTo('OpeningScene', 'Kenangan kembali ke awal,\nsiap diputar lagi dari Bioskop Kenangan.')
    );
  }
}
