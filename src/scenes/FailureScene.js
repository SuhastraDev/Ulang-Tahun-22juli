import { StorySceneBase } from './StorySceneBase.js';

export class FailureScene extends StorySceneBase {
  constructor() {
    super('FailureScene');
    this.ambience = 'dark';
  }

  create() {
    this.setupStoryScene(this.backgrounds.oldCinema.key, {
      overlayAlpha: 0.64,
      title: 'Pintu Terakhir'
    });
    this.addCharacter('Adek', 112, 584, { height: 112, enterFrom: 'left' });
    this.addCharacter('Penjaga Waktu', 274, 584, { height: 132 });

    this.time.delayedCall(1200, () => {
      this.dialogBox.play(
        [
          {
            speaker: 'Penjaga Waktu',
            text: 'Kita bertemu lagi, Adek. Semua jalan akhirnya kembali ke pintu terakhir.'
          },
          {
            speaker: 'Adek',
            text: 'Aku sudah membawa tiga kunci. Aku sudah melewati semuanya. Aku butuh membuka layar kenangan itu.'
          },
          {
            speaker: 'Penjaga Waktu',
            text: 'Tiga kunci memang sudah terkumpul. Tapi pintu terakhir hanya terbuka untuk yang tidak terlambat, tidak ragu, dan tidak lemah.'
          },
          {
            speaker: 'Adek',
            text: 'Aku sudah berusaha. Aku cuma butuh sedikit waktu lagi. Jangan kunci semuanya sekarang.'
          },
          {
            speaker: 'Penjaga Waktu',
            text: 'Waktu tidak memberi sedikit pun kepada yang ragu.'
          }
        ],
        () => this.startFinalTimer()
      );
    });
  }

  startFinalTimer() {
    this.timerBar.start(4, () => {
      this.dialogBox.play(
        [
          {
            speaker: 'Penjaga Waktu',
            text: 'Terlambat. Kenangan itu terkunci.'
          },
          {
            speaker: 'Adek',
            text: 'Jadi semuanya... gagal?'
          },
          {
            speaker: 'Penjaga Waktu',
            text: 'Pergilah. Tidak ada lagi yang bisa Adek buka di sini.'
          },
          {
            speaker: 'Adek',
            text: 'Aku tidak tahu harus ke mana...'
          }
        ],
        () => this.showAdekAlone()
      );
    });
  }

  showAdekAlone() {
    this.characters['Penjaga Waktu']?.fadeOut(() => {
      delete this.characters['Penjaga Waktu'];
      this.dialogBox.play(
        [
          {
            speaker: 'Adek',
            text: 'Sepi sekali... tadi semuanya terasa hampir berhasil.'
          },
          {
            speaker: 'Adek',
            text: 'Aku sudah mencoba memilih yang benar, mencari kunci, dan tetap berjalan. Tapi tetap saja aku terlambat.'
          },
          {
            speaker: 'Adek',
            text: 'Mungkin benar kata Penjaga Waktu. Mungkin aku memang tidak cukup cepat. Mungkin hadiah itu bukan untukku.'
          },
          {
            speaker: 'Adek',
            text: 'Padahal aku cuma ingin melihat kenangan itu sebentar saja... cuma ingin merasa hari ini benar-benar untukku.'
          }
        ],
        () => this.transitionTo('WarmWorldScene', 'Bioskop menjadi gelap sepenuhnya.\nDi tengah sunyi itu,\nsebuah pintu hangat terbuka pelan.')
      );
    });
  }
}
