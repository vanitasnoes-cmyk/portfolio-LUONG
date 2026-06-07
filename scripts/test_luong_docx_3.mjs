import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  isArray: (name) => ['p', 'r', 't', 'blip', 'imagedata', 'tbl', 'tr', 'tc'].includes(name),
});

async function run() {
  const filePath = './BÀI 3 LUONG.docx';
  if (!fs.existsSync(filePath)) {
    console.error("File not found!");
    return;
  }
  const buf = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  const docXml = await zip.file('word/document.xml')?.async('string');
  const doc = parser.parse(docXml);
  
  console.log("Document parsed.");
  
  // Search for rel ID keys
  const relsXml = await zip.file('word/_rels/document.xml.rels')?.async('string');
  const rels = new Map();
  if (relsXml) {
    const relsDoc = parser.parse(relsXml);
    const relationshipArray = relsDoc?.Relationships?.Relationship;
    const relsList = Array.isArray(relationshipArray) ? relationshipArray : [relationshipArray].filter(Boolean);
    for (const rel of relsList) {
      const id = rel['@_Id'];
      const target = rel['@_Target'];
      if (id && target?.startsWith('media/')) {
        rels.set(id, `word/${target}`);
      }
    }
  }
  
  console.log("Relations found:", rels.size, [...rels.keys()]);
  
  // Find all keys in doc recursively
  const matches = [];
  const findRIdsRecursive = (node, path = '') => {
    if (node == null) return;
    if (typeof node === 'string') {
      if (rels.has(node)) {
        matches.push({ path, rId: node, target: rels.get(node) });
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, idx) => findRIdsRecursive(item, `${path}[${idx}]`));
      return;
    }
    if (typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (k.startsWith('@_') && typeof v === 'string' && rels.has(v)) {
          matches.push({ path: `${path}.${k}`, rId: v, target: rels.get(v) });
        } else {
          findRIdsRecursive(v, `${path}.${k}`);
        }
      }
    }
  };
  
  findRIdsRecursive(doc);
  console.log("Total image instances found in document.xml:", matches.length);
  console.log(JSON.stringify(matches.slice(0, 10), null, 2));
}

run().catch(console.error);
