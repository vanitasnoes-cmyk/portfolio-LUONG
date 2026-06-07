import fs from 'fs';
import path from 'path';

const workspaceRoot = '.';
const srcDir = path.join(workspaceRoot, 'src');

const replacements = [
  // 1. Text Info Replacements
  { from: /Đào Thị Khánh Huyền/g, to: 'Tô Bảo Nhi' },
  { from: /ĐÀO THỊ KHÁNH HUYỀN/g, to: 'TÔ BẢO NHI' },
  { from: /DAO THI KHANH HUYEN/g, to: 'TO BAO NHI' },
  { from: /DaoThiKhanhHuyen/g, to: 'ToBaoNhi' },
  { from: /25080652/g, to: '25080147' },
  { from: /25080652@vnu\.edu\.vn/g, to: '25080147@vnu.edu.vn' },
  { from: /avatar_huyen\.jpg/g, to: 'avatar_nhi.jpg' },

  // 2. Color Hex Replacements
  { from: /#ea580c/g, to: '#db2777' }, // primary light pink (Pink-600)
  { from: /#f97316/g, to: '#ec4899' }, // bright pink accent (Pink-500)
  { from: /#fed7aa/g, to: '#fbcfe8' }, // secondary light pink (Pink-200)
  { from: /#ffedd5/g, to: '#fdf2f8' }, // soft pink background (Pink-50)
  { from: /#ff8000/g, to: '#f472b6' }, // primary dark mode pink (Pink-400)
  { from: /#120902/g, to: '#0f050a' }, // dark mode background (black-pink)
  { from: /#451a03/g, to: '#500724' }, // dark secondary accent
  { from: /#271408/g, to: '#220c15' }, // dark panel bg 1
  { from: /#3a1c02/g, to: '#351121' }, // dark panel bg 2
  { from: /#c2410c/g, to: '#be185d' }, // dark hover pink (Pink-700)
  { from: /#180b02/g, to: '#1d0a14' }, // dark stat card bg
  { from: /#0d0501/g, to: '#0b0307' }, // dark footer bg
  { from: /#2b1405/g, to: '#270d1a' }, // body text color (dark pink-brown)
  { from: /rgba\(234,\s*88,\s*12/g, to: 'rgba(219, 39, 119' }, // primary rgba
  { from: /rgba\(255,\s*128,\s*0/g, to: 'rgba(244, 114, 182' }, // dark primary rgba

  // 3. Banner & Background overlays
  { from: /from-blue-50\/30/g, to: 'from-pink-50/30' },
  { from: /to-blue-50\/20/g, to: 'to-pink-50/20' },
  { from: /dark:from-\[#030d1a\]/g, to: 'dark:from-[#0f0308]' },
  { from: /dark:via-\[#030d1a\]/g, to: 'dark:via-[#0c0206]' },
  { from: /dark:to-\[#030d1a\]/g, to: 'dark:to-[#0f0308]' },
  { from: /shadow-sky-300\/30/g, to: 'shadow-pink-300/30' },
  { from: /shadow-sky-300\/20/g, to: 'shadow-pink-300/20' },
  { from: /shadow-sky-400\/40/g, to: 'shadow-pink-400/40' },
  { from: /dark:text-blue-100/g, to: 'dark:text-pink-100' },
  { from: /dark:border-sky-900/g, to: 'dark:border-pink-900' },
  { from: /dark:border-sky-800/g, to: 'dark:border-pink-900' },
  { from: /dark:hover:bg-sky-900/g, to: 'dark:hover:bg-pink-900' },
  { from: /dark:bg-sky-900/g, to: 'dark:bg-pink-900' },
  { from: /dark:bg-sky-950/g, to: 'dark:bg-pink-950' },
  { from: /dark:hover:text-sky-200/g, to: 'dark:hover:text-pink-200' },
  { from: /dark:text-sky-200/g, to: 'dark:text-pink-200' },
  { from: /dark:text-sky-300/g, to: 'dark:text-pink-300' },
  { from: /dark:!text-sky-300/g, to: 'dark:!text-pink-300' },
  { from: /dark:!bg-sky-950/g, to: 'dark:!bg-pink-950' },
  { from: /dark:!border-sky-400/g, to: 'dark:!border-pink-400' },

  // 4. Tailwind Class name replacements (general)
  { from: /bg-orange-50/g, to: 'bg-pink-50' },
  { from: /bg-orange-100/g, to: 'bg-pink-100' },
  { from: /bg-orange-200/g, to: 'bg-pink-200' },
  { from: /bg-orange-500/g, to: 'bg-pink-500' },
  { from: /bg-orange-600/g, to: 'bg-pink-600' },
  { from: /bg-orange-700/g, to: 'bg-pink-700' },
  { from: /bg-orange-800/g, to: 'bg-pink-800' },
  { from: /bg-orange-900/g, to: 'bg-pink-900' },
  { from: /bg-orange-950/g, to: 'bg-pink-950' },
  { from: /dark:bg-orange-950/g, to: 'dark:bg-pink-950' },

  { from: /text-orange-50/g, to: 'text-pink-50' },
  { from: /text-orange-100/g, to: 'text-pink-100' },
  { from: /text-orange-200/g, to: 'text-pink-200' },
  { from: /text-orange-300/g, to: 'text-pink-300' },
  { from: /text-orange-400/g, to: 'text-pink-400' },
  { from: /text-orange-500/g, to: 'text-pink-500' },
  { from: /text-orange-600/g, to: 'text-pink-600' },
  { from: /text-orange-700/g, to: 'text-pink-700' },
  { from: /text-orange-800/g, to: 'text-pink-800' },
  { from: /text-orange-900/g, to: 'text-pink-900' },
  { from: /text-orange-950/g, to: 'text-pink-950' },
  { from: /dark:text-orange-300/g, to: 'dark:text-pink-300' },
  { from: /dark:text-orange-400/g, to: 'dark:text-pink-400' },
  { from: /dark:text-orange-200/g, to: 'dark:text-pink-200' },

  { from: /border-orange-50/g, to: 'border-pink-50' },
  { from: /border-orange-100/g, to: 'border-pink-100' },
  { from: /border-orange-200/g, to: 'border-pink-200' },
  { from: /border-orange-300/g, to: 'border-pink-300' },
  { from: /border-orange-400/g, to: 'border-pink-400' },
  { from: /border-orange-500/g, to: 'border-pink-500' },
  { from: /border-orange-600/g, to: 'border-pink-600' },
  { from: /border-orange-700/g, to: 'border-pink-700' },
  { from: /border-orange-800/g, to: 'border-pink-800' },
  { from: /border-orange-900/g, to: 'border-pink-900' },

  { from: /hover:bg-orange-50/g, to: 'hover:bg-pink-50' },
  { from: /hover:bg-orange-100/g, to: 'hover:bg-pink-100' },
  { from: /hover:bg-orange-200/g, to: 'hover:bg-pink-200' },
  { from: /hover:bg-orange-500/g, to: 'hover:bg-pink-500' },
  { from: /hover:bg-orange-600/g, to: 'hover:bg-pink-600' },
  { from: /hover:bg-orange-700/g, to: 'hover:bg-pink-700' },
  { from: /hover:bg-orange-850/g, to: 'hover:bg-pink-850' },
  { from: /hover:text-orange-600/g, to: 'hover:text-pink-600' },

  { from: /hover:border-orange-200/g, to: 'hover:border-pink-200' },
  { from: /hover:border-orange-500/g, to: 'hover:border-pink-500' },
  { from: /hover:border-pink-200\/80/g, to: 'hover:border-pink-200/80' },

  { from: /badge-orange/g, to: 'badge-pink' },
  { from: /badge-amber/g, to: 'badge-purple' },

  // 5. Indigo classes to pink
  { from: /bg-indigo-50/g, to: 'bg-pink-50' },
  { from: /bg-indigo-100/g, to: 'bg-pink-100' },
  { from: /bg-indigo-500/g, to: 'bg-pink-500' },
  { from: /bg-indigo-600/g, to: 'bg-pink-600' },
  { from: /bg-indigo-700/g, to: 'bg-pink-700' },
  { from: /bg-indigo-800/g, to: 'bg-pink-800' },
  { from: /bg-indigo-900/g, to: 'bg-pink-900' },
  { from: /bg-indigo-950/g, to: 'bg-pink-950' },
  { from: /text-indigo-500/g, to: 'text-pink-500' },
  { from: /text-indigo-600/g, to: 'text-pink-600' },
  { from: /text-indigo-700/g, to: 'text-pink-700' },
  { from: /text-indigo-800/g, to: 'text-pink-800' },
  { from: /text-indigo-900/g, to: 'text-pink-900' },
  { from: /text-indigo-950/g, to: 'text-pink-950' },
  { from: /border-indigo-50/g, to: 'border-pink-50' },
  { from: /border-indigo-100/g, to: 'border-pink-100' },
  { from: /border-indigo-200/g, to: 'border-pink-200' },
  { from: /border-indigo-300/g, to: 'border-pink-300' },
  { from: /border-indigo-400/g, to: 'border-pink-400' },
  { from: /border-indigo-800/g, to: 'border-pink-800' },
  { from: /border-indigo-900/g, to: 'border-pink-900' },
  { from: /border-indigo-950/g, to: 'border-pink-950' },
  { from: /dark:border-indigo-800/g, to: 'dark:border-pink-800' },
  { from: /dark:border-indigo-900/g, to: 'dark:border-pink-900' },
  { from: /dark:border-indigo-950/g, to: 'dark:border-pink-950' },
  { from: /dark:text-indigo-200/g, to: 'dark:text-pink-200' },
  { from: /dark:text-indigo-350/g, to: 'dark:text-pink-300' },
  { from: /dark:text-indigo-300/g, to: 'dark:text-pink-300' },
  { from: /dark:text-indigo-400/g, to: 'dark:text-pink-400' },
  { from: /focus:ring-indigo-400/g, to: 'focus:ring-pink-400' },
  { from: /focus:ring-indigo-500/g, to: 'focus:ring-pink-500' },
  { from: /dark:focus:ring-indigo-650/g, to: 'dark:focus:ring-pink-600' },
  { from: /dark:focus:ring-indigo-600/g, to: 'dark:focus:ring-pink-600' },
  { from: /dark:bg-indigo-950/g, to: 'dark:bg-pink-950' },
  { from: /hover:bg-indigo-50/g, to: 'hover:bg-pink-50' },
  { from: /from-indigo-500/g, to: 'from-pink-500' },
  { from: /to-teal-500/g, to: 'to-rose-400' }
];

function scanAndMigrate(dir) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(f)) continue;
      scanAndMigrate(fullPath);
    } else {
      const ext = path.extname(f).toLowerCase();
      if (['.tsx', '.ts', '.css'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let initialContent = content;
        
        for (const rep of replacements) {
          content = content.replace(rep.from, rep.to);
        }

        if (content !== initialContent) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated color/info in: ${fullPath}`);
        }
      }
    }
  }
}

// 1. Scan src directory
scanAndMigrate(srcDir);

// 2. Migrate index.html specifically
const htmlPath = path.join(workspaceRoot, 'index.html');
if (fs.existsSync(htmlPath)) {
  let content = fs.readFileSync(htmlPath, 'utf8');
  let initialContent = content;
  for (const rep of replacements) {
    content = content.replace(rep.from, rep.to);
  }
  if (content !== initialContent) {
    fs.writeFileSync(htmlPath, content);
    console.log(`Updated color/info in: ${htmlPath}`);
  }
}

console.log('Successfully completed the baby pink and student info migration!');
