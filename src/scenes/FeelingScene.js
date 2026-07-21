import { gameState } from '../state/GameState.js';
import { realMediaAssets } from '../data/assets.js';
import { StorySceneBase } from './StorySceneBase.js';

export class FeelingScene extends StorySceneBase {
  constructor() {
    super('FeelingScene');
    this.ambience = 'dark';
  }

  create() {
    this.setupStoryScene(this.backgrounds.dreamyGarden.key, {
      overlayAlpha: 0.2,
      title: 'Ruang Rasa'
    });
    this.addCharacter('Adek', 112, 610, { height: 112, enterFrom: 'left' });
    this.addCharacter('Yuk Ulan', 274, 610, { height: 126 });

    this.time.delayedCall(1200, () => {
      this.dialogBox.play(
        [
          {
            speaker: 'Yuk Ulan',
            text: 'Hai, Adek. Napas dulu sebentar, di sini tidak perlu buru-buru. Ruang ini tidak akan memaksa Adek berlari.'
          },
          {
            speaker: 'Adek',
            text: 'Hai, Yuk Ulan. Adek butuh satu rasa yang bisa dibawa untuk membuka jalan berikutnya. Tapi Adek bingung harus memilih apa.'
          },
          {
            speaker: 'Yuk Ulan',
            text: 'Tidak semua teka-teki dijawab dengan cepat. Ada yang dijawab dengan hati pelan-pelan, terutama saat hati sedang takut terlambat.'
          },
          {
            speaker: 'Adek',
            text: 'Kalau aku boleh membawa satu rasa untuk tahun ini, aku ingin memilihnya sendiri.'
          },
          {
            speaker: 'Yuk Ulan',
            text: 'Pilih bukan karena harus terlihat kuat di depan orang lain. Pilih karena itu yang paling Adek butuhkan malam ini.'
          },
          {
            speaker: 'Adek',
            text: 'Berarti tidak apa-apa kalau Adek memilih sesuatu yang sederhana?'
          },
          {
            speaker: 'Yuk Ulan',
            text: 'Tidak apa-apa. Kadang yang sederhana justru paling menyelamatkan.'
          }
        ],
        () => this.showFeelingChoice()
      );
    });
  }

  showFeelingChoice() {
    this.choiceMenu.show(
      'Rasa apa yang ingin Adek genggam untuk tahun baru ini?',
      [
        { id: 'tenang', label: 'Tenang', icon: 'spark' },
        { id: 'kuat', label: 'Kuat', icon: 'shield' },
        { id: 'bahagia', label: 'Bahagia', icon: 'smile' },
        { id: 'dicintai', label: 'Dicintai', icon: 'heart' }
      ],
      (choice) => {
        gameState.selectedFeeling = choice.id;
        gameState.addKey('Rasa');
        gameState.unlockMedia('feeling-01');
        this.inventoryHud.render();
        const media = realMediaAssets.images[4];
        this.mediaUnlock.showImage(
          {
            title: 'Rasa Tersimpan',
            body: `${media.caption}\nAdek memilih "${choice.label}".`,
            imageKey: media.key
          },
          () => this.dialogBox.play(
            [
              {
                speaker: 'Yuk Ulan',
                text: 'Rasa itu sudah tersimpan. Kalau nanti Adek merasa gagal, ingat rasa ini dulu sebelum percaya pada suara yang menyakitkan.'
              },
              {
                speaker: 'Adek',
                text: 'Adek akan coba ingat. Kadang Adek terlalu sibuk mengejar semuanya sampai lupa bertanya: sebenarnya Adek butuh apa?'
              },
              {
                speaker: 'Yuk Ulan',
                text: 'Itu sebabnya ruang ini ada. Supaya Adek tidak hanya berlari, tapi juga mendengar diri sendiri sebentar.'
              },
              {
                speaker: 'Adek',
                text: 'Kalau begitu, Adek lanjut ke jalan berikutnya. Masih ada kunci yang belum lengkap.'
              },
              {
                speaker: 'Yuk Ulan',
                text: 'Lanjutlah. Kalau nanti suasananya berubah lebih ramai, jangan biarkan hati Adek ikut berantakan.'
              }
            ],
            () => this.transitionTo(
              'PlayScene',
              'Dari Ruang Rasa,\nAdek mengikuti cahaya kecil.\nDi kejauhan, terdengar suara permainan yang lembut.'
            )
          )
        );
      }
    );
  }
}
