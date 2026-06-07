import fs from 'fs';
import path from 'path';

const workspaceRoot = '.';

function scanDir(dir, found = []) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== 'dist' && f !== '.git') {
        scanDir(fullPath, found);
      }
    } else {
      const ext = path.extname(f).toLowerCase();
      if (['.tsx', '.ts', '.html', '.css', '.json', '.js', '.mjs'].includes(ext)) {
        found.push(fullPath);
      }
    }
  }
  return found;
}

const allFiles = scanDir(path.join(workspaceRoot, 'src'));
allFiles.push(path.join(workspaceRoot, 'index.html'));

const keywords = [
  'huyền', 'baonhi', 'bảo nhi', 'tô bảo', 'khánh huyền', 'đào thị', 'hồng sơn', 'hongson', 'tùng dương', 'tungduong', 'tô thị', 'nhi', 'dương', 'sơn'
];

console.log(`Scanning ${allFiles.length} files for previous student names...`);
let foundCount = 0;
for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const kw of keywords) {
      if (line.toLowerCase().includes(kw)) {
        // Exclude generic occurrences if any
        if (line.includes('Trần Minh Lượng') || line.includes('Luong') || line.includes('luong')) continue;
        console.log(`${file}:${i+1}: ${line.trim().slice(0, 150)}`);
        foundCount++;
        break;
      }
    }
  }
}
console.log(`Scan complete. Found ${foundCount} matches.`);
