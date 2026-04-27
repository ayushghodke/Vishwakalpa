import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public', 'images');

const targets = [
  { in: 'hero/mmlp-new.png',           webp: 'hero/mmlp-new.webp',           maxW: 1920, q: 80 },
  { in: 'royal_blue_world_map.png',    webp: 'royal_blue_world_map.webp',    maxW: 1600, q: 82 },
  { in: 'Logo.png',                    webp: 'Logo.webp',                    maxW: 256,  q: 92 },
  { in: 'portfolio/portfolio-primary.jpg',                webp: 'portfolio/portfolio-primary.webp',                maxW: 1400, q: 80 },
  { in: 'portfolio/industrial/industry-1.jpg',            webp: 'portfolio/industrial/industry-1.webp',            maxW: 1400, q: 80 },
  { in: 'portfolio/industrial/pharma-2.jpg',              webp: 'portfolio/industrial/pharma-2.webp',              maxW: 1400, q: 80 },
  { in: 'portfolio/industrial/pharma-3.jpg',              webp: 'portfolio/industrial/pharma-3.webp',              maxW: 1400, q: 80 },
  { in: 'portfolio/industrial/pharma-4.jpg',              webp: 'portfolio/industrial/pharma-4.webp',              maxW: 1400, q: 80 },
  { in: 'portfolio/industrial/pharma-5.jpg',              webp: 'portfolio/industrial/pharma-5.webp',              maxW: 1400, q: 80 },
  { in: 'portfolio/industrial/pharma-external.jpg',       webp: 'portfolio/industrial/pharma-external.webp',       maxW: 1400, q: 80 },
  { in: 'portfolio/residential/building-1.jpg',           webp: 'portfolio/residential/building-1.webp',           maxW: 1400, q: 80 },
  { in: 'portfolio/residential/bungalow-concept.jpg',     webp: 'portfolio/residential/bungalow-concept.webp',     maxW: 1400, q: 80 },
  { in: 'portfolio/residential/dallas-1.jpg',             webp: 'portfolio/residential/dallas-1.webp',             maxW: 1400, q: 80 },
  { in: 'portfolio/residential/dallas-2.jpg',             webp: 'portfolio/residential/dallas-2.webp',             maxW: 1400, q: 80 },
  { in: 'portfolio/residential/dallas-3.jpg',             webp: 'portfolio/residential/dallas-3.webp',             maxW: 1400, q: 80 },
  { in: 'portfolio/urban-planning/area-dev-1.jpg',        webp: 'portfolio/urban-planning/area-dev-1.webp',        maxW: 1400, q: 80 },
  { in: 'portfolio/urban-planning/area-dev-2.jpg',        webp: 'portfolio/urban-planning/area-dev-2.webp',        maxW: 1400, q: 80 },
  { in: 'portfolio/urban-planning/area-dev-3.jpg',        webp: 'portfolio/urban-planning/area-dev-3.webp',        maxW: 1400, q: 80 },
  { in: 'portfolio/urban-planning/area-dev-4.jpg',        webp: 'portfolio/urban-planning/area-dev-4.webp',        maxW: 1400, q: 80 },
  { in: 'portfolio/urban-planning/transport-2.jpg',       webp: 'portfolio/urban-planning/transport-2.webp',       maxW: 1400, q: 80 },
  { in: 'portfolio/urban-planning/transport-3.jpg',       webp: 'portfolio/urban-planning/transport-3.webp',       maxW: 1400, q: 80 },
];

const fmt = (n) => (n / 1024).toFixed(1) + ' KB';

let totalIn = 0, totalOut = 0;

for (const t of targets) {
  const src = join(PUBLIC, t.in);
  const dst = join(PUBLIC, t.webp);
  if (!existsSync(src)) {
    console.warn(`SKIP (missing): ${t.in}`);
    continue;
  }
  const inSize = (await stat(src)).size;
  const meta = await sharp(src).metadata();
  let pipeline = sharp(src);
  if (meta.width && meta.width > t.maxW) {
    pipeline = pipeline.resize({ width: t.maxW, withoutEnlargement: true });
  }
  await pipeline.webp({ quality: t.q, effort: 6 }).toFile(dst);
  const outSize = (await stat(dst)).size;
  totalIn += inSize;
  totalOut += outSize;
  console.log(`${t.in.padEnd(55)} ${fmt(inSize).padStart(10)} -> ${fmt(outSize).padStart(10)}  (-${(100 - (outSize / inSize) * 100).toFixed(0)}%)`);
}

const favicon = join(PUBLIC, 'Logo.png');
if (existsSync(favicon)) {
  await sharp(favicon).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 }).toFile(join(PUBLIC, 'favicon-32.png'));
  await sharp(favicon).resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 }).toFile(join(PUBLIC, 'apple-touch-icon.png'));
  console.log('Generated favicon-32.png and apple-touch-icon.png');
}

console.log(`\nTOTAL: ${fmt(totalIn)} -> ${fmt(totalOut)}  (-${(100 - (totalOut / totalIn) * 100).toFixed(0)}%)`);
