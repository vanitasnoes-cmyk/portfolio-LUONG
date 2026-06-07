/** Quy trình chi tiết từng bài — dùng cho accordion & điều hướng bước */
export interface LessonStep {
  text: string;
}

export const LESSON_STEPS: LessonStep[][] = [
  // ─── BÀI 1: Thao tác cơ bản với tệp tin và thư mục ───
  [
    { text: '1. Mở File Explorer: Nhấn tổ hợp phím Windows + E hoặc nhấp vào biểu tượng thư mục màu vàng trên thanh tác vụ.' },
    { text: '2. Truy cập ổ đĩa/thư mục: Ở cột bên trái, nhấp vào This PC, sau đó nhấp đúp vào một ổ đĩa không phải ổ hệ thống (ví dụ: ổ D: hoặc E:). Nếu chỉ có ổ C:, hãy vào thư mục Documents.' },
    { text: '3. Tạo thư mục mới: Nhấp chuột phải vào một khoảng trống -> chọn New -> Folder. Đặt tên thư mục là ThucHanh_TranMinhLuong. Nhấn Enter.' },
    { text: '4. Vào thư mục vừa tạo: Nhấp đúp vào thư mục ThucHanh_TranMinhLuong.' },
    { text: '5. Tạo tệp tin văn bản: Nhấp chuột phải vào khoảng trống -> New -> Text Document. Đặt tên là GhiChu.txt. Nhấn Enter.' },
    { text: '6. Đổi tên tệp tin: Nhấp chuột phải vào tệp GhiChu.txt -> chọn Rename. Đổi tên thành GhiChuQuanTrong.txt. Nhấn Enter.' },
    { text: '7. Tạo thư mục con: Trong thư mục ThucHanh_TranMinhLuong, nhấp chuột phải -> New -> Folder. Đặt tên là TaiLieu.' },
    { text: '8. Sao chép tệp tin (Copy & Paste): Nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Copy (hoặc chọn tệp rồi nhấn Ctrl + C). Nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống bên trong -> chọn Paste (hoặc nhấn Ctrl + V). Bây giờ bạn có một bản sao của tệp trong thư mục TaiLieu.' },
    { text: '9. Di chuyển tệp tin (Cut & Paste): Quay lại thư mục ThucHanh_TranMinhLuong. Tạo một tệp mới tên là DiChuyen.txt. Nhấp chuột phải vào tệp DiChuyen.txt -> chọn Cut (hoặc chọn tệp rồi nhấn Ctrl + X). Nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống -> chọn Paste (hoặc nhấn Ctrl + V). Tệp gốc đã biến mất khỏi vị trí cũ và chỉ còn ở vị trí mới.' },
    { text: '10. Xóa tệp tin: Trong thư mục TaiLieu, nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Delete. Tệp sẽ được chuyển vào Thùng rác (Recycle Bin).' },
    { text: '11. Xóa vĩnh viễn: Chọn tệp DiChuyen.txt, nhấn giữ phím Shift và nhấn phím Delete. Một cảnh báo sẽ hiện ra. Nếu đồng ý, tệp sẽ bị xóa vĩnh viễn mà không qua Thùng rác.' },
    { text: '12. Khôi phục từ Thùng rác (Tùy chọn): Tìm biểu tượng Recycle Bin trên màn hình nền, nhấp đúp để mở. Tìm tệp GhiChuQuanTrong.txt đã xóa, nhấp chuột phải vào nó và chọn Restore. Tệp sẽ quay trở lại vị trí ban đầu.' }
  ],

  // ─── BÀI 2: Đánh giá tài liệu nghiên cứu - Xét nghiệm PCR ───
  [
    { text: '1. Giới thiệu chủ đề nghiên cứu: Lĩnh vực Kỹ thuật Xét nghiệm Y học, tập trung vào "Ứng dụng xét nghiệm PCR trong chẩn đoán bệnh truyền nhiễm". Phương pháp PCR/RT-PCR giúp phát hiện tác nhân gây bệnh (virus, vi khuẩn) với độ nhạy và đặc hiệu cao.' },
    { text: '2. Xác định phạm vi và nguồn tìm kiếm: Tìm kiếm tài liệu khoa học liên quan đến nguyên lý PCR/Real-time PCR, ứng dụng lâm sàng và xu hướng phát triển. Sử dụng các cơ sở dữ liệu học thuật (Google Scholar, PubMed) và tổ chức y tế quốc tế (WHO, CDC, NIH).' },
    { text: '3. Tìm kiếm tài liệu chuyên ngành: Thu thập các tài liệu từ các tạp chí y sinh uy tín như Nucleic Acids Research, Clinical Microbiology Reviews, Molecular Aspects of Medicine và các bài báo khoa học thực nghiệm về RT-PCR chẩn đoán COVID-19.' },
    { text: '4. Đánh giá độ tin cậy của nguồn thông tin: Thẩm định độ tin cậy các nguồn thông tin dựa trên 5 tiêu chí: Uy tín tác giả, Cơ quan/Tạp chí xuất bản, Phương pháp nghiên cứu (thực nghiệm/tổng quan), Số lượng trích dẫn học thuật và Tính cập nhật của tài liệu.' },
    { text: '5. Kết luận & Tổng hợp xu hướng y sinh: Tổng kết vai trò cốt lõi của PCR trong chẩn đoán lâm sàng. Định hình xu hướng mới như xét nghiệm nhanh tại chỗ (point-of-care testing), công nghệ khuếch đại DNA tiên tiến giúp tăng độ nhạy và tối ưu thời gian.' }
  ],

  // ─── BÀI 3: Kỹ năng Prompt Engineering - Điều hòa cầu thận ───
  [
    { text: '1. Xác định tác vụ học tập y khoa: Lựa chọn các tác vụ: Tóm tắt tài liệu học thuật (Điều hòa lưu lượng lọc cầu thận và lưu lượng máu qua thận), giải thích khái niệm y học phức tạp (Tái hấp thu natri), và thiết kế câu hỏi ôn tập lâm sàng.' },
    { text: '2. Thiết kế các phiên bản prompt: Xây dựng 3 cấp độ prompt cho từng tác vụ: Cơ bản (Zero-shot), Cải tiến (thêm ràng buộc độ dài và đối tượng sinh viên), và Nâng cao (áp dụng kỹ thuật đóng vai giảng viên y học, hướng dẫn phân tầng nhiệm vụ và cấu trúc phản hồi).' },
    { text: '3. Thử nghiệm trên Google Gemini: So sánh kết quả phản hồi của AI giữa 3 phiên bản prompt. Nhận diện sự cải thiện từ cô đọng sơ sài (Basic) -> đơn giản hóa có cấu trúc (Improved) -> hệ thống hóa kiến thức đa tầng có ví dụ so sánh lâm sàng (Advanced).' },
    { text: '4. Phân tích hiệu quả sử dụng prompt: Đánh giá dựa trên các nguyên lý khoa học dữ liệu: giảm thiểu sự mơ hồ (Entropy Information), thiết lập khung tham chiếu chuyên môn, định hướng cấu trúc phân tầng và kiểm soát chi tiết để tránh overfitting.' },
    { text: '5. Tổng hợp nguyên tắc viết prompt y sinh: Đúc kết bộ nguyên tắc vàng: Vai trò chuyên gia (The Persona Principle), Bối cảnh & Mục tiêu (Context & Objective), Phân tầng nhiệm vụ (Task Decomposition), và Ràng buộc định dạng (Constraints & Formatting) bằng LaTeX/Immersive.' }
  ],

  // ─── BÀI 4: Thực hành công cụ hợp tác trực tuyến - Hóa sinh lâm sàng ───
  [
    { text: '1. Thiết lập công cụ hợp tác nhóm: Sử dụng Trello quản lý Kanban, Microsoft Word soạn thảo văn bản, Google Drive lưu trữ tài nguyên, Zalo và Google Meet để tương tác họp trực tuyến cho dự án Nhóm 8.' },
    { text: '2. Khởi tạo không gian dự án y tế: Lập bảng Trello: "[VNU1001] Ứng dụng AI và công nghệ số trong khoa học sức khỏe: Ứng dụng AI trong xét nghiệm hóa sinh và ý nghĩa lâm sàng". Phân chia các cột: Kế hoạch, Tìm kiếm, Tổng hợp, Hoàn thiện, Đang thực hiện.' },
    { text: '3. Soạn thảo tài liệu và xử lý định dạng: Biên tập tài liệu "Hệ thống nội dung nghiên cứu" bằng MS Word. Áp dụng giải pháp Paste Keep Text Only hoặc Ctrl + Space để làm sạch định dạng rác từ website, tối ưu hiển thị văn bản học thuật.' },
    { text: '4. Quản lý tài nguyên và tệp tin y sinh: Tổ chức thư mục Google Drive khoa học theo phân cấp dự án. Thống nhất quy tắc đặt tên tệp tin đồng nhất, tạo các thư mục phụ chia theo tiến độ công việc để hạn chế cấu trúc lưu trữ lộn xộn.' },
    { text: '5. Thách thức giao tiếp và giải pháp: Khắc phục hạn chế của Meet miễn phí (không ghi âm) bằng cách cử thư ký ghi chép biên bản; giải quyết việc Zalo trôi file bằng cách đẩy dữ liệu quan trọng lên Google Drive chung và quản lý thông báo khoa học.' }
  ],

  // ─── BÀI 5: Sáng tạo nội dung số với AI - Trợ lý phục hồi chức năng sau tai biến ───
  [
    { text: '1. Đề tài chiến dịch sức khỏe số: Lựa chọn đề tài thiết kế infographic "Trợ lý ảo Phục hồi chức năng tại nhà cho bệnh nhân sau tai biến" nhằm hướng dẫn phục hồi chức năng khoa học cho người bệnh sau đột quỵ.' },
    { text: '2. Lên ý tưởng cấu trúc bằng AI văn bản: Sử dụng Gemini và ChatGPT với prompt chi tiết để xây dựng hệ thống nội dung infographic theo phong cách dễ hiểu cho đại chúng, đảm bảo tính khoa học và định hướng y học.' },
    { text: '3. Sáng tạo hình ảnh y khoa bằng DALL-E: Tạo hình ảnh kỹ thuật viên điều dưỡng 3D hỗ trợ bệnh nhân tập luyện tại nhà theo phong cách hoạt hình Pixar thân thiện, màu sắc ấm áp bằng prompt chi tiết gửi AI.' },
    { text: '4. Thiết kế Infographic trên Canva AI: Khởi tạo và thiết kế infographic trên Canva, tinh chỉnh bố cục khoa học, bổ sung nhiều khung chứa văn bản đan xen hình ảnh trực quan phù hợp với chủ đề chăm sóc sức khỏe.' },
    { text: '5. Đánh giá vai trò của AI tạo sinh: Nhận định AI giúp tăng hiệu suất, tối ưu hóa các tác vụ lặp lại và cung cấp thông tin y học phong phú từ dữ liệu lớn, giúp cải thiện phương pháp chỉnh sửa và phát hiện lỗi sai.' },
    { text: '6. Liêm chính và đạo đức trong sáng tạo số: Phân tích và quản lý 3 thách thức đạo đức: kiểm tra nguồn gốc để tránh đạo văn sở hữu trí tuệ, tự chịu trách nhiệm kiểm chứng độ chính xác y học và giữ tư duy độc lập tránh phụ thuộc hoàn toàn vào AI.' }
  ],

  // ─── BÀI 6: Sử dụng AI có trách nhiệm trong học tập và nghiên cứu ───
  [
    { text: '1. Nghiên cứu chính sách AI tại UMP/VNU: Tìm hiểu cách VNU và UMP điều chỉnh việc dùng AI thông qua Quy chế liêm chính học thuật và quy định đào tạo hiện hành (không cho phép dùng AI trong phòng thi, cấm chép bài làm sẵn).' },
    { text: '2. Bài luận học thuật về Đạo đức AI: ChatGPT hỗ trợ lập bài luận phân tích ranh giới hỗ trợ vs gian lận học thuật, vấn đề quyền sở hữu trí tuệ và các tác động tiêu cực đến quá trình phát triển kỹ năng tư duy phản biện.' },
    { text: '3. Thẩm định phản biện và cải thiện bài luận: Phản biện nội dung do AI viết, phát hiện ảo giác trích dẫn giả, hiệu đính thuật ngữ chuyên ngành (đạo văn phi truyền thống) và chuyên nghiệp hóa giọng văn.' },
    { text: '4. Bộ nguyên tắc cá nhân: Đúc kết 6 nguyên tắc vàng sử dụng AI có trách nhiệm (Trung thực & minh bạch, Giữ vai trò chủ động, Tôn trọng bản quyền, Kiểm chứng thông tin, Phát triển năng lực, Trách nhiệm xã hội).' },
    { text: '5. Thiết kế Infographic truyền thông: Thiết kế infographic trực quan hóa các nguyên tắc "Sử dụng AI có trách nhiệm trong học thuật" phục vụ tuyên truyền liêm chính học thuật cho sinh viên.' }
  ],

  // ─── BÀI 7: Quy trình khám bệnh từ xa (Telemedicine) hỗ trợ AI cho bệnh tăng huyết áp ───
  [
    { text: '1. Đề xuất quy trình Telemedicine hỗ trợ AI: Lên ý tưởng quy trình khám bệnh từ xa cho bệnh nhân tăng huyết áp tại vùng núi khó khăn. Sử dụng hệ thống thông báo AI, thiết bị đeo thông minh đo huyết áp IoT, IBM Watson Health và hồ sơ sức khỏe điện tử EMR/EHR.' },
    { text: '2. Thiết kế Flowchart quy trình khám bệnh: Xây dựng sơ đồ 5 bước: (1) Sàng lọc ban đầu qua Chatbot, (2) Đo huyết áp bằng thiết bị IoT tại trạm y tế, (3) AI Cloud phân tích dữ liệu & cảnh báo, (4) Hội chẩn trực tuyến với bác sĩ tuyến trên, (5) AI trợ lý nhắc lịch uống thuốc.' },
    { text: '3. Phân tích chi tiết vai trò của AI: Mô tả vai trò AI qua 8 giai đoạn từ đăng ký khám, sàng lọc triệu chứng, thu thập chỉ số nhịp tim/huyết áp tự động, phân tích cảnh báo nguy cơ biến chứng đột quỵ đến kê đơn và theo dõi sau khám lâm sàng.' },
    { text: '4. Đánh giá thách thức triển khai vùng cao: Phân tích 2 thách thức chính: hạ tầng Internet vùng núi không đồng đều (giải pháp: đồng bộ ngoại tuyến, tối ưu băng thông rộng) và người cao tuổi khó dùng công nghệ (giải pháp: trợ lý giọng nói tiếng Việt, nhân viên y tế hỗ trợ tại xã).' }
  ]
];
