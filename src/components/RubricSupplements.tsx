import type { ReactNode } from 'react';

/** Nội dung bổ sung đối chiếu checklist VNU1001 — gắn với từng nhiệm vụ */

function SupplementShell({
  title,
  rubricRef,
  children,
  titleClassName,
  rubricRefClassName,
}: {
  title: string;
  rubricRef: string;
  children: ReactNode;
  titleClassName?: string;
  rubricRefClassName?: string;
}) {
  return (
    <div className="mt-4 pt-4 border-t border-dashed border-blue-200/60 dark:border-blue-800/40 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h6 className={titleClassName || "text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest font-sans"}>{title}</h6>
        <span className={rubricRefClassName || "text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide"}>{rubricRef}</span>
      </div>
      {children}
    </div>
  );
}

function Task1Supplements() {
  return (
  <>
    <SupplementShell title="Lý do cấu trúc thư mục ngành Y Dược &amp; Điều dưỡng" rubricRef="§2 · Minh chứng sâu">
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-semibold">
        Với hàng trăm tài liệu môn học, slide bài giảng giải phẫu, tệp tin thực hành lâm sàng và báo cáo nghiên cứu mỗi học kỳ, phân cấp{' '}
        <code className="text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 px-1 rounded text-[10px]">Chuong[Số]_Chủ đề</code> giúp tránh
        thất lạc dữ liệu, rút ngắn thời gian tra cứu trước thi, đồng thời
        đồng bộ với quy ước nộp bài <code className="text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 px-1 rounded text-[10px]">BT*_Chuong*_TranMinhLuong</code>{' '}
        của học phần VNU1001.
      </p>
    </SupplementShell>
    <SupplementShell title="Quy tắc đặt tên mở rộng (phiên bản &amp; ngày)" rubricRef="§2 · Quy tắc đặt tên">
      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 font-semibold list-disc pl-4">
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Báo cáo nộp VNU:</strong>{' '}
          <code className="font-mono text-[10px] text-blue-600 dark:text-blue-300">BT[Số]_Chuong[Số]_TranMinhLuong</code>
        </li>
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Tài liệu học tập / nghiên cứu:</strong>{' '}
          <code className="font-mono text-[10px] text-blue-600 dark:text-blue-300">
            YYYY-MM-DD_VNU1001_[Loai]_[NoiDung]_v[So]
          </code>
          <span className="text-slate-500 dark:text-slate-400"> — ví dụ: </span>
          <code className="font-mono text-[10px] dark:text-slate-300">2026-03-15_VNU1001_BaoCao_YDuoc_v2.pdf</code>
        </li>
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Nhóm đám mây:</strong>{' '}
          <code className="font-mono text-[10px] dark:text-slate-300">Nhom8_BaoCao_AI_HoaSinh_v1.2.docx</code>,{' '}
          <code className="font-mono text-[10px] dark:text-slate-300">Slide_Telemedicine_AI_v3.pptx</code>
        </li>
      </ul>
    </SupplementShell>
  </>
  );
}

function Task2Supplements() {
  return (
  <>
    <SupplementShell title="Nguồn học thuật: PubMed &amp; VNU-LIC" rubricRef="§3 · Nguồn uy tín">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
          <span className="font-black text-blue-900 dark:text-blue-300 block mb-1">PubMed / ScienceDirect</span>
          Truy vấn: <em>&quot;PCR diagnostics&quot;</em> + <em>&quot;Infectious Diseases&quot;</em> — lọc bài Q1, full-text PDF.
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
          <span className="font-black text-blue-900 dark:text-blue-300 block mb-1">VNU-LIC</span>
          Tra cứu qua thư viện ĐHQG: tạp chí Elsevier, Clinical Microbiology Reviews có license tổ chức — tránh paywall trái phép.
        </div>
      </div>
    </SupplementShell>
    <SupplementShell title="Toán tử tìm kiếm (≥4)" rubricRef="§3 · Toán tử nâng cao">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
        <table className="w-full text-left text-[11px] font-sans">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="p-2.5">Toán tử</th>
              <th className="p-2.5">Ví dụ áp dụng</th>
              <th className="p-2.5">Mục đích</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold">
            <tr>
              <td className="p-2.5 font-mono text-blue-700 dark:text-blue-400">&quot;…&quot;</td>
              <td className="p-2.5">&quot;pcr diagnostics&quot;</td>
              <td className="p-2.5">Cụm từ chính xác</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-blue-700 dark:text-blue-400">AND / OR</td>
              <td className="p-2.5">(&quot;pcr&quot; OR &quot;real-time pcr&quot;) AND &quot;infectious diseases&quot;</td>
              <td className="p-2.5">Boolean logic</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-blue-700 dark:text-blue-400">site:</td>
              <td className="p-2.5">site:ncbi.nlm.nih.gov &quot;pcr diagnostics&quot;</td>
              <td className="p-2.5">Giới hạn tổ chức y tế học thuật</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-blue-700 dark:text-blue-400">filetype:pdf</td>
              <td className="p-2.5">filetype:pdf &quot;pcr diagnostics&quot; guidelines</td>
              <td className="p-2.5">Chỉ tài liệu hướng dẫn PDF</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-blue-700 dark:text-blue-400">- (trừ)</td>
              <td className="p-2.5">&quot;pcr diagnostics&quot; -veterinary</td>
              <td className="p-2.5">Loại nhiễu / loại trừ thú y</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SupplementShell>
    <SupplementShell title="Phân tích CRAAP — 1 bài báo khoa học" rubricRef="§3 · CRAAP">
      <div className="overflow-x-auto rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20">
        <table className="w-full text-left text-[11px] font-sans">
          <thead>
            <tr className="bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 font-bold">
              <th className="p-2.5">Tiêu chí</th>
              <th className="p-2.5">Scientific Reports — Khatami et al. (2020)</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-300 font-semibold divide-y divide-emerald-100/50 dark:divide-emerald-900/30">
            <tr><td className="p-2.5 font-bold">Currency</td><td className="p-2.5">Đáp ứng tốt; cung cấp dữ liệu nền tảng cho RT-PCR dịch tễ lớn.</td></tr>
            <tr><td className="p-2.5 font-bold">Relevance</td><td className="p-2.5">Trực tiếp: RT-PCR và CT trong chẩn đoán COVID-19 — liên quan kỹ thuật xét nghiệm y học.</td></tr>
            <tr><td className="p-2.5 font-bold">Authority</td><td className="p-2.5">Nature Publishing, peer-reviewed, độ uy tín và số lượt trích dẫn học thuật cao.</td></tr>
            <tr><td className="p-2.5 font-bold">Accuracy</td><td className="p-2.5">Phương pháp phân tích tổng hợp (meta-analysis) số liệu thực nghiệm y học rõ ràng.</td></tr>
            <tr><td className="p-2.5 font-bold">Purpose</td><td className="p-2.5">Mục đích khoa học, phục vụ y học lâm sàng, không thương mại.</td></tr>
          </tbody>
        </table>
      </div>
    </SupplementShell>
  </>
  );
}

function Task3Supplements() {
  return (
  <>
    <SupplementShell title="Chain-of-Thought — Y học &amp; Sinh lý" rubricRef="§4 · CoT sinh lý">
      <div className="bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <p className="italic text-blue-900/90 dark:text-blue-300 border-l-2 border-blue-400 pl-3">
          Prompt: &quot;Hãy giải thích cơ chế điều hòa lưu lượng lọc cầu thận (GFR) bằng phương pháp suy luận từng bước (CoT): (1) cơ chế tự điều hòa ngược ống-cầu thận tại macula densa, (2) vai trò của hệ Renin-Angiotensin, (3) tóm tắt các tác nhân co/giãn tiểu động mạch đi và đến.&quot;
        </p>
        <p className="text-justify leading-relaxed">
          AI phân tích chi tiết sinh lý; sinh viên <strong className="text-slate-800 dark:text-slate-100">đối chiếu với giáo trình sinh lý học</strong> y khoa chính thống trước khi lưu giữ kết quả — thể hiện tư duy làm chủ (Bài 6).
        </p>
      </div>
    </SupplementShell>
    <SupplementShell title="So sánh ChatGPT vs Perplexity (học thuật)" rubricRef="§4 · So sánh cơ chế">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
        <table className="w-full text-left text-[11px] font-sans">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/60 font-bold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
              <th className="p-2.5">Tiêu chí</th>
              <th className="p-2.5">ChatGPT</th>
              <th className="p-2.5">Perplexity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold">
            <tr><td className="p-2.5">Trích dẫn</td><td className="p-2.5">Không ổn định; dễ thiếu PMID y học</td><td className="p-2.5">Gắn link nguồn thực tế, hỗ trợ tra cứu lâm sàng</td></tr>
            <tr><td className="p-2.5">Ảo giác</td><td className="p-2.5">Cao nếu prompt mơ hồ</td><td className="p-2.5">Thấp hơn khi đối soát với y học số</td></tr>
            <tr><td className="p-2.5">Tác vụ phù hợp</td><td className="p-2.5">Soạn đề cương, CLEAR/CRAC (Bài 3)</td><td className="p-2.5">Giải thuật, giải thích cơ chế sinh lý (Bài 3)</td></tr>
          </tbody>
        </table>
      </div>
    </SupplementShell>
  </>
  );
}

function Task4Supplements() {
  return (
  <>
    <SupplementShell title="Netiquette &amp; xử lý xung đột nhóm" rubricRef="§5 · Văn hóa số">
      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 font-semibold list-disc pl-4 leading-relaxed">
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Netiquette:</strong> Trả lời Zalo/Meet nhóm trong 24h; phân công rõ ràng trên Trello;
          lưu trữ file họp trên Drive; không can thiệp trực tiếp vào tài liệu Word khi chưa có sự thống nhất.
        </li>
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Xung đột nội dung y tế:</strong> Khi hai ý kiến chuyên môn khác nhau trên báo cáo xét nghiệm hóa sinh —
          cả nhóm tiến hành đối chiếu với phác đồ chuẩn của Bộ Y tế và lưu lại Version History rõ ràng.
        </li>
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Minh chứng:</strong> Việc dán link thẻ Trello liên kết, lưu trữ cấu trúc đa tầng trên Google Drive (Bài 4).
        </li>
      </ul>
    </SupplementShell>
  </>
  );
}

function Task5Supplements() {
  const steps = [
    { n: 1, label: 'Ý tưởng & khán giả', kpi: 'Chủ đề Trợ lý phục hồi chức năng sau tai biến + SV UMP' },
    { n: 2, label: 'Nghiên cứu số liệu y khoa', kpi: '≥3 nguồn (Gemini blog, phác đồ điều trị Bộ Y tế)' },
    { n: 3, label: 'Soạn thảo AI + hiệu đính', kpi: 'Dàn ý infographic chuẩn khoa học, 0 lỗi sai phác đồ' },
    { n: 4, label: 'Thiết kế hình ảnh DALL-E', kpi: 'Nhân vật điều dưỡng 3D hỗ trợ tập luyện (Pixar style)' },
    { n: 5, label: 'Infographic trên Canva', kpi: 'Canva palette phù hợp chăm sóc sức khỏe, dễ tiếp cận' },
    { n: 6, label: 'Đo lường & Phản hồi', kpi: 'Lượt xem lớp học; phản hồi checklist đối chiếu y học' },
  ];
  return (
    <SupplementShell title="Quy trình sáng tạo 6 bước &amp; KPI" rubricRef="§6 · Quy trình 6 bước">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
        <table className="w-full text-left text-[11px] font-sans">
          <thead>
            <tr className="bg-blue-50 dark:bg-blue-950/50 text-blue-950 dark:text-blue-300 font-bold border-b border-blue-100 dark:border-blue-900/40">
              <th className="p-2.5 w-8">#</th>
              <th className="p-2.5">Bước</th>
              <th className="p-2.5">KPI / Minh chứng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold">
            {steps.map((s) => (
              <tr key={s.n}>
                <td className="p-2.5 font-black text-blue-600 dark:text-blue-400">{s.n}</td>
                <td className="p-2.5">{s.label}</td>
                <td className="p-2.5">{s.kpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 italic font-semibold">
        AI hỗ trợ dàn ý/ảnh; sinh viên biên tập sâu nội dung phục hồi chức năng và kiểm chứng y học (bước 2–3
        trong quy trình chi tiết).
      </p>
    </SupplementShell>
  );
}

function Task6Supplements() {
  return (
  <>
    <SupplementShell title="Nghị định 13/2023/NĐ-CP &amp; An toàn dữ liệu y tế" rubricRef="§7 · Giải pháp đạo đức">
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-semibold">
        Khi tra cứu thông tin y học bằng AI, <strong className="text-slate-800 dark:text-slate-100">không nhập</strong> bệnh án thật, họ tên bệnh nhân, CCCD
        hay dữ liệu lâm sàng chưa ẩn danh lên mô hình công cộng. Tuân thủ{' '}
        <strong className="text-slate-800 dark:text-slate-100">Nghị định 13/2023/NĐ-CP</strong> về bảo vệ dữ liệu cá nhân: chỉ dùng
        dữ liệu đã ẩn danh hóa; lưu trữ tài liệu nhóm trên Drive có 2FA; xóa log chat sau khi hoàn thành.
      </p>
    </SupplementShell>
    <SupplementShell title="Hỗ trợ vs Gian lận (đào tạo Y Dược)" rubricRef="§7 · Tư duy phản biện">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-300">
          <span className="font-black block mb-1 uppercase text-[10px] tracking-wide">Hỗ trợ ✓</span>
          Gợi ý cấu trúc báo cáo; giải thích cơ chế sinh lý kèm trích dẫn; kiểm tra chính tả; gợi ý bố cục infographic y khoa sau khi có phác đồ điều trị chuẩn.
        </div>
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-rose-950 dark:text-rose-300">
          <span className="font-black block mb-1 uppercase text-[10px] tracking-wide">Gian lận ✗</span>
          Nộp nguyên văn bài viết do AI soạn mà không kiểm chứng phác đồ y khoa chuẩn; che giấu việc dùng AI; copy bài bạn; đưa dữ liệu bệnh nhân thật lên chatbot.
        </div>
      </div>
    </SupplementShell>
  </>
  );
}

export function LessonRubricSupplements({ tabIndex }: { tabIndex: number }) {
  switch (tabIndex) {
    case 0:
      return <Task1Supplements />;
    case 1:
      return <Task2Supplements />;
    case 2:
      return <Task3Supplements />;
    case 3:
      return <Task4Supplements />;
    case 4:
      return <Task5Supplements />;
    case 5:
      return <Task6Supplements />;
    default:
      return null;
  }
}

export function SummaryRubricSupplement() {
  return (
    <div className="mt-8 space-y-4 relative z-10">
      <div className="glass-panel rounded-2xl p-6 border border-blue-100/40 dark:border-blue-900/30 space-y-3">
        <h4 className="text-xs font-black text-blue-900 dark:text-blue-300 uppercase tracking-widest font-sans">
          Đối chiếu Rubric §8 — Chiều sâu &amp; thực hành lâm sàng
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
          Tôi chuyển từ <strong className="text-slate-800 dark:text-slate-100">người dùng AI thụ động</strong> (copy-paste câu trả lời)
          sang <strong className="text-slate-800 dark:text-slate-100">người giám sát chiến lược</strong>: thiết kế prompt CLEAR/CoT, chọn
          Perplexity/PubMed cho tra cứu thông tin và Gemini cho lập dàn ý, luôn kiểm chứng bằng giáo trình và tài liệu chính thống trước khi đưa ra
          kết luận lâm sàng.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
          <strong className="text-slate-800 dark:text-slate-100">Kế hoạch thực hành lâm sàng tại bệnh viện (2026–2027):</strong> (1) Chuẩn hóa thư mục
          công việc điều dưỡng theo <code className="text-[10px] text-blue-600 dark:text-blue-400">YYYY-MM-DD_Khoa_TenFile_v1</code>; (2) Tra cứu
          thông tin y học trên PubMed/VNU-LIC, không tin một nguồn AI; (3) Soạn báo cáo bệnh án bằng template có
          trích dẫn nguồn khoa học; (4) Báo cáo sự cố ảo giác AI cho bác sĩ hướng dẫn nếu phát hiện thông tin chẩn đoán sai lệch.
        </p>
      </div>
    </div>
  );
}
