import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = 'C:\\Users\\ayush\\OneDrive\\Desktop\\Ayush\\Client Project\\Vishwakalpa\\Data\\Client Logos';
const OUTPUT_DIR = join(__dirname, '..', 'public', 'images', 'clients');

const CLIENT_MAPPING = [
  {
    src: 'Screen_20Shot_202021-08-05_20at_207.02.56_20PM.png',
    slug: 'reliance-industries',
    name: 'Reliance Industries Limited',
    maxH: 70,
  },
  {
    src: 'itc-limited-logo-png-transparent.png',
    slug: 'itc-limited',
    name: 'ITC Limited',
    maxH: 64,
  },
  {
    src: 'AIAENG.NS_BIG-92d05de6.png',
    slug: 'aia-engineering',
    name: 'AIA Engineering Limited',
    maxH: 64,
  },
  {
    src: 'gmr-group2964.jpg',
    slug: 'gmr-group',
    name: 'GMR Group',
    maxH: 52,
  },
  {
    src: 'indorama-ventures-logo-png_seeklogo-461484.png',
    slug: 'indorama-ventures',
    name: 'Indorama Ventures',
    maxH: 56,
  },
  {
    src: 'images.png',
    slug: 'precision-group',
    name: 'Precision Group',
    maxH: 64,
  },
  {
    src: 'client10.png',
    slug: 'neosym',
    name: 'Neosym Industry Limited',
    maxH: 48,
  },
  {
    src: 'Srichakra1.png',
    slug: 'srichakra-polyplast',
    name: 'Srichakra Polyplast',
    maxH: 56,
  },
  {
    src: 'techinventor.jpg',
    slug: 'techinvention',
    name: 'TechInvention Lifecare',
    maxH: 56,
  },
  {
    src: 'ChatGPT Image Sep 22_ 2026_ 01_18_25 PM.png',
    slug: 'kanidi-biotech',
    name: 'Kanidi Biotech',
    maxH: 58,
  },
  {
    src: 'Kwality Logo - White English-01.png',
    slug: 'kwality',
    name: 'Kwality',
    maxH: 60,
  },
  {
    src: 'MS.png',
    slug: 'ms-engineering',
    name: 'MS Engineering & Consultants',
    maxH: 52,
  },
];

async function processLogos() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log(`Processing ${CLIENT_MAPPING.length} client logos...`);

  for (const item of CLIENT_MAPPING) {
    const inputPath = join(SOURCE_DIR, item.src);
    const outputWebp = join(OUTPUT_DIR, `${item.slug}.webp`);
    const outputPng = join(OUTPUT_DIR, `${item.slug}.png`);

    try {
      // 1. Trim surrounding whitespace
      const trimmed = sharp(inputPath).trim();

      // 2. Generate webp (height constrained for uniform optical rhythm, high DPI)
      // Scale up to 2x target maxH for high-density displays (e.g. 2x @ 60px = 120px)
      const targetHeight = (item.maxH || 60) * 2;

      await trimmed
        .clone()
        .resize({
          height: targetHeight,
          fit: 'inside',
          withoutEnlargement: false,
        })
        .webp({ quality: 90 })
        .toFile(outputWebp);

      await trimmed
        .clone()
        .resize({
          height: targetHeight,
          fit: 'inside',
          withoutEnlargement: false,
        })
        .png({ quality: 90, compressionLevel: 8 })
        .toFile(outputPng);

      const metadata = await sharp(outputWebp).metadata();
      console.log(`✓ ${item.name} -> ${item.slug}.webp (${metadata.width}x${metadata.height}, ${metadata.format})`);
    } catch (err) {
      console.error(`✗ Error processing ${item.name}:`, err);
    }
  }
  console.log('All client logos processed successfully!');
}

processLogos();
