import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function listMedia(file) {
  const filePath = `./${file}`;
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  const buf = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  console.log(`\n=========================================`);
  console.log(`Media in ${file}:`);
  console.log(`=========================================`);
  const mediaFiles = [];
  zip.forEach((relPath, entry) => {
    if (relPath.includes('media/')) {
      mediaFiles.push({
        path: relPath,
        size: entry._data.uncompressedSize
      });
    }
  });
  mediaFiles.sort((a, b) => a.path.localeCompare(b.path));
  for (const f of mediaFiles) {
    console.log(`  ${f.path} - ${f.size} bytes`);
  }
}

async function main() {
  await listMedia('BÀI 1 LUONG.docx');
  await listMedia('BÀI 3 LUONG.docx');
}

main().catch(console.error);
