import fs from 'fs';
import path from 'path';

const workspaceRoot = '.';
const srcDir = path.join(workspaceRoot, 'src');

// Replacements for Name, student ID, email, school, major, class
const textReplacements = [
  { from: /Tô Bảo Nhi/g, to: 'Trần Minh Lượng' },
  { from: /TÔ BẢO NHI/g, to: 'TRẦN MINH LƯỢNG' },
  { from: /TO BAO NHI/g, to: 'TRAN MINH LUONG' },
  { from: /ToBaoNhi/g, to: 'TranMinhLuong' },
  { from: /25080147/g, to: '25100773' },
  { from: /25080147@vnu\.edu\.vn/g, to: '25100773@vnu.edu.vn' },
  { from: /VNU1001-E252036/g, to: 'VNU1001-E252028' },
  { from: /VNU-HSB/g, to: 'VNU-UMP' },
  { from: /VNU - HSB/g, to: 'VNU - UMP' },
  { from: /Trường Quản trị và Kinh doanh/g, to: 'Trường Đại học Y Dược' },
  { from: /Hanoi School of Business and Management/g, to: 'University of Medicine and Pharmacy' },
  { from: /Hanoi School of Business/g, to: 'University of Medicine and Pharmacy' },
  { from: /Xuân Thủy, Cầu Giấy, Hà Nội/g, to: 'VNU-UMP, Cầu Giấy, Hà Nội' },
  { from: /VNU-HSB, Xuân Thủy, Cầu Giấy, Hà Nội/g, to: 'VNU-UMP, Cầu Giấy, Hà Nội' },
  { from: /logo_hsb\.jpg/g, to: 'logo_ump.jpg' },
  { from: /avatar_nhi\.jpg/g, to: 'avatar_luong.jpg' },
  { from: /Deep Blue Portfolio Edition/g, to: 'Navy Blue Portfolio Edition' },
  { from: /Deep Blue/g, to: 'Navy Blue' },
  { from: /Bai_1_ToBaoNhi\.pdf/g, to: 'BÀI 1 LUONG.pdf' },
  { from: /Bai_2_ToBaoNhi\.pdf/g, to: 'BÀI 2 LUONG.pdf' },
  { from: /Bai_3_ToBaoNhi\.pdf/g, to: 'BÀI 3 LUONG.pdf' },
  { from: /Bai_4_ToBaoNhi\.pdf/g, to: 'BÀI 4 LUONG.pdf' },
  { from: /Bai_5_ToBaoNhi\.pdf/g, to: 'BÀI 5 LUONG.pdf' },
  { from: /Bai_6_ToBaoNhi\.pdf/g, to: 'BÀI 6 LUONG.pdf' },
  { from: /Bai_7_ToBaoNhi\.pdf/g, to: 'BÀI 7 LUONG.pdf' },
  { from: /Bai_1_ToBaoNhi/g, to: 'BÀI 1 LUONG' },
  { from: /Bai_2_ToBaoNhi/g, to: 'BÀI 2 LUONG' },
  { from: /Bai_3_ToBaoNhi/g, to: 'BÀI 3 LUONG' },
  { from: /Bai_4_ToBaoNhi/g, to: 'BÀI 4 LUONG' },
  { from: /Bai_5_ToBaoNhi/g, to: 'BÀI 5 LUONG' },
  { from: /Bai_6_ToBaoNhi/g, to: 'BÀI 6 LUONG' },
  { from: /Bai_7_ToBaoNhi/g, to: 'BÀI 7 LUONG' }
];

// Color replacements for tailwind and hex values
const colorReplacements = [
  // Hex color codes
  { from: /#db2777/gi, to: '#1e3a8a' }, // pink-600 -> blue-800 (navy)
  { from: /#ec4899/gi, to: '#2563eb' }, // pink-500 -> blue-600 (cobalt)
  { from: /#fbcfe8/gi, to: '#bfdbfe' }, // pink-200 -> blue-200 (ice blue)
  { from: /#fce7f3/gi, to: '#dbeafe' }, // pink-100 -> blue-100
  { from: /#fdf2f8/gi, to: '#eff6ff' }, // pink-50 -> blue-50
  { from: /#f472b6/gi, to: '#1b365d' }, // pink-400 -> navy-900 (primary theme)
  { from: /#0f050a/gi, to: '#0b0f19' }, // dark mode background (slate-navy)
  { from: /#500724/gi, to: '#172554' }, // dark mode secondary accent (blue-950)
  { from: /#220c15/gi, to: '#111827' }, // dark mode card background (slate-900)
  { from: /#351121/gi, to: '#1e293b' }, // dark mode card background 2 (slate-800)
  { from: /#be185d/gi, to: '#1d4ed8' }, // dark hover pink -> blue-700
  { from: /#1d0a14/gi, to: '#1e293b' }, // dark stat card bg -> slate-800
  { from: /#0b0307/gi, to: '#030712' }, // dark footer bg -> black-blue
  { from: /#270d1a/gi, to: '#f8fafc' }, // dark mode body text color -> slate-50
  { from: /#351424/gi, to: '#111827' }, // light mode body text color -> slate-900
  { from: /rgba\(219,\s*39,\s*119/gi, to: 'rgba(30, 58, 138' }, // primary rgba
  { from: /rgba\(244,\s*114,\s*182/gi, to: 'rgba(59, 130, 246' }, // dark primary rgba
  { from: /rgba\(236,\s*72,\s*153/gi, to: 'rgba(37, 99, 235' }, // accent rgba
  
  // Background gradient banners
  { from: /from-pink-50\/30/g, to: 'from-blue-50/30' },
  { from: /to-pink-50\/20/g, to: 'to-blue-50/20' },
  { from: /dark:from-\[#0f0308\]/g, to: 'dark:from-[#090d16]' },
  { from: /dark:via-\[#0c0206\]/g, to: 'dark:via-[#0b0f19]' },
  { from: /dark:to-\[#0f0308\]/g, to: 'dark:to-[#090d16]' },
  { from: /shadow-pink-300\/30/g, to: 'shadow-blue-300/30' },
  { from: /shadow-pink-300\/20/g, to: 'shadow-blue-300/20' },
  { from: /shadow-pink-400\/40/g, to: 'shadow-blue-400/40' },
  
  // Tailwind class replacements (pink -> blue)
  { from: /bg-pink-50/g, to: 'bg-blue-50' },
  { from: /bg-pink-100/g, to: 'bg-blue-100' },
  { from: /bg-pink-200/g, to: 'bg-blue-200' },
  { from: /bg-pink-500/g, to: 'bg-blue-500' },
  { from: /bg-pink-600/g, to: 'bg-blue-600' },
  { from: /bg-pink-700/g, to: 'bg-blue-700' },
  { from: /bg-pink-800/g, to: 'bg-blue-800' },
  { from: /bg-pink-900/g, to: 'bg-blue-900' },
  { from: /bg-pink-950/g, to: 'bg-blue-950' },
  { from: /dark:bg-pink-950/g, to: 'dark:bg-blue-950' },
  
  { from: /text-pink-50/g, to: 'text-blue-50' },
  { from: /text-pink-100/g, to: 'text-blue-100' },
  { from: /text-pink-200/g, to: 'text-blue-200' },
  { from: /text-pink-300/g, to: 'text-blue-300' },
  { from: /text-pink-400/g, to: 'text-blue-400' },
  { from: /text-pink-500/g, to: 'text-blue-500' },
  { from: /text-pink-600/g, to: 'text-blue-600' },
  { from: /text-pink-700/g, to: 'text-blue-700' },
  { from: /text-pink-800/g, to: 'text-blue-800' },
  { from: /text-pink-850/g, to: 'text-blue-850' },
  { from: /text-pink-900/g, to: 'text-blue-900' },
  { from: /text-pink-950/g, to: 'text-blue-950' },
  { from: /dark:text-pink-300/g, to: 'dark:text-blue-300' },
  { from: /dark:text-pink-400/g, to: 'dark:text-blue-400' },
  { from: /dark:text-pink-200/g, to: 'dark:text-blue-200' },
  
  { from: /border-pink-50/g, to: 'border-blue-50' },
  { from: /border-pink-100/g, to: 'border-blue-100' },
  { from: /border-pink-200/g, to: 'border-blue-200' },
  { from: /border-pink-300/g, to: 'border-blue-300' },
  { from: /border-pink-400/g, to: 'border-blue-400' },
  { from: /border-pink-500/g, to: 'border-blue-500' },
  { from: /border-pink-600/g, to: 'border-blue-600' },
  { from: /border-pink-700/g, to: 'border-blue-700' },
  { from: /border-pink-800/g, to: 'border-blue-800' },
  { from: /border-pink-900/g, to: 'border-blue-900' },
  { from: /border-pink-950/g, to: 'border-blue-950' },
  { from: /dark:border-pink-900/g, to: 'dark:border-blue-900' },
  
  { from: /hover:bg-pink-50/g, to: 'hover:bg-blue-50' },
  { from: /hover:bg-pink-100/g, to: 'hover:bg-blue-100' },
  { from: /hover:bg-pink-200/g, to: 'hover:bg-blue-200' },
  { from: /hover:bg-pink-500/g, to: 'hover:bg-blue-500' },
  { from: /hover:bg-pink-600/g, to: 'hover:bg-blue-600' },
  { from: /hover:bg-pink-700/g, to: 'hover:bg-blue-700' },
  { from: /hover:bg-pink-850/g, to: 'hover:bg-blue-850' },
  { from: /hover:text-pink-600/g, to: 'hover:text-blue-600' },
  { from: /hover:border-pink-200/g, to: 'hover:border-blue-200' },
  { from: /hover:border-pink-500/g, to: 'hover:border-blue-500' },
  
  { from: /badge-pink/g, to: 'badge-blue' },
  { from: /badge-rose/g, to: 'badge-blue' },
  { from: /focus:ring-pink-400/g, to: 'focus:ring-blue-400' },
  { from: /focus:ring-pink-500/g, to: 'focus:ring-blue-500' },
  { from: /dark:focus:ring-pink-600/g, to: 'dark:focus:ring-blue-600' },
  { from: /dark:text-pink-100/g, to: 'dark:text-blue-100' },
  { from: /dark:hover:text-pink-200/g, to: 'dark:hover:text-blue-200' },
  { from: /dark:text-pink-200/g, to: 'dark:text-blue-200' },
  { from: /dark:text-pink-300/g, to: 'dark:text-blue-300' },
  { from: /dark:!text-pink-300/g, to: 'dark:!text-blue-300' },
  { from: /dark:!bg-pink-950/g, to: 'dark:!bg-blue-950' },
  { from: /dark:!border-pink-400/g, to: 'dark:!border-blue-400' },
  
  // Rose class replacements (rose -> blue)
  { from: /bg-rose-50/g, to: 'bg-blue-50' },
  { from: /dark:bg-rose-950\/30/g, to: 'dark:bg-blue-950/30' },
  { from: /border-rose-100/g, to: 'border-blue-100' },
  { from: /dark:border-rose-900\/40/g, to: 'dark:border-blue-900/40' },
  { from: /text-rose-950/g, to: 'text-blue-950' },
  { from: /dark:text-rose-300/g, to: 'dark:text-blue-300' },
  
  // Gradients
  { from: /from-pink-500 to-rose-400/g, to: 'from-blue-700 to-blue-500' }
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
        
        // Skip some files that we overwrite entirely
        if (f === 'lesson-steps.ts' || f === 'vnu-rubric.ts' || f === 'RubricSupplements.tsx') {
          continue;
        }

        // Apply text info replacements
        for (const rep of textReplacements) {
          content = content.replace(rep.from, rep.to);
        }

        // Apply color replacements
        for (const rep of colorReplacements) {
          content = content.replace(rep.from, rep.to);
        }

        // Specific fix for the major string in App.tsx (line 728) to ensure it gets exactly replaced
        if (f === 'App.tsx') {
          // Replace specific welcome text in welcome card
          content = content.replace(
            /Marketing và Truyền thông/g,
            'Điều dưỡng'
          );
          content = content.replace(
            /lớp VNU1001-E252036/g,
            'lớp VNU1001-E252028'
          );
          content = content.replace(
            /Nhà Quản trị Số VNU-HSB/g,
            'Sinh viên Y Dược VNU-UMP'
          );
          content = content.replace(
            /Nhà Quản trị Số Tương Lai/g,
            'Sinh viên Y Dược Tương Lai'
          );
          content = content.replace(
            /Nhà Quản trị Sứ/g,
            'Sinh viên Y Dược'
          );
        }

        if (content !== initialContent) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated: ${fullPath}`);
        }
      }
    }
  }
}

// 1. Scan src directory (skipping the files we overwrite completely next)
scanAndMigrate(srcDir);

// 2. Overwrite index.html
const htmlPath = path.join(workspaceRoot, 'index.html');
if (fs.existsSync(htmlPath)) {
  let content = fs.readFileSync(htmlPath, 'utf8');
  for (const rep of textReplacements) {
    content = content.replace(rep.from, rep.to);
  }
  fs.writeFileSync(htmlPath, content);
  console.log(`Updated index.html`);
}

console.log('Main file migration completed successfully!');
