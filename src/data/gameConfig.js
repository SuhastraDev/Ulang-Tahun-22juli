import Phaser from 'phaser';

export const GAME_WIDTH = 390;
export const GAME_HEIGHT = 844;

export const gameScaleConfig = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: GAME_WIDTH,
  height: GAME_HEIGHT
};

export const palette = {
  cinemaNavy: 0x141827,
  shadowPlum: 0x2c2038,
  duskLavender: 0x8d83c9,
  warmLantern: 0xf6c76f,
  softRose: 0xefa5b8,
  gentleCream: 0xfff1d6,
  ink: 0x0f1220,
  calmBlue: 0x273a59,
  successMint: 0x9ee6c9,
  dangerRed: 0xc85b6a
};

export const colorText = {
  cinemaNavy: '#141827',
  shadowPlum: '#2c2038',
  duskLavender: '#8d83c9',
  warmLantern: '#f6c76f',
  softRose: '#efa5b8',
  gentleCream: '#fff1d6',
  calmBlue: '#273a59',
  successMint: '#9ee6c9',
  dangerRed: '#c85b6a'
};
