import fs from 'fs';
import path from 'path';

const files = [
  'scratch_BÀI_1_LUONG.txt',
  'scratch_BÀI_2_LUONG.txt',
  'scratch_BÀI_3_LUONG.txt',
  'scratch_BÀI_4_LUONG.txt',
  'scratch_BÀI_5_LUONG.txt',
  'scratch_BÀI_6_LUONG.txt',
  'scratch_BÀI_7_LUONG.txt'
];

async function run() {
  let summary = '';
  for (const file of files) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      summary += `### Missing ${file}\n\n`;
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf8').trim();
    summary += `### File: ${file} (Length: ${content.length} chars)\n\n`;
    if (content.length === 0) {
      summary += `[EMPTY]\n\n`;
      continue;
    }
    
    // Get first 1500 chars
    summary += `**Beginning:**\n\`\`\`text\n${content.slice(0, 1500)}\n\`\`\`\n\n`;
    if (content.length > 1500) {
      // Get middle
      summary += `**Middle:**\n\`\`\`text\n${content.slice(Math.floor(content.length/2) - 500, Math.floor(content.length/2) + 500)}\n\`\`\`\n\n`;
      // Get end
      summary += `**End:**\n\`\`\`text\n${content.slice(content.length - 1000)}\n\`\`\`\n\n`;
    }
    summary += `---\n\n`;
  }
  
  fs.writeFileSync('exercises_summary_luong.md', summary);
  console.log('Saved exercises summary to exercises_summary_luong.md');
}

run();
