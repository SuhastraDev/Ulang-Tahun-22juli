import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const source = resolve(projectRoot, 'assets');
const target = resolve(projectRoot, 'dist', 'assets');

if (!existsSync(source)) {
  throw new Error(`Assets folder not found: ${source}`);
}

mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

console.log('Copied assets to dist/assets');
