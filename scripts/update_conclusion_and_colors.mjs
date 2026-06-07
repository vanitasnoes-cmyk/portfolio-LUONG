import fs from 'fs';
import path from 'path';

const appPath = 'src/App.tsx';
const workspaceRoot = '.';
const srcDir = path.join(workspaceRoot, 'src');

// 1. Text Replacements inside App.tsx
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');

  // Replace Kiến Thức Tích Luỹ
  const oldKnowledge = `Qua chuỗi bài tập thực hành toàn diện, tôi đã xây dựng được cho mình một nền tảng kiến thức vững chắc và đa chiều về khoa học máy tính lẫn xu hướng công nghiệp hiện đại. Tôi nắm vững kiến thức căn bản về điện toán liên quan đến cơ chế lưu trữ, phân quyền tệp tin, tối ưu hóa không gian làm việc số và các nguyên tắc bảo mật dữ liệu cục bộ. Về mặt tư duy thuật toán, tôi hiểu rõ bản chất logic của lý thuyết đồ thị cùng quy hoạch động thông qua cơ chế vận hành của thuật toán Dijkstra để ứng dụng vào hệ thống định tuyến thực tế. Tôi cũng trang bị kiến thức chuyên sâu về công nghệ chuỗi khối thông qua việc nắm bắt cấu trúc của sổ cái phân tán, thuật toán mã hóa, dấu thời gian, mã băm và các cơ chế đồng thuận phổ biến như Proof of Work hay Proof of Stake. Đồng thời, tôi đã chuẩn hóa được tư duy về các mô hình bảo trì công nghiệp, phân biệt rõ ràng các cấp độ quản lý từ bảo trì phản ứng, bảo trì phòng ngừa cho đến mô hình bảo trì dự đoán tiên tiến dựa trên dữ liệu.`;
  const newKnowledge = `Hành trình học tập thực chiến đã mang lại cho tôi hệ thống kiến thức đa chiều và vững chắc. Tôi nắm rõ các nguyên lý điện toán căn bản về lưu trữ, bảo mật dữ liệu cục bộ và tổ chức không gian làm việc số. Trên phương diện thuật toán, tôi hiểu sâu sắc logic cấu trúc đồ thị thông qua thuật toán Dijkstra để ứng dụng vào các bài toán định tuyến thực tế. Đồng thời, tôi đã trang bị nền tảng về công nghệ Blockchain với các cơ chế đồng thuận và mã băm bảo mật, song song với việc chuẩn hóa tư duy về các cấp độ bảo trì công nghiệp, đặc biệt là mô hình bảo trì dự đoán thông minh dựa trên dữ liệu cảm biến IoT.`;

  // Replace Sự Phát Triển Bản Thân
  const oldGrowth1 = `Sự phát triển lớn nhất của bản thân tôi qua quá trình học tập này chính là việc nâng cấp tư duy từ người &quot;sử dụng&quot; thụ động sang tư duy &quot;làm chủ&quot; công nghệ. Thay vì phụ thuộc vào các kết quả tạo ra từ trí tuệ nhân tạo, tôi đã dịch chuyển mạnh mẽ sang mô hình tương tác có sự kiểm soát của con người, coi AI là một trợ lý đắc lực hỗ trợ đun nấu ý tưởng, gỡ lỗi và cấu trúc dàn ý, trong khi bản thân luôn đóng vai trò thẩm định, tinh chỉnh và đưa ra quyết định chuyên môn cuối cùng.`;
  const newGrowth1 = `Sự chuyển biến lớn nhất của tôi sau quá trình thực hành chính là sự thay đổi tư duy từ một người ứng dụng công nghệ đơn thuần sang vai trò làm chủ công nghệ. Thay vì tin tưởng một cách thụ động, tôi áp dụng mô hình tương tác có sự kiểm soát của con người, đặt AI vào vị trí trợ lý hỗ trợ xây dựng khung ý tưởng, tìm lỗi mã nguồn và tinh gọn cấu trúc nội dung, trong khi bản thân giữ quyền tối cao trong việc thẩm định và đưa ra quyết định chuyên môn.`;

  const oldGrowth2 = `Sự trưởng thành này còn được minh chứng qua việc tôi thấu hiểu và thực hành nghiêm túc năm nguyên tắc đạo đức sử dụng AI có trách nhiệm trong môi trường học thuật, bao gồm tính chủ động khởi xướng, tính minh bạch trong khai báo trích dẫn, tính kiểm chứng chống lại các hiện tượng ảo giác thông tin, việc bảo mật nghiêm ngặt dữ liệu cá nhân, và việc luôn giữ quyền làm chủ tuyệt đối đối với bản thảo cuối cùng.`;
  const newGrowth2 = `Sự trưởng thành này còn đi liền với việc thực hành nghiêm túc năm nguyên tắc đạo đức sử dụng AI trong học thuật, bao gồm tính chủ động, tính minh bạch, kiểm chứng chống ảo giác, bảo mật thông tin và quyền làm chủ tuyệt đối đối với sản phẩm cuối cùng.`;

  // Replace Thách Thức & Giải Pháp
  const oldChallenges = `<div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                <p className="text-justify">
                  Trong quá trình thực hiện chuỗi tác vụ thực hành, tôi đã đối mặt và vượt qua ba thách thức lớn bằng các giải pháp kỹ thuật cụ thể. Đầu tiên, trước hiện tượng ảo giác và nhiễu thông tin từ AI khi yêu cầu giải thích thuật toán, viết mã C++ hoặc trích xuất tài liệu, tôi đã áp dụng kỹ thuật Prompt chuỗi tư duy (Chain-of-Thought) để định hướng tư duy hệ thống, đồng thời nghiêm túc chạy thử nghiệm mã nguồn và kiểm chứng chéo thông tin với giáo trình hoặc các bài báo khoa học uy tín thuộc danh mục ISI/Scopus.
                </p>
                <p className="text-justify">
                  Thứ hai, đối với sự quá tải thông tin và nguy cơ sót việc do lượng thông báo liên tục từ Trello hay Microsoft Teams khi phối hợp nhóm, tôi đã xử lý bằng cách cá nhân hóa lại bộ lọc thông báo, chỉ bật tính năng theo dõi (Watch) các thẻ công việc trực tiếp do mình phụ trách, kết hợp phân loại độ ưu tiên bằng hệ thống nhãn màu trực quan.
                </p>
                <p className="text-justify">
                  Cuối cùng, để giải quyết khó khăn trong việc theo dõi luồng phụ thuộc công việc trên giao diện Kanban thông thường, tôi đã chủ động tích hợp checklist chi tiết bên trong từng thẻ cá nhân và dán liên kết các tác vụ liên quan (Attachment link), giúp các thành viên dễ dàng kiểm tra trạng thái của tác vụ tiền đề trước khi chính thức bắt tay triển khai phần việc tiếp theo.
                </p>
              </div>`;

  const newChallenges = `<div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                <p className="text-justify">
                  Trong quá trình hoàn thành chuỗi bài tập thực hành, tôi đã chủ động vượt qua ba rào cản lớn nhờ những giải pháp mang tính hệ thống. Đầu tiên, để đối phó với hiện tượng thông tin sai lệch và ảo giác của AI khi truy vấn thuật toán hoặc trích xuất tài liệu chuyên sâu, tôi sử dụng kỹ thuật Prompt chuỗi tư duy nhằm định hướng luồng suy luận của AI, kết hợp chặt chẽ việc chạy thử nghiệm code và đối chiếu trực tiếp với giáo trình hoặc các bài báo khoa học uy tín thuộc danh mục ISI/Scopus.
                </p>
                <p className="text-justify">
                  Tiếp theo, nhằm giải quyết tình trạng quá tải thông tin và nguy cơ bỏ sót công việc từ các luồng thông báo liên tục của Trello hay Microsoft Teams, tôi đã tối ưu hóa bộ lọc cá nhân, chỉ theo dõi các thẻ việc do mình trực tiếp phụ trách và phân loại mức độ khẩn cấp bằng hệ thống nhãn màu trực quan.
                </p>
                <p className="text-justify">
                  Cuối cùng, đối với khó khăn trong việc giám sát các tác vụ có tính chất phụ thuộc lẫn nhau trên giao diện Kanban, tôi đã áp dụng giải pháp tích hợp checklist chi tiết trong từng thẻ công việc và đính kèm đường link của các tác vụ liên quan, giúp toàn đội ngũ luôn chủ động kiểm tra tiến độ của các bước tiền đề trước khi triển khai giai đoạn tiếp theo.
                </p>
              </div>`;

  content = content.replace(oldKnowledge, newKnowledge);
  content = content.replace(oldGrowth1, newGrowth1);
  content = content.replace(oldGrowth2, newGrowth2);
  content = content.replace(oldChallenges, newChallenges);

  fs.writeFileSync(appPath, content, 'utf8');
  console.log('Successfully replaced conclusion text paragraphs!');
}

// 2. Color Replacements to Light Pink (Hồng nhạt)
const replacements = [
  { from: /#db2777/g, to: '#ec4899' }, // primary pink-600 -> pink-500
  { from: /#ec4899/g, to: '#f472b6' }, // accent pink-500 -> pink-400
  { from: /#fbcfe8/g, to: '#fce7f3' }, // secondary pink-200 -> pink-100
  { from: /#fdf2f8/g, to: '#fff5f9' }, // very soft bg
  { from: /#be185d/g, to: '#db2777' }, // dark hover pink -> pink-600
  { from: /#270d1a/g, to: '#351424' }, // text dark pink-brown -> slightly softer
  { from: /rgba\(219,\s*39,\s*119/g, to: 'rgba(236, 72, 153' }, // primary rgba
  { from: /rgba\(255,\s*128,\s*0/g, to: 'rgba(244, 143, 177' } // dark primary rgba
];

function scanAndColorShift(dir) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(f)) continue;
      scanAndColorShift(fullPath);
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
          console.log(`Color shifted: ${fullPath}`);
        }
      }
    }
  }
}

// Color shift src
scanAndColorShift(srcDir);

// Color shift index.html
const htmlPath = path.join(workspaceRoot, 'index.html');
if (fs.existsSync(htmlPath)) {
  let content = fs.readFileSync(htmlPath, 'utf8');
  let initialContent = content;
  for (const rep of replacements) {
    content = content.replace(rep.from, rep.to);
  }
  if (content !== initialContent) {
    fs.writeFileSync(htmlPath, content);
    console.log(`Color shifted: ${htmlPath}`);
  }
}

console.log('Successfully completed text updates and color shift to Light Pink!');
