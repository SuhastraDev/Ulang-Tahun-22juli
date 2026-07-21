import { gameState } from '../state/GameState.js';
import { realMediaAssets } from '../data/assets.js';
import { StorySceneBase } from './StorySceneBase.js';

export class MemoryScene extends StorySceneBase {
  constructor() {
    super('MemoryScene');
    this.ambience = 'dark';
  }

  create() {
    this.setupStoryScene(this.backgrounds.memoryRoom.key, {
      overlayAlpha: 0.28,
      title: 'Ruang Ingatan'
    });
    this.addCharacter('Adek', 112, 596, { height: 112, enterFrom: 'left' });
    this.addCharacter('Mba Ana', 272, 596, { height: 124 });

    this.time.delayedCall(1200, () => {
      this.dialogBox.play(
        [
          {
            speaker: 'Mba Ana',
            text: 'Hai, Adek. Akhirnya sampai juga di ruang ini. Pelan-pelan, ya.'
          },
          {
            speaker: 'Adek',
            text: 'Hai, Mba Ana. Adek lagi butuh kunci kenangan sebelum waktunya habis. Di bioskop tadi, semuanya terasa menekan.'
          },
          {
            speaker: 'Mba Ana',
            text: 'Ruang ini menyimpan momen yang hampir hilang dari layar bioskop. Bukan momen besar saja, tapi hal kecil yang pernah membuat Adek merasa aman.'
          },
          {
            speaker: 'Adek',
            text: 'Kalau aku salah memilih, kenangannya ikut hilang?'
          },
          {
            speaker: 'Mba Ana',
            text: 'Tidak. Kenangan baik tidak semudah itu hilang. Pilih yang terasa paling seperti pulang.'
          },
          {
            speaker: 'Adek',
            text: 'Adek kangen rasanya bisa merasa aman tanpa takut dikejar apa pun.'
          },
          {
            speaker: 'Mba Ana',
            text: 'Kalau begitu, jangan pilih dengan panik. Dengarkan mana yang membuat dada Adek sedikit lebih ringan.'
          }
        ],
        () => this.showMemoryPuzzle()
      );
    });
  }

  showMemoryPuzzle() {
    this.choiceMenu.show(
      'Kotak mana yang ingin Adek buka dulu?',
      [
        { id: 'rumah', label: 'Kotak foto hangat', icon: 'photo' },
        { id: 'senyum', label: 'Kotak suara tawa', icon: 'sound' },
        { id: 'rahasia', label: 'Kotak cahaya kecil', icon: 'spark' }
      ],
      () => {
        gameState.addKey('Ingatan');
        gameState.unlockMedia('memory-01');
        this.inventoryHud.render();
        const media = realMediaAssets.images[0];
        this.mediaUnlock.showImage(
          {
            title: 'Kenangan Pertama',
            body: media.caption,
            imageKey: media.key
          },
          () => this.dialogBox.play(
            [
              {
                speaker: 'Mba Ana',
                text: 'Kunci ingatan sudah Adek pegang. Simpan baik-baik, karena nanti saat Adek merasa runtuh, kenangan ini akan mengingatkan bahwa Adek pernah bahagia.'
              },
              {
                speaker: 'Adek',
                text: 'Adek akan simpan. Rasanya aneh, ya, satu kenangan kecil bisa bikin Adek tidak terlalu takut.'
              },
              {
                speaker: 'Mba Ana',
                text: 'Karena kenangan kecil sering jadi pegangan saat jalan di depan terasa gelap.'
              },
              {
                speaker: 'Adek',
                text: 'Berarti Adek lanjut saja mengikuti jalan berikutnya?'
              },
              {
                speaker: 'Mba Ana',
                text: 'Iya. Ikuti cahaya yang pelan. Jangan ikuti suara yang membuat Adek takut.'
              }
            ],
            () => this.transitionTo(
              'FeelingScene',
              'Adek keluar dari Ruang Ingatan.\nDi tangannya, kunci pertama berpendar pelan.\nJalan berikutnya terasa lebih sunyi.'
            )
          )
        );
      }
    );
  }
}
