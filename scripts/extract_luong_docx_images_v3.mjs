import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  isArray: (name) => ['p', 'r', 't', 'blip', 'imagedata'].includes(name),
});

const docxFiles = [
  { id: 'bt1', name: 'BÀI 1 LUONG.docx', steps: 12 },
  { id: 'bt2', name: 'BÀI 2 LUONG.docx', steps: 5 },
  { id: 'bt3', name: 'BÀI 3 LUONG.docx', steps: 5 },
  { id: 'bt4', name: 'BÀI 4 LUONG.docx', steps: 5 },
  { id: 'bt5', name: 'BÀI 5 LUONG.docx', steps: 6 },
  { id: 'bt6', name: 'BÀI 6 LUONG.docx', steps: 5 },
  { id: 'bt7', name: 'BÀI 7 LUONG.docx', steps: 4 }
];

const workspaceRoot = '.';

function asArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function findRIds(node, relsKeys, out = []) {
  if (node == null) return out;
  if (typeof node === 'string') {
    if (relsKeys.has(node) && !out.includes(node)) {
      out.push(node);
    }
    return out;
  }
  if (Array.isArray(node)) {
    for (const item of node) findRIds(item, relsKeys, out);
    return out;
  }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('@_') && typeof v === 'string') {
        if (relsKeys.has(v) && !out.includes(v)) {
          out.push(v);
        }
      } else {
        findRIds(v, relsKeys, out);
      }
    }
  }
  return out;
}

async function extractDocxImages(fileSpec) {
  const docxPath = path.join(workspaceRoot, fileSpec.name);
  if (!fs.existsSync(docxPath)) {
    console.log(`Skipping ${fileSpec.id} because ${fileSpec.name} not found.`);
    return [];
  }
  
  const buf = fs.readFileSync(docxPath);
  const zip = await JSZip.loadAsync(buf);

  const relsXml = await zip.file('word/_rels/document.xml.rels')?.async('string');
  const rels = new Map();
  if (relsXml) {
    const relsDoc = parser.parse(relsXml);
    for (const rel of asArray(relsDoc?.Relationships?.Relationship)) {
      const id = rel['@_Id'];
      const target = rel['@_Target'];
      if (id && target?.startsWith('media/')) {
        rels.set(id, `word/${target}`);
      }
    }
  }

  const docXml = await zip.file('word/document.xml')?.async('string');
  if (!docXml) {
    console.log(`No document.xml in ${fileSpec.name}`);
    return [];
  }

  const doc = parser.parse(docXml);
  const body = doc?.document?.body ?? doc?.body;

  const outDir = path.join(workspaceRoot, 'public/images/steps', fileSpec.id);
  if (fs.existsSync(outDir)) {
    fs.readdirSync(outDir).forEach(f => {
      try {
        fs.unlinkSync(path.join(outDir, f));
      } catch (err) {
        // ignore
      }
    });
  } else {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let imgCounter = 0;
  const manifestUrls = [];
  const relsKeys = new Set(rels.keys());
  
  console.log(`\nProcessing ${fileSpec.id} - ${fileSpec.name}:`);

  const rIds = findRIds(body, relsKeys);
  const embeds = rIds.map(id => rels.get(id)).filter(Boolean);
    
  if (embeds.length > 0) {
    for (const mediaPath of embeds) {
      imgCounter++;
      const ext = path.extname(mediaPath).toLowerCase() || '.png';
      const fileName = `${String(imgCounter).padStart(2, '0')}${ext}`;
      const data = await zip.file(mediaPath)?.async('nodebuffer');
      if (data) {
        fs.writeFileSync(path.join(outDir, fileName), data);
        manifestUrls.push(`/images/steps/${fileSpec.id}/${fileName}`);
        console.log(`    Saved Image #${imgCounter} (from ${mediaPath}) -> ${fileName}`);
      }
    }
  }
  return manifestUrls;
}

async function main() {
  const extractedImages = {};
  for (const fileSpec of docxFiles) {
    extractedImages[fileSpec.id] = await extractDocxImages(fileSpec) || [];
  }
  
  // Custom mapping based on the extracted files for Luong
  const manifest = {};
  
  // bt1 (12 steps, 13 images)
  const bt1 = extractedImages['bt1'] || [];
  manifest['bt1'] = [
    bt1[0] || null,
    bt1[1] || null,
    bt1[2] || null,
    bt1[3] || null,
    bt1[4] || null,
    bt1[5] || null,
    bt1[6] || null,
    bt1[7] || null,
    bt1[8] || null,
    bt1[9] || null,
    bt1[10] || null,
    bt1.slice(11).filter(Boolean).length > 0 ? bt1.slice(11) : null
  ];

  // bt2 (5 steps, 0 images)
  manifest['bt2'] = [null, null, null, null, null];

  // bt3 (5 steps, 18 images - excluding 15.png and 16.png quiz screenshots)
  const bt3Original = extractedImages['bt3'] || [];
  const bt3 = bt3Original.filter(img => !img.endsWith('/15.png') && !img.endsWith('/16.png'));
  manifest['bt3'] = [
    null,
    bt3Original.slice(0, 6).filter(Boolean).length > 0 ? bt3Original.slice(0, 6) : null,
    bt3Original.slice(6, 12).filter(Boolean).length > 0 ? bt3Original.slice(6, 12) : null,
    bt3.slice(12).filter(Boolean).length > 0 ? bt3.slice(12) : null,
    null
  ];

  // bt4 (5 steps, 17 images)
  const bt4 = extractedImages['bt4'] || [];
  manifest['bt4'] = [
    bt4.slice(0, 2).filter(Boolean).length > 0 ? bt4.slice(0, 2) : null,
    bt4.slice(2, 6).filter(Boolean).length > 0 ? bt4.slice(2, 6) : null,
    bt4.slice(6, 9).filter(Boolean).length > 0 ? bt4.slice(6, 9) : null,
    bt4.slice(9, 13).filter(Boolean).length > 0 ? bt4.slice(9, 13) : null,
    bt4.slice(13, 17).filter(Boolean).length > 0 ? bt4.slice(13, 17) : null
  ];

  // bt5 (6 steps, 6 images)
  const bt5 = extractedImages['bt5'] || [];
  manifest['bt5'] = [
    null,
    bt5[2] || null,
    bt5.slice(3, 5).filter(Boolean).length > 0 ? bt5.slice(3, 5) : null,
    bt5.slice(0, 2).filter(Boolean).length > 0 ? bt5.slice(0, 2) : null,
    bt5[5] || null,
    null
  ];

  // bt6 (5 steps, 1 image)
  const bt6 = extractedImages['bt6'] || [];
  manifest['bt6'] = [
    null,
    null,
    null,
    null,
    bt6[0] || null
  ];

  // bt7 (4 steps, 0 images)
  manifest['bt7'] = [null, null, null, null];

  fs.writeFileSync(
    path.join(workspaceRoot, 'src/data/step-evidence.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  );
  fs.writeFileSync(
    path.join(workspaceRoot, 'public/images/steps/manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  );
  console.log('\nDone! Manifest saved to src/data/step-evidence.json');
}

main().catch(console.error);
