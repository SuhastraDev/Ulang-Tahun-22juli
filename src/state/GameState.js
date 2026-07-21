export class GameState {
  constructor() {
    this.music = {};
    this.audioEnabled = false;
    this.reset();
  }

  reset() {
    this.keys = [];
    this.unlockedMedia = [];
    this.selectedFeeling = null;
  }

  addKey(key) {
    if (!this.keys.includes(key)) {
      this.keys.push(key);
    }
  }

  unlockMedia(mediaId) {
    if (!this.unlockedMedia.includes(mediaId)) {
      this.unlockedMedia.push(mediaId);
    }
  }

  hasKey(key) {
    return this.keys.includes(key);
  }
}

export const gameState = new GameState();
