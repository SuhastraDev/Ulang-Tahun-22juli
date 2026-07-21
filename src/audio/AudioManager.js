import { audioAssets } from '../data/assets.js';
import { gameState } from '../state/GameState.js';

export class AudioManager {
  constructor(scene) {
    this.scene = scene;
  }

  unlock(onEnabled) {
    if (this.scene.sound.locked) {
      this.scene.sound.once('unlocked', () => {
        this.enable();
        onEnabled?.();
      });
      this.scene.sound.unlock();
      return;
    }

    this.enable();
    onEnabled?.();
  }

  enable() {
    gameState.audioEnabled = true;
    this.ensureLoops();
  }

  ensureLoops() {
    if (!gameState.audioEnabled) {
      return;
    }

    if (!gameState.music.dark && this.scene.cache.audio.exists(audioAssets.darkAmbience.key)) {
      gameState.music.dark = this.scene.sound.add(audioAssets.darkAmbience.key, {
        loop: true,
        volume: 0.22
      });
    }

    if (!gameState.music.happy && this.scene.cache.audio.exists(audioAssets.happyBirthday.key)) {
      gameState.music.happy = this.scene.sound.add(audioAssets.happyBirthday.key, {
        loop: true,
        volume: 0.34
      });
    }
  }

  playSfx(name, config = {}) {
    if (!gameState.audioEnabled) {
      return;
    }

    const asset = audioAssets[name];
    if (!asset || !this.scene.cache.audio.exists(asset.key)) {
      return;
    }

    this.scene.sound.play(asset.key, {
      volume: config.volume ?? 0.34,
      rate: config.rate ?? 1
    });
  }

  playAmbience(type) {
    if (!gameState.audioEnabled) {
      return;
    }

    this.ensureLoops();
    const dark = gameState.music.dark;
    const happy = gameState.music.happy;

    if (type === 'dark') {
      if (happy?.isPlaying) happy.stop();
      if (dark && !dark.isPlaying) dark.play();
      return;
    }

    if (type === 'happy') {
      if (dark?.isPlaying) dark.stop();
      if (happy && !happy.isPlaying) happy.play();
      return;
    }

    if (type === 'none') {
      if (dark?.isPlaying) dark.stop();
      if (happy?.isPlaying) happy.stop();
    }
  }

  setEnabled(enabled) {
    gameState.audioEnabled = enabled;

    if (!enabled) {
      this.playAmbience('none');
    }
  }
}
