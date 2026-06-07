import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

const docxFiles = [
  'BÀI 1 LUONG.docx',
  'BÀI 2 LUONG.docx',
  'BÀI 3 LUONG.docx',
  'BÀI 4 LUONG.docx',
  'BÀI 5 LUONG.docx',
  'BÀI 6 LUONG.docx',
  'BÀI 7 LUONG.docx'
];

async function extractText() {
  for (const file of docxFiles) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      console.log(`File does not exist: ${filePath}`);
      continue;
    }
    
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      const outName = `scratch_${file.replace(/\s+/g, '_').replace('.docx', '.txt')}`;
      const outPath = path.resolve(outName);
      fs.writeFileSync(outPath, result.value);
      console.log(`Successfully extracted text for ${file} -> ${outName}`);
    } catch (err) {
      console.error(`Error extracting ${file}:`, err);
    }
  }
}

extractText();
