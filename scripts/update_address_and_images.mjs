import fs from 'fs';
import path from 'path';

const appPath = 'src/App.tsx';
const introPath = 'src/components/PortfolioIntroMedia.tsx';

// 1. Update App.tsx
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');

  // Replace image paths for cover and background
  content = content.replace(/\/images\/anh_1\.png/g, '/images/anh_1.jpg');
  content = content.replace(/\/images\/anh_2\.png/g, '/images/anh_2.jpg');
  content = content.replace(/\/images\/anh_3\.png/g, '/images/anh_3.jpg');
  content = content.replace(/\/images\/anh_4\.png/g, '/images/anh_4.jpg');
  content = content.replace(/\/images\/anh_5\.png/g, '/images/anh_5.jpg');
  content = content.replace(/\/images\/anh_6\.png/g, '/images/anh_6.jpg');

  // Replace address
  content = content.replace(/VNU-HSB, Mỹ Đình, Nam Từ Liêm, Hà Nội/g, 'VNU-HSB, Xuân Thủy, Cầu Giấy, Hà Nội');

  fs.writeFileSync(appPath, content, 'utf8');
  console.log('Successfully updated App.tsx with new address and JPG images!');
}

// 2. Update PortfolioIntroMedia.tsx
if (fs.existsSync(introPath)) {
  let content = fs.readFileSync(introPath, 'utf8');

  // Replace address
  content = content.replace(/VNU-HSB, Mỹ Đình, Nam Từ Liêm, Hà Nội/g, 'VNU-HSB, Xuân Thủy, Cầu Giấy, Hà Nội');

  fs.writeFileSync(introPath, content, 'utf8');
  console.log('Successfully updated PortfolioIntroMedia.tsx with new address!');
}
