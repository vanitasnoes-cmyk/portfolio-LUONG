/** Bộ checklist Portfolio năng lực số VNU1001 — đối chiếu Rubric chính thức */

export interface RubricChecklistItem {
  id: string;
  label: string;
  description: string;
}

export interface RubricSection {
  id: string;
  title: string;
  levelLabel: string;
  focus: string;
  items: RubricChecklistItem[];
}

export const VNU_RUBRIC_TITLE = 'Bộ Checklist Portfolio Năng Lực Số (VNU1001)';

export const VNU_RUBRIC_SECTIONS: RubricSection[] = [
  {
    id: 's1',
    title: 'Thiết kế & Cấu trúc Portfolio',
    levelLabel: 'Mức 4 — 3 điểm',
    focus: 'Trọng tâm: Trải nghiệm người dùng (UX) và tính chuyên nghiệp.',
    items: [
      {
        id: 's1-1',
        label: 'Tính đầy đủ',
        description:
          'Có đủ trang giới thiệu (có ảnh chân dung/logo VNU-UMP), các trang nhiệm vụ (1–7) và trang tổng kết.',
      },
      {
        id: 's1-2',
        label: 'Điều hướng thông minh',
        description:
          'Tích hợp mục lục (Mini-ToC) ở đầu mỗi bài hoặc thanh tiến độ (Progress bar). Các liên kết Deep links hoạt động chính xác.',
      },
      {
        id: 's1-3',
        label: 'Đa phương tiện',
        description:
          'Tích hợp hài hòa video, infographic, biểu đồ và ảnh chụp minh họa (Lightbox).',
      },
      {
        id: 's1-4',
        label: 'UX/UI',
        description:
          'Màu sắc nhất quán, font chữ dễ đọc (Be Vietnam Pro / Times New Roman), giao diện tối ưu trên điện thoại và máy tính.',
      },
    ],
  },
  {
    id: 's2',
    title: 'Nhiệm vụ 1: Quản lý tệp và thư mục',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Tổ chức dữ liệu khoa học cho ngành Y Dược & Điều dưỡng.',
    items: [
      {
        id: 's2-1',
        label: 'Cấu trúc logic',
        description:
          'Ảnh chụp cây thư mục phân cấp rõ ràng (ví dụ: Nam_1 > Hoc_ky_2 > Dieu_duong > Bai_giang).',
      },
      {
        id: 's2-2',
        label: 'Quy tắc đặt tên',
        description:
          'Áp dụng công thức nhất quán: YYYY-MM-DD_[MaMon]_[Loai]_[NoiDung]_v[SoPhienBan].',
      },
      {
        id: 's2-3',
        label: 'Minh chứng sâu sắc',
        description:
          'Có phần mô tả giải thích tại sao cấu trúc này giúp quản lý hàng trăm tài liệu y khoa & điều dưỡng hiệu quả, tránh thất lạc và tối ưu hóa tra cứu.',
      },
    ],
  },
  {
    id: 's3',
    title: 'Nhiệm vụ 2: Tìm kiếm & Đánh giá thông tin',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Kỹ năng tra cứu PubMed và bộ tiêu chí CRAAP.',
    items: [
      {
        id: 's3-1',
        label: 'Toán tử nâng cao',
        description:
          'Minh chứng sử dụng linh hoạt trên 4 toán tử (ví dụ: site:gov.vn, filetype:pdf, dấu ngoặc kép, AROUND(n) hoặc - để lọc tin giả).',
      },
      {
        id: 's3-2',
        label: 'Nguồn học thuật',
        description:
          'Kết quả tìm kiếm từ các nguồn uy tín như Google Scholar, PubMed hoặc thư viện số VNU-LIC.',
      },
      {
        id: 's3-3',
        label: 'Phân tích CRAAP',
        description:
          'Phân tích sâu sắc về chiến lược tìm kiếm và thẩm định một bài báo y học cụ thể (tính cập nhật, độ chính xác…).',
      },
    ],
  },
  {
    id: 's4',
    title: 'Nhiệm vụ 3: Viết Prompt hiệu quả',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Kỹ thuật Prompt Engineering trong y học & sinh lý học.',
    items: [
      {
        id: 's4-1',
        label: 'Framework chuyên nghiệp',
        description:
          'Sử dụng mô hình CLEAR (Bối cảnh — Vai trò — Chỉ dẫn — Đối tượng — Tinh chỉnh) cho các tác vụ y khoa & lâm sàng.',
      },
      {
        id: 's4-2',
        label: 'Kỹ thuật nâng cao',
        description:
          'Có minh chứng áp dụng Chain-of-Thought (CoT) — yêu cầu AI suy luận từng bước cho một tình huống y học hoặc sinh lý thận.',
      },
      {
        id: 's4-3',
        label: 'So sánh cơ chế',
        description:
          'Phân tích sâu sắc sự khác biệt giữa các mô hình AI (như ChatGPT vs Perplexity) về khả năng trích dẫn y học khoa học và độ tin cậy.',
      },
    ],
  },
  {
    id: 's5',
    title: 'Nhiệm vụ 4: Hợp tác trực tuyến',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Tối ưu hóa quy trình làm việc nhóm cho dự án y tế số.',
    items: [
      {
        id: 's5-1',
        label: 'Công cụ nâng cao',
        description: 'Sử dụng thành thạo Trello và MS Word để quản lý dự án nhóm.',
      },
      {
        id: 's5-2',
        label: 'Tối ưu quy trình',
        description:
          'Ảnh chụp bảng Kanban thể hiện rõ việc phân công, hạn chót và theo dõi tiến độ một cách khoa học.',
      },
      {
        id: 's5-3',
        label: 'Văn hóa số',
        description:
          'Mô tả cách nhóm áp dụng Netiquette và giải quyết xung đột trực tuyến khi thảo luận dự án (Zalo / Meet / Drive).',
      },
    ],
  },
  {
    id: 's6',
    title: 'Nhiệm vụ 5: Sáng tạo nội dung với AI',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Sản phẩm truyền thông sức khỏe mang dấu ấn cá nhân.',
    items: [
      {
        id: 's6-1',
        label: 'Chất lượng sản phẩm',
        description:
          'Sản phẩm (Infographic Trợ lý phục hồi chức năng sau tai biến) có thiết kế sáng tạo, chuyên nghiệp, không lỗi kỹ thuật.',
      },
      {
        id: 's6-2',
        label: 'Quy trình 6 bước',
        description: 'Mô tả chi tiết từ khâu lên ý tưởng đến đo lường hiệu quả (KPIs).',
      },
      {
        id: 's6-3',
        label: 'Tận dụng công cụ',
        description:
          'Thể hiện việc sử dụng AI để hỗ trợ (lên dàn ý, tạo ảnh DALL-E) nhưng có sự biên tập, cá nhân hóa sâu sắc của bản thân.',
      },
    ],
  },
  {
    id: 's7',
    title: 'Nhiệm vụ 6: AI có trách nhiệm',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Liêm chính học thuật và đạo đức nghề y dược.',
    items: [
      {
        id: 's7-1',
        label: 'Bộ nguyên tắc cá nhân',
        description:
          '5–7 nguyên tắc chi tiết (ví dụ: luôn kiểm chứng tính chính xác của dữ liệu từ nguồn tin cậy sau khi dùng AI).',
      },
      {
        id: 's7-2',
        label: 'Tư duy phản biện',
        description:
          'Phân tích sâu sắc ranh giới giữa "Hỗ trợ" và "Gian lận" trong đào tạo y dược & chăm sóc sức khỏe.',
      },
      {
        id: 's7-3',
        label: 'Giải pháp đạo đức',
        description:
          'Đề xuất cách ứng phó với ảo giác AI và bảo vệ an toàn dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.',
      },
    ],
  },
  {
    id: 's7_5',
    title: 'Nhiệm vụ 7: Quy trình Telemedicine hỗ trợ AI',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Kỹ năng thiết kế quy trình Telemedicine có tích hợp trợ lý AI.',
    items: [
      {
        id: 's7_5-1',
        label: 'Quy trình rõ ràng',
        description: 'Thiết kế quy trình Telemedicine gồm 5-8 bước rõ ràng cho bệnh nhân tăng huyết áp ở vùng cao.',
      },
      {
        id: 's7_5-2',
        label: 'Tích hợp trợ lý AI',
        description: 'Xác định rõ vai trò của AI ở từng bước (sàng lọc chatbot, thiết bị đo IoT, phân tích nguy cơ đột quỵ, nhắc lịch).',
      },
      {
        id: 's7_5-3',
        label: 'Thách thức & Giải pháp',
        description: 'Phân tích sâu sắc rào cản công nghệ đường truyền, rào cản người cao tuổi và đề xuất các giải pháp khả thi.',
      },
    ],
  },
  {
    id: 's8',
    title: 'Tổng kết và đánh giá bản thân',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Sự trưởng thành và định hướng tương lai nghề nghiệp.',
    items: [
      {
        id: 's8-1',
        label: 'Phân tích chiều sâu',
        description:
          'Đánh giá trung thực về sự thay đổi của bản thân từ "người dùng thụ động" sang "người giám sát chiến lược" của AI.',
      },
      {
        id: 's8-2',
        label: 'Bài học kinh nghiệm',
        description:
          'Nêu rõ các thách thức kỹ thuật / đạo đức đã vượt qua trong suốt học phần.',
      },
      {
        id: 's8-3',
        label: 'Ứng dụng thực tiễn',
        description:
          'Mô tả kế hoạch cụ thể để áp dụng các kỹ năng số vào thực hành lâm sàng tại bệnh viện hoặc nghiên cứu y học sau này.',
      },
    ],
  },
];

export const PORTFOLIO_RUBRIC_SECTION = VNU_RUBRIC_SECTIONS[0];

export function getTaskRubricSection(lessonIndex: number): RubricSection | undefined {
  if (lessonIndex < 0 || lessonIndex > 6) return undefined;
  return VNU_RUBRIC_SECTIONS[lessonIndex + 1];
}

export function getLessonRubricSections(lessonIndex: number): RubricSection[] {
  const task = getTaskRubricSection(lessonIndex);
  return task ? [task] : [];
}

export const TOTAL_RUBRIC_ITEMS = countSectionItems(VNU_RUBRIC_SECTIONS);

export function countAllRubricChecked(checks: Record<string, boolean>): number {
  return countCheckedInSections(VNU_RUBRIC_SECTIONS, checks);
}

export function rubricSectionNumber(sectionId: string): number {
  const idx = VNU_RUBRIC_SECTIONS.findIndex((s) => s.id === sectionId);
  return idx >= 0 ? idx + 1 : 0;
}

export const SUMMARY_RUBRIC_SECTION = VNU_RUBRIC_SECTIONS[8];

export function countSectionItems(sections: RubricSection[]): number {
  return sections.reduce((n, s) => n + s.items.length, 0);
}

export function countCheckedInSections(
  sections: RubricSection[],
  checks: Record<string, boolean>,
): number {
  return sections.reduce(
    (n, s) => n + s.items.filter((item) => checks[item.id]).length,
    0,
  );
}

export const RUBRIC_STORAGE_KEY = 'portfolio-rubric-vnu1001-v2';

export function loadRubricChecks(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(RUBRIC_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, boolean>;
  } catch {
    return {};
  }
}

export function saveRubricChecks(checks: Record<string, boolean>): void {
  try {
    localStorage.setItem(RUBRIC_STORAGE_KEY, JSON.stringify(checks));
    window.dispatchEvent(new CustomEvent('rubric-checks-updated'));
  } catch {
    /* ignore quota */
  }
}
