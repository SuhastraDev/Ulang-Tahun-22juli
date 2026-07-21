import { gameState } from '../state/GameState.js';
import { realMediaAssets } from '../data/assets.js';
import { StorySceneBase } from './StorySceneBase.js';

export class PlayScene extends StorySceneBase {
  constructor() {
    super('PlayScene');
    this.ambience = 'dark';
  }

  create() {
    this.setupStoryScene(this.backgrounds.birthdayRoom.key, {
      overlayAlpha: 0.18,
      title: 'Lorong Permainan'
    });
    this.addCharacter('Adek', 112, 620, { height: 112, enterFrom: 'left' });
    this.addCharacter('Jihan', 270, 624, { height: 96 });

    this.time.delayedCall(1200, () => {
      this.dialogBox.play(
        [
          {
            speaker: 'Jihan',
            text: 'Hai, Nte Ani. Jihan tunggu dari tadi. Nte jalannya kelihatan buru-buru sekali.'
          },
          {
            speaker: 'Adek',
            text: 'Hai, Jihan. Nte butuh satu kunci lagi, tapi waktunya makin sedikit. Nte takut semua yang sudah dikumpulkan jadi sia-sia.'
          },
          {
            speaker: 'Jihan',
            text: 'Aku sembunyikan satu kunci di balon. Tapi Nte jangan tegang ya. Kalau tegang, balonnya juga ikut takut.'
          },
          {
            speaker: 'Adek',
            text: 'Nte coba cari. Semoga belum terlambat.'
          },
          {
            speaker: 'Jihan',
            text: 'Kalau Nte salah pilih juga tidak apa-apa. Permainan itu buat dicoba, bukan buat bikin Nte takut.'
          },
          {
            speaker: 'Adek',
            text: 'Jihan kecil, tapi ngomongnya kadang bikin Nte ingat hal penting.'
          },
          {
            speaker: 'Jihan',
            text: 'Soalnya Nte sering mikir berat. Jihan cuma mau Nte senyum sedikit sebelum lanjut.'
          }
        ],
        () => this.showBalloonPuzzle()
      );
    });
  }

  showBalloonPuzzle() {
    this.choiceMenu.show(
      'Balon mana yang menyimpan kunci kecil dari Jihan?',
      [
        { id: 'pink', label: 'Balon merah muda', icon: 'balloon' },
        { id: 'gold', label: 'Balon kuning hangat', icon: 'balloon' },
        { id: 'blue', label: 'Balon biru malam', icon: 'balloon' }
      ],
      () => {
        gameState.addKey('Ceria');
        gameState.unlockMedia('play-01');
        this.inventoryHud.render();
        const media = realMediaAssets.images[7];
        this.mediaUnlock.showImage(
          {
            title: 'Kunci Ceria',
            body: media.caption,
            imageKey: media.key
          },
          () => this.dialogBox.play(
            [
              {
                speaker: 'Jihan',
                text: 'Nte Ani, kuncinya sudah lengkap. Tapi Jihan lihat jam di ujung lorong makin cepat jalannya.'
              },
              {
                speaker: 'Adek',
                text: 'Makasih, Jihan. Nte harus cepat ke pintu terakhir sebelum waktunya habis, walaupun rasanya mulai takut.'
              },
              {
                speaker: 'Jihan',
                text: 'Nte hati-hati, ya. Jalan setelah ini kelihatan gelap, tapi Nte sudah bawa semua kunci.'
              },
              {
                speaker: 'Jihan',
                text: 'Kalau nanti Nte sedih, jangan lupa Jihan tadi sudah bantu Nte. Berarti Nte tidak benar-benar sendirian.'
              },
              {
                speaker: 'Adek',
                text: 'Makasih, Jihan. Nte akan ingat. Kalau nanti takut, Nte coba ingat suara balon dan tawa kecil di sini.'
              }
            ],
            () => this.transitionTo(
              'FailureScene',
              'Dengan tiga kunci di tangan,\nAdek berjalan menuju pintu terakhir.\nSuasana yang tadi hangat mulai meredup.'
            )
          )
        );
      }
    );
  }
}
