import fs from 'fs';
import path from 'path';

const appPath = 'src/App.tsx';
const introPath = 'src/components/PortfolioIntroMedia.tsx';
const groupPath = 'src/components/GroupDeliverablesMedia.tsx';

// 1. Update App.tsx
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');

  // Replace class code
  content = content.replace(/VNU1001_E252023/g, 'VNU1001-E252036');

  // Replace Lời mở đầu - Đoạn 1
  const oldIntro1 = `Trong kỷ nguyên số và sự bùng nổ mạnh mẽ của <strong className="text-[#db2777] dark:text-white">Cách mạng Công nghiệp 4.0</strong>, công nghệ không còn đơn thuần là một công cụ độc lập mà đã trở thành mạch máu vận hành, tối ưu hóa mọi quy trình trong xã hội. Là một sinh viên thuộc khối ngành <strong className="text-[#db2777] dark:text-white">Công nghệ thông tin và Hệ thống thông tin</strong>, tôi luôn ý thức được tầm quan trọng của việc làm chủ công nghệ và ứng dụng nó một cách có trách nhiệm.`;
  const newIntro1 = `Bước vào kỷ nguyên chuyển đổi số dưới sự định hình của <strong className="text-[#db2777] dark:text-white">Cuộc cách mạng Công nghiệp lần thứ tư</strong>, công nghệ hiện đại đã trở thành nền tảng cốt lõi chi phối và tối ưu hóa mọi hoạt động của đời sống. Là một sinh viên theo đuổi lĩnh vực <strong className="text-[#db2777] dark:text-white">Hệ thống thông tin</strong>, tôi luôn ý thức được vai trò của việc chủ động làm chủ kỹ thuật và áp dụng các giải pháp tiên tiến một cách có trách nhiệm.`;
  
  // Replace Lời mở đầu - Đoạn 2
  const oldIntro2 = `Hồ sơ năng lực này không chỉ là một bảng tổng kết các mảnh ghép bài tập rời rạc, mà là cuốn nhật ký ghi lại hành trình phát triển tư duy của bản thân qua từng giai đoạn. Từ những bước quản trị hệ điều hành căn bản ban đầu, tối ưu hóa quy trình phối hợp làm việc nhóm trực tuyến, cho đến việc làm chủ các kỹ thuật nâng cao như <strong className="text-[#db2777] dark:text-white">Prompt Engineering và khai thác Trí tuệ nhân tạo</strong> vào nghiên cứu chuyên sâu, bạn sẽ thấy cách tôi kết hợp nhuần nhuyễn giữa lý thuyết nền tảng và thực hành thực chiến để giải quyết các bài toán công nghệ thực tế.`;
  const newIntro2 = `Tập hồ sơ năng lực này chính là tấm gương phản chiếu hành trình hoàn thiện tư duy của tôi qua từng dự án thực chiến. Đi từ những kỹ năng quản trị tệp tin căn bản, phương pháp điều phối và quản lý tiến độ nhóm trực tuyến, cho đến việc tối ưu hóa tư duy tương tác AI (<strong className="text-[#db2777] dark:text-white">Prompt Engineering</strong>) phục vụ nghiên cứu chuyên sâu, toàn bộ các nội dung được trình bày sẽ minh chứng cho khả năng kết hợp hài hòa giữa nền tảng lý thuyết và kỹ năng thực hành để giải quyết những bài toán thực tế.`;

  // Replace Mục tiêu portfolio
  const oldGoal = `Mục tiêu cốt lõi của portfolio này là hệ thống hóa toàn bộ năng lực chuyên môn, từ kỹ thuật lập trình, quản trị hệ thống đến kỹ năng quản trị dự án đã tích lũy trong quá trình học tập. Thông qua việc tối ưu hóa quy trình làm việc và tư duy thiết kế bài bản, tôi mong muốn định hình một phong cách làm việc chuyên nghiệp, có tổ chức và mang tính hệ thống cao. Đây cũng là minh chứng cho tinh thần chủ động tự học, năng lực nhạy bén với các xu hướng công nghệ mới và cam kết tuân thủ nghiêm túc các nguyên tắc đạo đức nghề nghiệp.`;
  const newGoal = `Hồ sơ năng lực này được xây dựng với mục đích hệ thống hóa một cách khoa học các kỹ năng chuyên môn từ lập trình, quản lý hệ thống đến năng lực điều hành dự án mà tôi đã tích lũy. Thông qua việc chuẩn hóa quy trình làm việc và áp dụng tư duy trực quan, tôi hướng đến việc xây dựng một phong cách làm việc chuyên nghiệp, nhất quán và có tính tổ chức cao. Đồng thời, đây cũng là nền tảng để khẳng định tinh thần tự học, sự nhạy bén trước các làn sóng công nghệ mới và cam kết tuân thủ nghiêm túc các chuẩn mực đạo đức trong môi trường học thuật lẫn công việc.`;

  // Replace Chuyên ngành
  const oldMajor = `<strong className="text-[#db2777] dark:text-white">Tô Bảo Nhi</strong>, sinh viên thuộc khối ngành Công nghệ thông tin và Hệ thống thông tin (Lớp VNU1001-E252036), Trường Quản trị và Kinh doanh, Đại học Quốc gia Hà Nội (VNU-HSB).`;
  const newMajor = `<strong className="text-[#db2777] dark:text-white">Tô Bảo Nhi</strong>, sinh viên thuộc khối ngành Marketing và Truyền thông , hệ thống thông tin (Lớp VNU1001-E252036). Trường Quản trị và Kinh doanh, Đại học Quốc gia Hà Nội (VNU-HSB).`;

  // Replace Lĩnh vực quan tâm
  const oldInterests = `Tôi đặc biệt quan tâm đến việc ứng dụng học máy vào hệ thống tự động hóa, bảo trì dự đoán trong công nghiệp, kỹ nghệ tương tác AI (Prompt Engineering) và khai thác trí tuệ nhân tạo trong nghiên cứu khoa học vật liệu tiên tiến.`;
  const newInterests = `Định hướng nghiên cứu của tôi tập trung vào việc ứng dụng các mô hình học máy trong tự động hóa và bảo trì dự đoán nhằm nâng cao hiệu suất công nghiệp. Bên cạnh đó, tôi dành sự quan tâm lớn cho kỹ nghệ tương tác AI (Prompt Engineering) cùng việc khai thác trí tuệ nhân tạo tạo sinh để xử lý dữ liệu, hỗ trợ tìm kiếm giải pháp đột phá trong ngành khoa học vật liệu và năng lượng xanh.`;

  // Replace Kỹ năng cốt lõi
  const oldSkills = `Sở hữu năng lực quản trị hệ thống Windows, tối ưu giải thuật C++ và làm chủ các kỹ thuật Prompt nâng cao trên các công cụ GenAI hỗ trợ nghiên cứu (Elicit, Consensus, ChatGPT, Gemini). Đồng thời, tôi thành thạo việc quản trị dự án theo phương pháp Agile/Kanban trên Trello, điều phối tài liệu trực tuyến và tư duy thiết kế truyền thông thị giác.`;
  const newSkills = `Tôi sở hữu nền tảng năng lực toàn diện gồm kỹ năng chuyên môn sâu và tư duy quản lý linh hoạt. Về mặt kỹ thuật, tôi có khả năng quản trị hệ điều hành Windows, tối ưu hóa các giải thuật trên ngôn ngữ C++ và vận dụng thành thạo các kỹ thuật viết prompt nâng cao nhằm khai thác hiệu quả các công cụ GenAI (Elicit, Consensus, ChatGPT, Gemini) phục vụ nghiên cứu khoa học. Về kỹ năng bổ trợ, tôi làm chủ phương pháp điều phối dự án theo mô hình Agile/Kanban trên nền tảng Trello, có năng lực làm việc cộng tác từ xa và tư duy tốt về mặt truyền thông thị giác trong thiết kế sản phẩm.`;

  content = content.replace(oldIntro1, newIntro1);
  content = content.replace(oldIntro2, newIntro2);
  content = content.replace(oldGoal, newGoal);
  content = content.replace(oldMajor, newMajor);
  content = content.replace(oldInterests, newInterests);
  content = content.replace(oldSkills, newSkills);

  fs.writeFileSync(appPath, content, 'utf8');
  console.log('Successfully updated src/App.tsx!');
}

// 2. Update PortfolioIntroMedia.tsx
if (fs.existsSync(introPath)) {
  let content = fs.readFileSync(introPath, 'utf8');
  content = content.replace(/VNU1001_E252023/g, 'VNU1001-E252036');
  fs.writeFileSync(introPath, content, 'utf8');
  console.log('Successfully updated src/components/PortfolioIntroMedia.tsx!');
}

// 3. Update GroupDeliverablesMedia.tsx
if (fs.existsSync(groupPath)) {
  let content = fs.readFileSync(groupPath, 'utf8');
  content = content.replace(/VNU1001_E252023/g, 'VNU1001-E252036');
  fs.writeFileSync(groupPath, content, 'utf8');
  console.log('Successfully updated src/components/GroupDeliverablesMedia.tsx!');
}
