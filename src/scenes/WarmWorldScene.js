import { gameState } from '../state/GameState.js';
import { StorySceneBase } from './StorySceneBase.js';

const feelingLine = {
  tenang: 'Di sini, Adek boleh pelan-pelan. Tidak ada yang mengejar.',
  kuat: 'Adek sudah kuat terlalu lama. Di sini, Akak yang temani dulu.',
  bahagia: 'Kalau bahagia terasa jauh, kita cari dari hal kecil dulu.',
  dicintai: 'Adek tidak perlu menang dulu untuk dicintai.'
};

export class WarmWorldScene extends StorySceneBase {
  constructor() {
    super('WarmWorldScene');
    this.ambience = 'dark';
  }

  create() {
    this.setupStoryScene(this.backgrounds.lanternNight.key, {
      overlayAlpha: 0.16,
      title: 'Dunia Hangat'
    });
    this.addCharacter('Adek', 112, 626, { height: 112, enterFrom: 'left' });

    this.time.delayedCall(1200, () => {
      this.dialogBox.play(
        [
          {
            speaker: 'Adek',
            text: 'Tempat ini... beda sekali. Tidak ada suara jam. Tidak ada layar yang menilai.'
          },
          {
            speaker: 'Adek',
            text: 'Tapi kenapa dada Adek masih terasa berat? Adek sudah keluar dari bioskop itu, tapi kata gagal masih ikut.'
          }
        ],
        () => this.bringAkakIn()
      );
    });
  }

  bringAkakIn() {
    this.addCharacter('Akak', 274, 626, { height: 128, enterFrom: 'right' });

    this.time.delayedCall(1600, () => {
      this.dialogBox.play(
        [
        {
          speaker: 'Akak',
          text: 'Hai, Adek. Akak di sini.'
        },
        {
          speaker: 'Adek',
          text: 'Akak... Adek gagal. Kenangannya terkunci. Adek sudah coba, tapi tetap terlambat.'
        },
        {
          speaker: 'Akak',
          text: 'Akak lihat Adek sudah berusaha. Kalau tempat itu cuma membuat Adek merasa gagal dan sakit, ayo kita pergi dari sana.'
        },
        {
          speaker: 'Adek',
          text: 'Tapi kenangannya terkunci. Kalau Adek pergi, bukannya berarti Adek menyerah?'
        },
        {
          speaker: 'Akak',
          text: feelingLine[gameState.selectedFeeling] ?? 'Adek tidak perlu membuktikan apa-apa di sini.'
        },
        {
          speaker: 'Akak',
          text: 'Bukan menyerah. Kadang kita pergi bukan karena kalah, tapi karena hati kita tidak pantas terus disakiti di tempat yang sama.'
        },
        {
          speaker: 'Adek',
          text: 'Akak tidak kecewa karena Adek gagal?'
        },
        {
          speaker: 'Akak',
          text: 'Tidak. Akak lebih sedih kalau Adek percaya bahwa gagal membuat Adek tidak layak disayangi.'
        },
        {
          speaker: 'Akak',
          text: 'Akak mau ajak Adek ke tempat yang lebih hangat. Tidak ada syarat, tidak ada hukuman, dan tidak ada jam yang memaksa Adek.'
        },
        {
          speaker: 'Adek',
          text: 'Ke mana, Kak?'
        },
        {
          speaker: 'Akak',
          text: 'Ke bioskop kecil di bawah langit. Di sana, Adek cukup duduk dan lihat hadiah yang sudah menunggu.'
        }
      ],
      () => this.showContinueButton(
        'Ikut Akak',
        () => this.transitionTo(
          'EndingScene',
          'Adek berjalan bersama Akak,\nmeninggalkan suara jam yang perlahan hilang.\nDi ujung jalan, sebuah bioskop kecil menyala di bawah langit.',
          { exitCharacters: ['Akak'] }
        )
      )
      );
    });
  }
}
