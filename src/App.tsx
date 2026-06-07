import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, GraduationCap, CheckSquare, Mail, Layers, FileText, ChevronRight, BookOpen, AlertTriangle, Eye, FileDown, LayoutGrid, Columns, Printer, ListTree, Moon, Sun } from 'lucide-react';
import stepEvidenceByProject from './data/step-evidence.json';
import { LESSON_STEPS } from './data/lesson-steps';
import { ProcessStepAccordion, getDefaultExpandedSteps } from './components/ProcessStepAccordion';
import { QuickNavDrawer } from './components/QuickNavDrawer';
import { PortfolioIntroMedia } from './components/PortfolioIntroMedia';
import { LessonMiniToc } from './components/LessonMiniToc';
import { CustomCursor } from './components/CustomCursor';
import { ScrollHighlightSection } from './components/ScrollHighlightSection';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from './components/ui/card';
import { cn } from './lib/utils';
import { RubricChecklist } from './components/RubricChecklist';
import { RubricProgressMap } from './components/RubricProgressMap';
import { LessonRubricSupplements } from './components/RubricSupplements';
import {
  parsePortfolioUrl,
  applyPortfolioUrl,
  getFullPortfolioUrl,
  PORTFOLIO_LESSON_HASH_RE,
  type PortfolioView,
} from './utils/portfolioUrl';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [currentSection, setCurrentSection] = useState('gioi-thieu');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<PortfolioView>('gallery');
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [urlSynced, setUrlSynced] = useState(false);
  const [deepLinkStep, setDeepLinkStep] = useState<number | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [linkCopied, setLinkCopied] = useState(false);
  /** Chỉ ghi #bai-N lên URL sau khi người dùng chọn bài (tránh nhảy section lúc mở trang) */
  const [urlLessonIndex, setUrlLessonIndex] = useState<number | null>(null);
  const scrollToLessonOnLoadRef = useRef(
    PORTFOLIO_LESSON_HASH_RE.test(window.location.hash),
  );

  // Dark mode — persisted in localStorage, class toggled on <html>
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Keyboard listener for Escape key to close lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetDetailPaneScroll = () => {
    const pane = document.getElementById('dashboard-detail-pane');
    if (pane) pane.scrollTop = 0;
  };

  const scrollToDashboardSection = () => {
    const el = document.getElementById('dashboard-view-container') || document.getElementById('du-an');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Reset scroll pane when switching lessons or view mode
  useEffect(() => {
    resetDetailPaneScroll();
  }, [activeTab, viewMode]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Track scrolling to set active menu highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['gioi-thieu', 'du-an', 'tong-ket'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#gioi-thieu', label: 'Lời Mở Đầu', id: 'gioi-thieu' },
    { href: '#du-an', label: 'Bài Tập Thực Hành', id: 'du-an' },
    { href: '#tong-ket', label: 'Tổng Kết & Suy Ngẫm', id: 'tong-ket' },
  ];

  // The 6 structural digital assignments from the rubric guidelines
  const portfolioProjects = [
    {
      id: 'bt1',
      coverImage: '/images/anh_1.jpg',
      label: 'Bài 1: Hệ điều hành & Tệp tin',
      fullName: 'Bài tập 1 — Quản trị Hệ điều hành & Thao tác tệp tin trên Windows',
      objective: 'Làm chủ các thao tác cơ bản trên Windows File Explorer, tổ chức lưu trữ khoa học với cấu trúc thư mục học thuật chuẩn "ThucHanh_TranMinhLuong" và quản lý vòng đời tệp tin.',
      process: 'Tạo thư mục ThucHanh_TranMinhLuong, tạo file GhiChu.txt và đổi tên thành GhiChuQuanTrong.txt. Tạo thư mục con TaiLieu, thực hiện sao chép và di chuyển tệp tin. Quản lý xóa tệp qua Recycle Bin và xóa vĩnh viễn (Shift + Delete).',
      product: 'Thư mục học thuật "ThucHanh_TranMinhLuong" có cấu trúc phân cấp chuẩn và ảnh chụp minh chứng.',
      fileUrl: '/files/Bai_1_TranMinhLuong.pdf',
      fileName: 'Bai_1_TranMinhLuong.pdf',
      fileType: 'pdf',
      skills: ['Windows 11', 'Quản lý tệp tin', 'Bảo mật hệ thống', 'Phân cấp dữ liệu'],
      images: ['/images/steps/bt1/01.png', '/images/steps/bt1/02.png'],
      imageDescriptions: [
        'Ảnh 1: Cấu trúc thư mục "ThucHanh_TranMinhLuong" được phân cấp khoa học trên File Explorer.',
        'Ảnh 2: Quá trình thao tác tạo mới, sao chép và di chuyển tệp tin vào thư mục TaiLieu.'
      ],
      detailedSummary: 'Bài tập 1 tập trung rèn luyện các thao tác quản lý tệp tin và thư mục trên Windows. Em đã thiết lập thư mục học thuật chuẩn "ThucHanh_TranMinhLuong" và các thư mục con để lưu trữ dữ liệu. Qua đó nắm vững các thao tác Copy, Cut, Paste, Recycle Bin và Shift+Delete.'
    },
    {
      id: 'bt2',
      coverImage: '/images/anh_2.jpg',
      label: 'Bài 2: Đánh giá tài liệu học thuật',
      fullName: 'Bài tập 2 — Báo cáo đánh giá tài liệu nghiên cứu xét nghiệm PCR',
      objective: 'Ứng dụng các công cụ tìm kiếm nâng cao (Google Scholar, PubMed) kết hợp toán tử Boolean để thu thập và đánh giá độ tin cậy của các tài liệu học thuật về chủ đề "Ứng dụng xét nghiệm PCR trong chẩn đoán bệnh truyền nhiễm".',
      process: 'Xây dựng biểu thức Boolean, tìm kiếm tài liệu trên Google Scholar và PubMed, đánh giá độ tin cậy của các nguồn tài liệu dựa trên các tiêu chí chuẩn hóa (Tác giả, Đơn vị xuất bản, Phương pháp, Số lần trích dẫn, Tính cập nhật).',
      product: 'Báo cáo đánh giá học thuật và bảng thẩm định độ tin cậy của các nguồn tài liệu nghiên cứu PCR.',
      fileUrl: '/files/Bai_2_TranMinhLuong.pdf',
      fileName: 'Bai_2_TranMinhLuong.pdf',
      fileType: 'pdf',
      skills: ['Google Scholar', 'PubMed Search', 'Thẩm định tài liệu', 'Kỹ thuật xét nghiệm'],
      images: [],
      imageDescriptions: [],
      detailedSummary: 'Bài tập 2 rèn luyện kỹ năng tìm kiếm và đánh giá tài liệu học thuật một cách khoa học. Em đã áp dụng các tiêu chí học thuật để thẩm định các nguồn tài liệu về xét nghiệm PCR, giúp nâng cao tư duy phản biện và sàng lọc thông tin chất lượng cao phục vụ nghiên cứu y sinh.'
    },
    {
      id: 'bt3',
      coverImage: '/images/anh_3.jpg',
      label: 'Bài 3: Kỹ nghệ Prompt Engineering',
      fullName: 'Bài tập 3 — Tối ưu hóa thiết kế prompt trong học tập y khoa',
      objective: 'So sánh hiệu quả của các kỹ thuật viết prompt từ cơ bản đến nâng cao (CLEAR/CRAC) phục vụ các tác vụ: Tóm tắt tài liệu học thuật (Điều hòa lưu lượng lọc cầu thận), giải thích thuật ngữ sinh lý phức tạp, và thiết kế câu hỏi ôn tập lâm sàng.',
      process: 'Thiết kế 3 cấp độ prompt cho từng tác vụ: Cơ bản, Cải tiến và Nâng cao (Role, Few-shot, CoT). Chạy thử trên Google Gemini và đánh giá sự khác biệt trong độ sâu, tính chính xác và tính ứng dụng của phản hồi.',
      product: 'Báo cáo kỹ thuật Prompt Engineering và Bảng so sánh 3 cấp độ prompt trên Gemini đối với chủ đề điều hòa GFR.',
      fileUrl: '/files/Bai_3_TranMinhLuong.pdf',
      fileName: 'Bai_3_TranMinhLuong.pdf',
      fileType: 'pdf',
      skills: ['Prompt Engineering', 'CLEAR / CRAC', 'Few-shot Learning', 'Chain-of-Thought'],
      images: ['/images/steps/bt3/01.png', '/images/steps/bt3/02.png'],
      imageDescriptions: [
        'Ảnh 1: Thiết kế và thử nghiệm prompt nâng cao CLEAR/CRAC về sinh lý cầu thận trên Google Gemini.',
        'Ảnh 2: Bảng so sánh hiệu quả và độ chi tiết của phản hồi giữa các cấp độ prompt.'
      ],
      detailedSummary: 'Bài tập 3 giúp em làm chủ kỹ năng Prompt Engineering. Bằng cách áp dụng các nguyên tắc nâng cao như gán vai trò chuyên gia, cung cấp ví dụ mẫu (Few-shot) và dẫn dắt tư duy (CoT), em đã giúp AI đưa ra cách giải thích sinh động về GFR và tạo bộ câu hỏi ôn tập lâm sàng chất lượng cao.'
    },
    {
      id: 'bt4',
      coverImage: '/images/anh_4.jpg',
      label: 'Bài 4: Cộng tác đám mây & Kanban',
      fullName: 'Bài tập 4 — Cộng tác trực tuyến và điều phối dự án Hóa sinh lâm sàng',
      objective: 'Ứng dụng các công cụ đám mây (Trello, Word, Drive, Zalo, Google Meet) để lên kế hoạch, phân công và phối hợp thực hiện dự án nghiên cứu nhóm về chủ đề "Ứng dụng AI trong xét nghiệm hóa sinh".',
      process: 'Cấu hình bảng Kanban trên Trello, thiết lập cấu trúc thư mục Google Drive nhóm, cộng tác biên tập báo cáo trên MS Word, họp trao đổi qua Google Meet và tối ưu hóa giao tiếp qua Zalo nhóm.',
      product: 'Không gian cộng tác Kanban Trello, thư mục Drive nhóm và báo cáo phân tích thách thức hợp tác nhóm.',
      fileUrl: '/files/Bai_4_TranMinhLuong.pdf',
      fileName: 'Bai_4_TranMinhLuong.pdf',
      fileType: 'pdf',
      skills: ['Kanban Trello', 'Microsoft Word', 'Cộng tác đám mây', 'Version Control'],
      images: ['/images/steps/bt4/01.png', '/images/steps/bt4/02.png'],
      imageDescriptions: [
        'Ảnh 1: Quản trị tiến độ công việc nhóm trực quan trên bảng Kanban Trello.',
        'Ảnh 2: Cấu trúc thư mục đa cấp và quy tắc đặt tên file đồng nhất trên Google Drive.'
      ],
      detailedSummary: 'Bài tập 4 giúp em nâng cao kỹ năng làm việc nhóm trực tuyến. Em đã học cách tổ chức tài nguyên khoa học trên Drive, điều phối tác vụ qua Trello và giải quyết các xung đột dữ liệu thực tế bằng các công cụ cộng tác thời gian thực.'
    },
    {
      id: 'bt5',
      coverImage: '/images/anh_5.jpg',
      label: 'Bài 5: Sáng tạo nội dung số với AI',
      fullName: 'Bài tập 5 — Thiết kế infographic Trợ lý phục hồi chức năng sau tai biến',
      objective: 'Sử dụng các công cụ AI tạo sinh (Gemini, ChatGPT, DALL-E, Canva AI) để thiết kế bài viết blog và Infographic truyền thông về đề tài "Trợ lý ảo Phục hồi chức năng tại nhà cho bệnh nhân sau tai biến".',
      process: 'Sử dụng Gemini/ChatGPT lên ý tưởng và dàn ý nội dung. Sử dụng DALL-E tạo ảnh nhân vật điều dưỡng 3D thân thiện hỗ trợ tập luyện theo phong cách Pixar. Canva thiết kế infographic khoa học đan xen hình ảnh.',
      product: 'Bài viết blog giới thiệu giải pháp trợ lý ảo và Infographic truyền thông Canva chuyên nghiệp.',
      fileUrl: '/files/Bai_5_TranMinhLuong.pdf',
      fileName: 'Bai_5_TranMinhLuong.pdf',
      fileType: 'pdf',
      skills: ['Canva AI', 'Google Gemini', 'DALL-E 3', 'Truyền thông sức khỏe'],
      images: ['/images/steps/bt5/01.jpeg', '/images/steps/bt5/02.jpeg'],
      imageDescriptions: [
        'Ảnh 1: Bản thiết kế Infographic trợ lý phục hồi chức năng tai biến trên Canva.',
        'Ảnh 2: Hình ảnh nhân vật điều dưỡng 3D hỗ trợ bệnh nhân do DALL-E tạo lập.'
      ],
      detailedSummary: 'Bài tập 5 giúp em làm chủ quy trình sáng tạo nội dung số trong lĩnh vực chăm sóc sức khỏe. Sự phối hợp giữa AI tạo chữ (Gemini), tạo ảnh (DALL-E) và công cụ thiết kế (Canva) giúp tạo ra ấn phẩm truyền thông y học trực quan, nâng cao nhận thức cộng đồng.'
    },
    {
      id: 'bt6',
      coverImage: '/images/anh_6.jpg',
      label: 'Bài 6: Đạo đức AI & Liêm chính',
      fullName: 'Bài tập 6 — Sử dụng AI có trách nhiệm trong học tập và nghiên cứu',
      objective: 'Nghiên cứu chính sách AI của VNU/UMP và xây dựng bộ nguyên tắc cá nhân sử dụng AI có trách nhiệm thông qua thực hành viết bài luận đạo đức học thuật.',
      process: 'Tìm hiểu quy định đào tạo và liêm chính học thuật của VNU/UMP, dùng ChatGPT hỗ trợ lập dàn ý bài luận đạo đức công nghệ, thực hiện hiệu đính thuật ngữ chuyên ngành (ảo giác AI, đạo văn phi truyền thống) và đúc kết bộ nguyên tắc vàng.',
      product: 'Báo cáo liêm chính học thuật và Bộ nguyên tắc cá nhân về sử dụng AI có trách nhiệm.',
      fileUrl: '/files/Bai_6_TranMinhLuong.pdf',
      fileName: 'Bai_6_TranMinhLuong.pdf',
      fileType: 'pdf',
      skills: ['AI Ethics', 'Liêm chính y học', 'Phản biện học thuật', 'Fact-checking AI'],
      images: [],
      imageDescriptions: [],
      detailedSummary: 'Bài tập 6 định hình tư duy sử dụng AI có trách nhiệm. Qua việc thực hành lập bài luận đạo đức số, em hiểu rằng AI chỉ là công cụ bổ trợ, giá trị cốt lõi nằm ở tư duy độc lập, tinh thần trách nhiệm giải trình và sự liêm chính học thuật của bản thân.'
    }
  ];

  const navigateToLesson = useCallback(
    (index: number, stepIndex: number | null = null) => {
      setActiveTab(index);
      setUrlLessonIndex(index);
      setViewMode('dashboard');
      setDeepLinkStep(stepIndex);
      setQuickNavOpen(false);
      setMenuOpen(false);
      setTimeout(() => scrollToDashboardSection(), 80);
    },
    [],
  );

  const handleSidebarProjectClick = (index: number) => {
    navigateToLesson(index);
  };

  useEffect(() => {
    const parsed = parsePortfolioUrl();
    if (parsed.lessonIndex != null) {
      setActiveTab(parsed.lessonIndex);
      setUrlLessonIndex(parsed.lessonIndex);
    }
    setViewMode(parsed.view);
    if (parsed.stepIndex != null) {
      setDeepLinkStep(parsed.stepIndex);
      setViewMode('dashboard');
    }
    setUrlSynced(true);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const parsed = parsePortfolioUrl();
      if (parsed.lessonIndex != null) {
        setActiveTab(parsed.lessonIndex);
        setUrlLessonIndex(parsed.lessonIndex);
      } else {
        setUrlLessonIndex(null);
      }
      setViewMode(parsed.view);
      setDeepLinkStep(parsed.stepIndex);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!urlSynced) return;
    applyPortfolioUrl({
      lessonIndex: urlLessonIndex,
      view: viewMode,
      stepIndex: deepLinkStep,
    });
  }, [urlLessonIndex, viewMode, deepLinkStep, urlSynced]);

  useEffect(() => {
    if (!urlSynced || !scrollToLessonOnLoadRef.current) return;
    scrollToLessonOnLoadRef.current = false;
    if (urlLessonIndex != null && viewMode === 'dashboard') {
      setTimeout(() => scrollToDashboardSection(), 250);
    }
  }, [urlSynced, urlLessonIndex, viewMode]);

  useEffect(() => {
    const projectId = portfolioProjects[activeTab]?.id as keyof typeof stepEvidenceByProject;
    const stepImages = stepEvidenceByProject[projectId] ?? [];
    setExpandedSteps(getDefaultExpandedSteps(stepImages, deepLinkStep));
  }, [activeTab, deepLinkStep]);

  useEffect(() => {
    if (!urlSynced || deepLinkStep == null || viewMode !== 'dashboard') return;
    const t = window.setTimeout(() => {
      document.getElementById(`step-${deepLinkStep + 1}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 450);
    return () => clearTimeout(t);
  }, [deepLinkStep, activeTab, viewMode, urlSynced]);

  const copyLessonLink = async () => {
    try {
      await navigator.clipboard.writeText(
        getFullPortfolioUrl(activeTab, viewMode, deepLinkStep),
      );
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      /* clipboard blocked */
    }
  };

  const handleMainNavClick = (sectionId: string) => {
    setMenuOpen(false);
    if (sectionId === 'gioi-thieu' || sectionId === 'tong-ket' || sectionId === 'du-an') {
      setUrlLessonIndex(null);
      setDeepLinkStep(null);
    }
  };

  const jumpToStep = (stepIndex: number) => {
    setUrlLessonIndex((prev) => prev ?? activeTab);
    setDeepLinkStep(stepIndex);
    setExpandedSteps((prev) => new Set([...prev, stepIndex]));
    setQuickNavOpen(false);
    window.setTimeout(() => {
      document.getElementById(`step-${stepIndex + 1}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 150);
  };

  const toggleProcessStep = (stepIndex: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepIndex)) next.delete(stepIndex);
      else next.add(stepIndex);
      return next;
    });
  };

  const getSelectedImageDescription = () => {
    if (!selectedImage) return '';
    const projectId = portfolioProjects[activeTab].id as keyof typeof stepEvidenceByProject;
    const evidence = stepEvidenceByProject[projectId] ?? [];
    
    let stepIndex = -1;
    let imgSubIndex = -1;
    for (let i = 0; i < evidence.length; i++) {
      const item = evidence[i];
      if (item === selectedImage) {
        stepIndex = i;
        break;
      } else if (Array.isArray(item)) {
        const idx = item.indexOf(selectedImage);
        if (idx !== -1) {
          stepIndex = i;
          imgSubIndex = idx;
          break;
        }
      }
    }
    
    if (stepIndex === -1) return '';
    
    const steps = LESSON_STEPS[activeTab] ?? [];
    const stepText = steps[stepIndex]?.text || '';
    const cleanText = stepText.replace(/^\d+\.\s*/, '');
    const subIndexStr = imgSubIndex !== -1 ? ` (Hình ảnh ${imgSubIndex + 1})` : '';
    return `Minh chứng bước ${stepIndex + 1}${subIndexStr}: ${cleanText}`;
  };

  const getBadgeStyleClass = (skillIndex: number) => {
    const classes = ['badge-blue', 'badge-purple', 'badge-violet', 'badge-purple', 'badge-blue', 'badge-emerald'];
    return `skill-badge ${classes[skillIndex % classes.length]}`;
  };

  const renderDetailedProcess = (tabIndex: number) => {
    const projectId = portfolioProjects[tabIndex].id as keyof typeof stepEvidenceByProject;
    const stepImages = stepEvidenceByProject[projectId] ?? [];
    const steps = LESSON_STEPS[tabIndex] ?? [];

    return (
      <div className="space-y-3 bg-blue-50/30 p-5 border border-blue-100/60 rounded-2xl print:bg-white print:border-slate-300">
        <p className="text-[10px] text-blue-600/70 font-semibold italic print:text-slate-700">
          Mở từng bước để xem mô tả chi tiết và minh chứng. Badge đánh dấu Prompt/AI, Human-in-the-loop và ảnh kết quả.
        </p>
        <ProcessStepAccordion
          lessonNumber={tabIndex + 1}
          steps={steps}
          stepImages={stepImages}
          expandedSteps={expandedSteps}
          onToggleStep={toggleProcessStep}
          onExpandStep={(idx) =>
            setExpandedSteps((prev) => new Set([...prev, idx]))
          }
          onImageClick={setSelectedImage}
        />
      </div>
    );
  };

  // ── 3-D Tilt Card effect: gentle perspective rotate on mouse-move ──
  const handleTiltMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;   // max ±8deg
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    card.style.transition = 'transform 0.08s linear, box-shadow 0.3s ease';
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement;
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease';
  };

  return (
    <div className="flex min-h-screen gradient-bg-elegant text-[#1b365d] relative overflow-hidden">
      {/* Custom interactive cursor — renders on top of everything */}
      <CustomCursor />
      {/* Fixed Background Image - Elegant, Lightweight & High Performance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img 
          src="/images/anh_6.jpg" 
          alt="Trần Minh Lượng - Background" 
          className="w-full h-full object-cover opacity-15 dark:opacity-8 filter saturate-50"
        />
        {/* Clean white overlay — blue-on-white theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white/85 to-blue-50/20 dark:from-[#090d16]/90 dark:via-[#0b0f19]/95 dark:to-[#090d16]/90" />
      </div>

      {/* 1. Desktop Persistent Left Sidebar Navigation */}
      <aside className="hidden xl:flex flex-col w-[280px] bg-white/95 dark:bg-[#071530]/95 border-r-[2.5px] border-[#1b365d]/20 dark:border-[#60a5fa]/20 h-screen sticky top-0 pt-8 pb-0 justify-between shrink-0 z-30 shadow-[6px_0_0_0_rgba(30,64,175,0.06)] backdrop-blur-md">
        <div className="flex flex-col">
          {/* Sidebar Header Brand Logo */}
          <div className="px-6 pb-6 border-b-[2.5px] border-[#1b365d]/15 dark:border-[#60a5fa]/15">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-xl bg-[#1b365d] flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-300/30">
                DS
              </span>
              <span className="text-[#1b365d] dark:text-blue-200 text-base font-extrabold tracking-tight block font-sans">
                PORTFOLIO SỐ
              </span>
            </div>
            <span className="text-xs font-bold text-[#1b365d] dark:text-blue-400 uppercase tracking-widest block pl-0.5">
              Trần Minh Lượng
            </span>
            <span className="text-[10px] text-[#1b365d]/60 dark:text-blue-300/70 font-semibold block mt-1 pl-0.5">
              Sinh viên lớp VNU1001-E252028 • VNU-UMP
            </span>
          </div>

          {/* Sidebar Navigation Tree */}
          <nav className="mt-6 flex flex-col gap-1 px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleMainNavClick(link.id)}
                className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all dark:text-blue-200 dark:hover:text-white ${
                  currentSection === link.id ? 'active dark:!text-blue-300 dark:!bg-blue-950/60 dark:!border-blue-400' : ''
                }`}
              >
                {link.id === 'gioi-thieu' && <GraduationCap className="w-4.5 h-4.5 text-[#1b365d] dark:text-blue-400" />}
                {link.id === 'du-an' && <FileText className="w-4.5 h-4.5 text-[#1b365d] dark:text-blue-400" />}
                {link.id === 'tong-ket' && <BookOpen className="w-4.5 h-4.5 text-[#1b365d] dark:text-blue-400" />}
                {link.label}
              </a>
            ))}

            {/* Nested Project Structure inside sidebar */}
            <div className="mt-4 pl-3 border-l-2 border-[#dbeafe] dark:border-blue-900/50 ml-6 flex flex-col gap-1.5">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#1b365d]/40 dark:text-blue-400/60 block py-1 px-2">
                Bài tập thực hành
              </span>
              {portfolioProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => handleSidebarProjectClick(idx)}
                  className={`text-left text-xs font-semibold py-2 px-2.5 rounded-lg transition-all ${
                    activeTab === idx 
                    ? 'text-[#1b365d] dark:text-blue-200 bg-[#dbeafe]/50 dark:bg-blue-950/60 font-extrabold border-r-2 border-[#1b365d] shadow-sm' 
                    : 'text-[#1b365d]/60 dark:text-blue-400 hover:text-[#1b365d] dark:hover:text-blue-200 hover:bg-[#fff5f9] dark:hover:bg-blue-900/30'
                  }`}
                >
                  Bài {idx + 1}: {proj.label.split(':')[1]?.trim() || proj.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Sidebar Footer Details */}
        <div className="w-full px-6 py-5 border-t border-[#1b365d]/15 dark:border-blue-900/50 text-[11px] text-[#1b365d]/60 dark:text-blue-400 space-y-2 bg-[#fff5f9]/25 dark:bg-blue-950/10 mt-auto">
          <p className="font-extrabold text-[#1b365d] dark:text-blue-300 tracking-wide uppercase text-[9px]">Liên hệ hỗ trợ:</p>
          <div className="flex items-center gap-2 text-[#1b365d] dark:text-blue-300">
            <Mail className="w-3.5 h-3.5 text-[#1b365d] shrink-0" />
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=25100773@vnu.edu.vn" target="_blank" rel="noopener noreferrer" className="truncate font-bold text-[#1b365d] dark:text-blue-400 hover:underline">
              25100773@vnu.edu.vn
            </a>
          </div>
        </div>
      </aside>

      {/* Main Right Scrollable Layout */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        {/* 2. Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white/92 dark:bg-[#071530]/95 backdrop-blur-md border-b-[2.5px] border-[#1b365d]/15 dark:border-[#60a5fa]/15 px-4 sm:px-6 py-4 flex items-center justify-between xl:justify-end">
          <div className="flex items-center gap-2 xl:hidden">
            <span className="w-7 h-7 rounded-lg bg-[#1b365d] flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-blue-300/20">
              DS
            </span>
            <span className="text-[#1b365d] dark:text-blue-200 font-extrabold text-sm sm:text-base tracking-tight font-sans">
              PORTFOLIO • Trần Minh Lượng
            </span>
          </div>

          {/* Top menu for screens < 1280px */}
          <div className="hidden lg:flex xl:hidden items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleMainNavClick(link.id)}
                className={`nav-top-link text-xs sm:text-sm font-bold py-1 transition-all ${
                  currentSection === link.id ? 'active' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=25100773@vnu.edu.vn', '_blank')}
              className="hidden sm:flex rounded-xl text-xs active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" /> Gửi VNU Gmail
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode((v) => !v)}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#fff5f9] dark:bg-blue-900/60 text-[#1b365d] dark:text-blue-300 hover:bg-[#dbeafe] dark:hover:bg-blue-900 transition-colors cursor-pointer"
              aria-label={darkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              title={darkMode ? 'Giao diện sáng' : 'Giao diện tối'}
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="xl:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#fff5f9] dark:bg-blue-900/60 text-[#1b365d] dark:text-blue-200 hover:bg-[#dbeafe] dark:hover:bg-blue-900 transition-colors cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </header>

        {/* Mobile menu drawer overlay */}
        {menuOpen && (
          <div
            className="xl:hidden fixed inset-0 z-40 bg-[#1b365d]/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile menu drawer */}
        <div
          className={`xl:hidden fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-xs bg-white dark:bg-[#071530] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-16 px-6 pb-6">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#dbeafe] dark:border-blue-900">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#1b365d] flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                  DS
                </span>
                <span className="text-[#1b365d] dark:text-blue-200 font-extrabold text-sm">PORTFOLIO</span>
              </div>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="w-8 h-8 rounded-full bg-[#fff5f9] dark:bg-blue-900/60 flex items-center justify-center text-[#1b365d] dark:text-blue-300"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            
            <nav className="mt-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleMainNavClick(link.id)}
                  className={`text-sm font-bold text-[#1b365d] dark:text-blue-200 py-3 border-b border-[#dbeafe]/60 dark:border-blue-900/50 flex items-center gap-2 ${
                    currentSection === link.id ? 'text-[#1b365d] dark:text-blue-400 border-b-2 border-[#1b365d]/40' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t-2 border-[#dbeafe]/40">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#1b365d]/50 dark:text-sky-500 block mb-2 px-1">
                  {portfolioProjects.length} bài tập
                </span>
                {portfolioProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => navigateToLesson(idx)}
                    className={`w-full text-left text-xs font-bold py-2.5 px-2 rounded-lg mb-1 cursor-pointer ${
                      activeTab === idx ? 'bg-[#fff5f9] dark:bg-blue-950/60 text-[#1b365d] dark:text-blue-300' : 'text-[#1b365d]/70 dark:text-blue-300 hover:bg-[#fff5f9] dark:hover:bg-blue-900/40'
                    }`}
                  >
                    #bai-{idx + 1} · {proj.label.split(':')[0]}
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t-2 border-[#dbeafe]/40 dark:border-blue-900 text-xs text-[#1b365d]/60 dark:text-blue-400 space-y-2 bg-[#fff5f9]/20 dark:bg-blue-950/20 p-4 rounded-xl">
              <p className="font-extrabold text-[#1b365d] dark:text-blue-300 text-xs uppercase tracking-wide">Trần Minh Lượng</p>
              <p className="font-semibold text-[#1b365d] dark:text-blue-300">Trường Đại học Y Dược, ĐHQGHN</p>
              <p className="text-[#1b365d] dark:text-blue-400 font-bold truncate">Gmail: 25100773@vnu.edu.vn</p>
            </div>
          </div>
        </div>

        {/* 3. Header Banner */}
        <section className="relative h-[260px] sm:h-[320px] md:h-[360px] w-full overflow-hidden flex items-center justify-center dark-gradient-banner">
          {/* Static nature background inside header banner */}
          <img 
            src="/images/anh_6.jpg" 
            alt="Trần Minh Lượng - VNU University of Medicine and Pharmacy" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Deep blue semi-transparent banner overlay */}
          <div className="absolute inset-0 bg-[#1b365d]/70 z-10" />

          {/* Banner Contents */}
          <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl">
            <p className="text-[#dbeafe] text-[13px] sm:text-[16px] md:text-[18px] font-bold tracking-widest uppercase drop-shadow-md font-sans">
              Hành Trình Trải Nghiệm &amp; Kỹ Năng Số Học Thuật
            </p>
            
            {/* The main title */}
            <h1 className="banner-name text-white mt-3 drop-shadow-lg tracking-tight text-center">
              Trần Minh Lượng
            </h1>

            <p className="text-[#dbeafe] text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto font-semibold drop-shadow-sm">
              Sinh viên lớp VNU1001-E252028 • VNU University of Medicine and Pharmacy
            </p>

            {/* Highlight Accent Line below title */}
            <div className="mt-5 bg-[#dbeafe] h-2 w-32 mx-auto rounded-none shadow-lg shadow-blue-300/30" />
          </div>
        </section>

        {/* 4. Page: Lời mở đầu (Giới thiệu) */}
        <section id="gioi-thieu" className="py-16 sm:py-20 px-6 sm:px-10 md:px-16 max-w-5xl mx-auto w-full relative">
          <div className="text-center mb-12">
            <h3 className="academic-section-title uppercase">
              Lời Mở Đầu
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center items-start relative z-10">
            {/* Left side: Profile Card */}
            <div className="md:col-span-4">
              <PortfolioIntroMedia />
            </div>

            {/* Right side: Welcome & Goals */}
            <div className="md:col-span-8 space-y-6">
              {/* Welcome Card — scroll highlight */}
              <ScrollHighlightSection defaultActive={true} className="glass-panel dark:bg-[#071530]/80 p-6 sm:p-8 rounded-3xl space-y-4">
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-justify font-medium">
                  Sự giao thoa giữa <strong className="text-[#1b365d] dark:text-white">y học truyền thống và kỷ nguyên số</strong> đang mở ra những bước ngoặt lớn trong việc tối ưu hóa chất lượng chăm sóc sức khỏe cộng đồng. Là một sinh viên thuộc khối ngành <strong className="text-[#1b365d] dark:text-white">Khoa học sức khỏe tại Đại học Quốc gia Hà Nội</strong>, tôi nhận thức sâu sắc rằng việc làm chủ công nghệ không còn là một kỹ năng bổ trợ, mà đã trở thành năng lực cốt lõi để hiện đại hóa ngành Y tế.
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-justify font-medium">
                  Tập hồ sơ năng lực này là cuốn nhật ký ghi lại hành trình chuyển đổi tư duy và hoàn thiện kỹ năng số của bản thân qua chuỗi bài tập thực hành thiết thực. Đi từ các thao tác <strong className="text-[#1b365d] dark:text-white">quản trị dữ liệu lâm sàng căn bản</strong>, phương pháp điều phối dự án nhóm từ xa, cho đến việc ứng dụng <strong className="text-[#1b365d] dark:text-white">Trí tuệ nhân tạo (GenAI)</strong> trong sáng tạo nội dung giáo dục sức khỏe và thiết kế quy trình <strong className="text-[#1b365d] dark:text-white">y tế từ xa (Telemedicine)</strong>, toàn bộ nội dung sẽ minh chứng cho nỗ lực kết hợp hài hòa giữa kiến thức chuyên môn y khoa và công nghệ số nhằm giải quyết các bài toán thực tế của ngành.
                </p>
              </ScrollHighlightSection>

              {/* Goal Card — scroll highlight */}
              <ScrollHighlightSection className="p-5 bg-[#fff5f9] dark:bg-blue-950/40 border-2 border-[#dbeafe] dark:border-blue-900/30 rounded-2xl space-y-2">
                <span className="text-xs font-black text-[#1b365d] dark:text-blue-300 uppercase tracking-widest block font-sans">
                  Mục Tiêu Portfolio
                </span>
                <p className="text-xs sm:text-sm text-[#1b365d]/80 dark:text-blue-300 leading-relaxed font-semibold text-justify">
                  Hồ sơ năng lực này được xây dựng nhằm hệ thống hóa một cách khoa học toàn bộ năng lực số, từ kỹ năng kỹ thuật, khai thác AI đến năng lực quản trị dự án y tế trực tuyến mà tôi đã tích lũy. Thông qua việc chuẩn hóa quy trình làm việc và ứng dụng các công cụ trực quan, tôi hướng đến việc định hình một phong cách làm việc chuyên nghiệp, bảo mật và có tổ chức cao trong môi trường y tế hiện đại. Đây cũng là nền tảng khẳng định tinh thần chủ động tự học, sự nhạy bén trước các làn sóng đổi mới sáng tạo số và cam kết tuân thủ nghiêm túc các chuẩn mực liêm chính học thuật cũng như đạo đức số trong nghiên cứu khoa học sức khỏe.
                </p>
              </ScrollHighlightSection>
            </div>
          </div>

          {/* Academic Focus Cards & Portfolio Checklist centering under row 1 */}
          <div className="relative z-10 mt-8 space-y-6">
            {/* Row/Grid of Academic Focus Cards — tilt interaction */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Profile Card 1 */}
              <div
                className="glass-panel hover-lift rounded-2xl p-5 dark:bg-[#071530]/70 shadow-sm flex flex-col justify-center items-center text-center gap-2.5 min-h-[180px]"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="flex items-center gap-2 text-[#1b365d] dark:text-blue-300 font-extrabold text-xs font-sans uppercase tracking-wide">
                  <GraduationCap className="w-4 h-4 text-[#1b365d] dark:text-blue-400 shrink-0" />
                  Chuyên ngành
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  <strong className="text-[#1b365d] dark:text-white">Trần Minh Lượng</strong>, sinh viên thuộc khối ngành Điều dưỡng , hệ thống thông tin (Lớp VNU1001-E252028). Trường Đại học Y Dược, Đại học Quốc gia Hà Nội (VNU-UMP).
                </p>
              </div>

              {/* Profile Card 2 */}
              <div
                className="glass-panel hover-lift rounded-2xl p-5 dark:bg-[#071530]/70 shadow-sm flex flex-col justify-center items-center text-center gap-2.5 min-h-[180px]"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="flex items-center gap-2 text-[#1b365d] dark:text-blue-300 font-extrabold text-xs font-sans uppercase tracking-wide">
                  <Layers className="w-4 h-4 text-[#1b365d] dark:text-blue-400 shrink-0" />
                  Lĩnh vực quan tâm
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  Định hướng học tập và nghiên cứu của tôi tập trung vào việc ứng dụng công nghệ số và trí tuệ nhân tạo trong <strong className="text-[#1b365d] dark:text-white">y tế từ xa (Telemedicine)</strong>, đặc biệt là xây dựng giải pháp sàng lọc, quản lý và theo dõi điều trị cho bệnh nhân mắc bệnh mãn tính ở các khu vực khó tiếp cận y tế chuyên khoa. Bên cạnh đó, tôi dành sự quan tâm lớn cho kỹ nghệ thiết kế prompt tối ưu phục vụ tóm tắt tài liệu học thuật lâm sàng và khai thác <strong className="text-[#1b365d] dark:text-white">GenAI</strong> trong sáng tạo nội dung truyền thông giáo dục sức khỏe trực quan.
                </p>
              </div>

              {/* Profile Card 3 */}
              <div
                className="glass-panel hover-lift rounded-2xl p-5 dark:bg-[#071530]/70 shadow-sm flex flex-col justify-between"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="flex items-center gap-2 text-[#1b365d] dark:text-blue-300 font-extrabold text-xs mb-2 font-sans uppercase tracking-wide">
                  <CheckSquare className="w-4 h-4 text-[#1b365d] dark:text-blue-400 shrink-0" />
                  Kỹ năng cốt lõi
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold text-justify">
                  Tôi sở hữu năng lực thực hành toàn diện kết hợp giữa kỹ thuật số và kỹ năng điều phối dự án nhóm chuyên nghiệp. Về mặt kỹ thuật, tôi thành thạo quản trị hệ điều hành <strong className="text-[#1b365d] dark:text-white">Windows</strong> để tổ chức dữ liệu khoa học, làm chủ các nguyên tắc <strong className="text-[#1b365d] dark:text-white">Prompt nâng cao</strong> (Phân tầng nhiệm vụ, Ràng buộc và Định dạng) để khai thác các mô hình ngôn ngữ lớn, và ứng dụng <strong className="text-[#1b365d] dark:text-white">Canva AI</strong> trong thiết kế sản phẩm truyền thông y tế. Về kỹ năng mềm, tôi vận dụng tốt phương pháp <strong className="text-[#1b365d] dark:text-white">Kanban trên Trello</strong> để quản lý tiến độ dự án, phối hợp đồng bộ tài liệu trực tuyến realtime và làm việc nhóm hiệu quả qua các nền tảng số.
                </p>
              </div>
            </div>

            {/* Portfolio Rubric Checklist */}
            <RubricChecklist variant="portfolio" />
          </div>
        </section>

        {/* 5. Page: Bài tập thực hành (Dự án) */}
        <section id="du-an" className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 bg-transparent relative z-10">
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center mb-12">
              <h3 className="academic-section-title uppercase">
                Bài Tập Thực Hành
              </h3>
              <p className="text-xs sm:text-sm text-[#1b365d]/70 dark:text-blue-300 max-w-2xl mx-auto mt-3 font-semibold font-sans">
                Hệ thống {portfolioProjects.length} bài tập lớn rèn luyện năng lực số chuẩn công nghệ số được thực hiện chi tiết theo quy trình nghiên cứu học thuật.
              </p>
            </div>

            {/* Rubric Progress Map (8 items) */}
            <div className="mb-8">
              <RubricProgressMap onGoToLesson={navigateToLesson} />
            </div>

            {/* View Mode Switcher */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/90 dark:bg-[#071530]/80 backdrop-blur-md p-1.5 rounded-xl border-2 border-[#dbeafe] dark:border-blue-900 inline-flex items-center gap-1.5 shadow-sm">
                <button
                  onClick={() => {
                    setViewMode('gallery');
                    setDeepLinkStep(null);
                  }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer',
                    viewMode === 'gallery'
                      ? 'bg-[#1b365d] text-white shadow-sm'
                      : 'text-[#1b365d] hover:text-[#1e3a8a] hover:bg-[#fff5f9] dark:text-blue-300 dark:hover:bg-blue-900/40',
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Chế độ Gallery (Notion)
                </button>
                <button
                  onClick={() => {
                    setViewMode('dashboard');
                    setTimeout(() => scrollToDashboardSection(), 100);
                  }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer',
                    viewMode === 'dashboard'
                      ? 'bg-[#1b365d] text-white shadow-sm'
                      : 'text-[#1b365d] hover:text-[#1e3a8a] hover:bg-[#fff5f9] dark:text-blue-300 dark:hover:bg-blue-900/40',
                  )}
                >
                  <Columns className="w-4 h-4" />
                  Chế độ Dashboard (Phân tích)
                </button>
              </div>
            </div>

            {viewMode === 'gallery' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioProjects.map((proj, idx) => (
                  <Card
                    key={proj.id}
                    className="gallery-tilt-card hover-lift overflow-hidden flex flex-col justify-between h-full rounded-xl border-[#dbeafe] shadow-sm hover:border-[#1b365d]/40 transition-all duration-300"
                    onMouseMove={handleTiltMove}
                    onMouseLeave={handleTiltLeave}
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="h-44 w-full overflow-hidden bg-[#fff5f9] relative group border-b border-[#dbeafe]/30">
                        <img
                          src={proj.coverImage}
                          alt={proj.label}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center rounded-md border-2 border-[#1b365d] bg-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#1b365d] shadow-sm">
                            Bài {idx + 1}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <CardContent className="pt-5 space-y-3">
                        <CardTitle className="text-[#1b365d] dark:text-slate-100 line-clamp-2">
                          {proj.fullName}
                        </CardTitle>
                        
                        {/* Skills badges */}
                        <div className="flex flex-wrap gap-1">
                          {proj.skills.slice(0, 3).map((skill, sIdx) => (
                            <Badge key={sIdx} variant={sIdx % 2 === 0 ? 'default' : 'teal'} className="text-[9px] px-2 py-0.5">
                              {skill}
                            </Badge>
                          ))}
                          {proj.skills.length > 3 && (
                            <Badge variant="secondary" className="text-[9px] px-2 py-0.5">
                              +{proj.skills.length - 3}
                            </Badge>
                          )}
                        </div>

                        <ScrollHighlightSection threshold={0.15} rootMargin="-5% 0px -5% 0px">
                          <p className="text-slate-600 text-xs leading-relaxed text-justify line-clamp-3 font-semibold">
                            {proj.objective}
                          </p>
                        </ScrollHighlightSection>
                      </CardContent>
                    </div>

                    {/* Card Actions */}
                    <CardFooter className="px-5 pb-5 pt-3 border-t-2 border-[#dbeafe]/50 flex items-center justify-between gap-3 bg-[#fff5f9]/30">
                      <Button
                        onClick={() => navigateToLesson(idx)}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="px-2 text-xs text-[#1b365d] hover:text-[#1e3a8a]"
                        data-cursor-label="Xem"
                      >
                        <Eye className="w-3.5 h-3.5" /> Xem chi tiết
                      </Button>
                      
                      {proj.fileUrl && (
                        <a
                          href={proj.fileUrl}
                          download={proj.fileName}
                          className="text-[10px] uppercase font-bold text-[#1b365d] hover:text-[#1b365d] transition-colors flex items-center gap-1 font-sans"
                        >
                          <FileDown className="w-3.5 h-3.5" /> Tải báo cáo
                        </a>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div id="dashboard-view-container" className="scroll-mt-24 glass-panel rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[580px]">
                {/* Left Selector Sidebar */}
                <div className="w-full md:w-[260px] bg-[#fff5f9]/50 dark:bg-[#071530]/60 border-r-2 border-[#dbeafe] dark:border-blue-900/40 flex flex-col shrink-0">
                  <div className="p-5 border-b-2 border-[#dbeafe] dark:border-blue-900/40 bg-[#fff5f9]/60 dark:bg-[#071530]/40">
                    <span className="text-xs font-black text-[#1b365d] dark:text-blue-200 uppercase tracking-widest block font-sans">
                      Danh Sách Bài Học
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col p-3 gap-2">
                    {portfolioProjects.map((proj, idx) => (
                      <button
                        key={proj.id}
                        onClick={() => handleSidebarProjectClick(idx)}
                        className={cn('text-left w-full md:shrink flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold transition-colors active:scale-[0.98]',
                          activeTab === idx
                            ? 'bg-[#1b365d] text-white shadow-sm'
                            : 'text-[#1b365d] hover:text-[#1e3a8a] hover:bg-white bg-white/50 dark:bg-transparent dark:text-blue-300 dark:hover:bg-blue-900/30'
                        )}
                      >
                        <span className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                          activeTab === idx ? 'bg-white text-[#1b365d]' : 'bg-[#dbeafe] text-[#1b365d]'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="truncate font-sans">{proj.label.split(':')[0]}</span>
                        <ChevronRight className={`w-4 h-4 ml-auto hidden md:block ${
                          activeTab === idx ? 'opacity-100' : 'opacity-30'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Detail Pane */}
                <div 
                  id="dashboard-detail-pane"
                  className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white dark:bg-[#030d1a] relative md:max-h-[720px] overflow-y-auto custom-scrollbar"
                >
                  <div key={activeTab} id="lesson-print-area" className="space-y-6 animate-focus-zoom print:animate-none">
                    {/* Title of exercise */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b-2 border-[#dbeafe]/50">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] uppercase font-black text-[#1b365d] bg-[#fff5f9] px-2.5 py-1 rounded-full tracking-widest font-sans border-2 border-[#dbeafe]">
                            Bài Tập Số {activeTab + 1}
                          </span>
                          <span className="text-[9px] uppercase font-black text-[#1b365d] bg-blue-50 px-2.5 py-1 rounded-full tracking-widest font-sans border-2 border-[#dbeafe]">
                            Giáo Trình VNU-UMP
                          </span>
                          <span className="no-print text-[9px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/80">
                            #bai-{activeTab + 1}
                            {deepLinkStep != null ? `-step-${deepLinkStep + 1}` : ''}
                          </span>
                        </div>
                        <p className="text-[#1b365d] dark:text-blue-100 text-xl sm:text-2xl font-black font-sans leading-tight">
                          {portfolioProjects[activeTab].fullName}
                        </p>
                      </div>
                      

                    </div>

                    <LessonMiniToc
                      lessonNumber={activeTab + 1}
                      steps={LESSON_STEPS[activeTab] ?? []}
                      onJumpToStep={jumpToStep}
                    />

                    {/* Core skills badges */}
                    {portfolioProjects[activeTab].skills && (
                      <div className="flex flex-wrap gap-2 pt-1 border-b-2 border-[#dbeafe]/40 pb-4">
                        {portfolioProjects[activeTab].skills.map((skill, skillIdx) => (
                          <span key={skillIdx} className={getBadgeStyleClass(skillIdx)}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Objective (Mục tiêu) */}
                    <div className="space-y-2">
                      <h5 className="text-[#1b365d] text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-3 bg-[#1b365d] rounded-none inline-block" />
                        Mục tiêu bài tập
                      </h5>
                      <ScrollHighlightSection threshold={0.2} rootMargin="-5% 0px -5% 0px">
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify font-medium">
                          {portfolioProjects[activeTab].objective}
                        </p>
                      </ScrollHighlightSection>
                    </div>

                    {/* Detailed Summary */}
                    {portfolioProjects[activeTab].detailedSummary && (
                      <div className="space-y-2 bg-[#fff5f9]/60 p-5 border-l-4 border-[#1b365d] rounded-r-2xl">
                        <h5 className="text-[#1b365d] text-xs sm:text-sm font-extrabold uppercase tracking-widest font-sans">
                          Tóm tắt quá trình thực hiện
                        </h5>
                        <ScrollHighlightSection threshold={0.2} rootMargin="-5% 0px -5% 0px">
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify italic font-semibold">
                            "{portfolioProjects[activeTab].detailedSummary}"
                          </p>
                        </ScrollHighlightSection>
                      </div>
                    )}

                    {/* Implementation Process */}
                    <div className="space-y-2">
                      <h5 className="text-[#1b365d] text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-3 bg-[#1b365d] rounded-none inline-block" />
                        Quy trình thực hiện chi tiết
                      </h5>
                      {renderDetailedProcess(activeTab)}
                    </div>

                    {/* Rubric Supplements (for video embed in Bài 4 etc) */}
                    <div className="space-y-2 pt-4 border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
                      <LessonRubricSupplements tabIndex={activeTab} />
                    </div>

                    {/* Rubric Checklist for current Lesson */}
                    <div className="space-y-2 pt-4 border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
                      <RubricChecklist
                        variant="lesson"
                        lessonIndex={activeTab}
                        lessonLabel={portfolioProjects[activeTab].label}
                      />
                    </div>
                  </div>

                  {/* Previous & Next navigation */}
                  <div className="mt-8 pt-6 border-t-2 border-[#dbeafe]/40 flex items-center justify-between gap-4 w-full flex-wrap sm:flex-nowrap">
                    {activeTab > 0 ? (
                      <button
                        onClick={() => navigateToLesson(activeTab - 1)}
                        className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-[#fff5f9] hover:bg-[#dbeafe] text-[#1b365d] font-bold text-xs transition-all border-2 border-[#dbeafe] cursor-pointer active:scale-95 text-left max-w-full sm:max-w-[48%] w-full sm:w-auto"
                      >
                        <ChevronRight className="w-4.5 h-4.5 rotate-180 shrink-0 text-[#1b365d] animate-pulse" />
                        <div className="truncate">
                          <span className="text-[9px] uppercase block tracking-widest text-[#1b365d]/50 font-black">Bài trước đó</span>
                          Bài {activeTab}: {portfolioProjects[activeTab - 1].label.split(':')[1]?.trim() || portfolioProjects[activeTab - 1].label}
                        </div>
                      </button>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    {activeTab < 5 && (
                      <button
                        onClick={() => navigateToLesson(activeTab + 1)}
                        className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-[#1b365d] hover:bg-[#1e3a8a] text-white font-bold text-xs transition-all border-2 border-[#1b365d] cursor-pointer active:scale-95 text-left max-w-full sm:max-w-[48%] w-full sm:w-auto ml-auto shadow-md shadow-blue-300/30"
                      >
                        <div className="truncate flex-1">
                          <span className="text-[9px] uppercase block tracking-widest text-[#dbeafe] font-black">Bài tiếp theo</span>
                          Bài {activeTab + 2}: {portfolioProjects[activeTab + 1].label.split(':')[1]?.trim() || portfolioProjects[activeTab + 1].label}
                        </div>
                        <ChevronRight className="w-4.5 h-4.5 shrink-0 text-white/90 animate-pulse" />
                      </button>
                    )}
                  </div>

                  {/* Call-to-action details */}
                  <div className="mt-8 pt-6 border-t-2 border-[#dbeafe]/40 flex items-center justify-between flex-wrap gap-5 w-full">
                    <span className="text-[11px] text-[#1b365d]/40 font-bold md:max-w-[40%] leading-relaxed">
                      * Mọi báo cáo và hình ảnh đều được trích dẫn trực tiếp từ sản phẩm gốc của sinh viên Trần Minh Lượng.
                    </span>
                    
                    <div className="no-print flex items-center gap-3 flex-wrap sm:flex-nowrap">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="outline-button text-[#1b365d] text-xs sm:text-sm font-bold px-5 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Printer className="w-4.5 h-4.5 text-[#1b365d] shrink-0" />
                        In / Xuất PDF
                      </button>

                      {portfolioProjects[activeTab].fileUrl && (
                        <a
                          href={portfolioProjects[activeTab].fileUrl}
                          download={portfolioProjects[activeTab].fileName}
                          className="gradient-button text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 active:scale-95 cursor-pointer shadow-md"
                        >
                          <FileDown className="w-4.5 h-4.5 shrink-0" /> Tải xuống báo cáo (.{portfolioProjects[activeTab].fileType})
                        </a>
                      )}

                      <button
                        onClick={() =>
                          window.open(
                            `https://mail.google.com/mail/?view=cm&fs=1&to=25100773@vnu.edu.vn&su=Trao đổi về: ${portfolioProjects[activeTab].label}`,
                            '_blank'
                          )
                        }
                        className="outline-button text-[#1b365d] text-xs sm:text-sm font-bold px-5 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-4.5 h-4.5 text-[#1b365d] shrink-0" /> Liên hệ VNU Gmail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. Page: Tổng kết & Suy ngẫm */}
        <section id="tong-ket" className="py-16 sm:py-20 px-6 sm:px-10 md:px-16 max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-12">
            <h3 className="academic-section-title uppercase">
              Tổng Kết & Suy Ngẫm
            </h3>
            <p className="text-xs sm:text-sm text-[#1b365d]/60 max-w-xl mx-auto mt-3 font-semibold font-sans">
              Đúc kết chặng đường rèn luyện và xây dựng tư duy "Nhà quản trị số" vững vàng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Column 1: Lessons per assignment */}
            <ScrollHighlightSection threshold={0.15} rootMargin="-5% 0px -5% 0px" className="glass-panel hover-lift rounded-2xl p-6 space-y-4 flex flex-col">
              <div className="flex items-center gap-3 text-[#1b365d] dark:text-blue-200 font-extrabold text-sm border-b-2 border-[#dbeafe] dark:border-blue-900/40 pb-3 font-sans">
                <span className="w-8 h-8 rounded-xl bg-[#fff5f9] dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-[#1b365d] dark:text-blue-400" />
                </span>
                Kiến Thức Tích Luỹ
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
                Chuỗi bài tập thực hành thực chiến đã mang lại cho tôi hệ thống kiến thức đa chiều về mối liên kết giữa <strong className="text-[#1b365d] dark:text-white">công nghệ và y học</strong>. Tôi nắm vững các nguyên lý căn bản về lưu trữ, quản lý tệp tin lâm sàng an toàn và bảo mật dữ liệu cục bộ. Trên phương diện chuyên môn, tôi hiểu sâu sắc nguyên lý và phạm vi ứng dụng của <strong className="text-[#1b365d] dark:text-white">kỹ thuật PCR</strong> trong chẩn đoán bệnh truyền nhiễm thông qua việc tổng quan các cơ sở dữ liệu y sinh học quốc tế uy tín. Đồng thời, tôi đã chuẩn hóa được kiến thức về cấu trúc quy trình <strong className="text-[#1b365d] dark:text-white">Telemedicine</strong>, vai trò của trợ lý ảo AI trong hỗ trợ phục hồi chức năng tại nhà, cũng như các mô hình sàng lọc, theo dõi và nhắc nhở điều trị tự động cho bệnh nhân mãn tính.
              </p>
            </ScrollHighlightSection>

            {/* Column 2: Self growth */}
            <ScrollHighlightSection threshold={0.15} rootMargin="-5% 0px -5% 0px" className="glass-panel hover-lift rounded-2xl p-6 space-y-4 flex flex-col justify-start">
              <div className="flex items-center gap-3 text-[#1b365d] dark:text-blue-200 font-extrabold text-sm border-b-2 border-[#dbeafe] dark:border-blue-900/40 pb-3 font-sans">
                <span className="w-8 h-8 rounded-xl bg-[#fff5f9] dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-[#1b365d] dark:text-blue-400" />
                </span>
                Sự Phát Triển Bản Thân
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
                Sự chuyển biến lớn nhất của bản thân tôi chính là việc nâng cấp tư duy từ một người tiếp cận công nghệ thụ động sang vai trò <strong className="text-[#1b365d] dark:text-white">làm chủ công nghệ một cách có trách nhiệm</strong>. Thay vì lạm dụng AI làm xói mòn khả năng tư duy độc lập, tôi đã áp dụng mô hình <strong className="text-[#1b365d] dark:text-white">"con người kiểm soát"</strong>, đặt AI vào vị trí trợ lý hỗ trợ đun nấu ý tưởng, lập dàn ý nội dung và phát hiện lỗi sai, trong khi bản thân giữ quyền thẩm định tối cao dựa trên bằng chứng khoa học.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
                Sự trưởng thành này còn gắn liền với việc tự rèn luyện ý thức <strong className="text-[#1b365d] dark:text-white">"đạo đức số" sâu sắc</strong>, luôn tuân thủ nghiêm túc tính minh bạch, bảo mật thông tin bệnh nhân và tinh thần liêm chính học thuật trong việc khai báo, trích dẫn sự hỗ trợ từ công nghệ.
              </p>
            </ScrollHighlightSection>

            {/* Column 3: Challenges & Resolution */}
            <ScrollHighlightSection threshold={0.15} rootMargin="-5% 0px -5% 0px" className="glass-panel hover-lift rounded-2xl p-6 space-y-4 flex flex-col justify-start">
              <div className="flex items-center gap-3 text-[#1b365d] dark:text-blue-200 font-extrabold text-sm border-b-2 border-[#dbeafe] dark:border-blue-900/40 pb-3 font-sans">
                <span className="w-8 h-8 rounded-xl bg-[#fff5f9] dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#1b365d] dark:text-blue-400" />
                </span>
                Thách Thức & Giải Pháp
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                <p className="text-justify">
                  Trong quá trình thực hiện chuỗi tác vụ chuyên môn phức tạp, tôi đã chủ động vượt qua ba rào cản lớn nhờ những giải pháp mang tính hệ thống và thực tế. Đầu tiên, trước hiện tượng <strong className="text-[#1b365d] dark:text-white">ảo giác và nhiễu thông tin của AI</strong> có thể dẫn đến việc cung cấp kiến thức y khoa sai lệch hoặc nguồn tài liệu không tồn tại, tôi đã áp dụng nguyên tắc phân tầng nhiệm vụ và đặt ràng buộc chặt chẽ trong prompt để định hướng AI suy luận mạch lạc, đồng thời luôn tiến hành kiểm chứng chéo bắt buộc với các giáo trình chính thống hoặc các cơ sở dữ liệu y sinh học quốc tế (PubMed, WHO, CDC) trước khi sử dụng.
                </p>
                <p className="text-justify">
                  Thứ hai, đối với các thách thức về hiển thị tiến độ và <strong className="text-[#1b365d] dark:text-white">cấu trúc thư mục lộn xộn</strong> khi quản lý dự án nhóm trực tuyến trên Drive, tôi đã giải quyết bằng cách thiết lập các thư mục con phân chia rõ ràng theo tiến độ công việc, đồng thời thống nhất một quy tắc đặt tên file đồng bộ giữa các thành viên để tối ưu hóa thời gian tìm kiếm.
                </p>
                <p className="text-justify">
                  Cuối cùng, khi đối mặt với rào cản từ thực địa như hạ tầng Internet chưa đồng đều ở vùng sâu vùng xa và khó khăn của người cao tuổi khi tiếp cận <strong className="text-[#1b365d] dark:text-white">công nghệ Telemedicine</strong>, tôi đã đề xuất giải pháp thiết kế ứng dụng có khả năng lưu trữ dữ liệu ngoại tuyến (offline) để đồng bộ sau, tối ưu hóa giao diện đơn giản, dễ thao tác, kết hợp với việc xây dựng các video hướng dẫn ngắn gọn và biểu tượng trực quan để giúp người bệnh dễ dàng tương tác với hệ thống trợ lý ảo phục hồi chức năng tại nhà.
                </p>
              </div>
            </ScrollHighlightSection>
          </div>

          {/* Summary Rubric Supplement removed */}

          {/* Summary Rubric Checklist */}
          <div className="mt-6">
            <RubricChecklist variant="summary" />
          </div>

          {/* Action row at bottom of conclusion */}
          <div className="mt-12 bg-[#1b365d] text-white border-[2.5px] border-[#1b365d] p-8 rounded-3xl shadow-xl shadow-blue-300/20 text-center space-y-4 relative overflow-hidden">
            {/* Background absolute glowing blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#dbeafe]/15 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />

            <span className="text-[#dbeafe] text-xs font-black uppercase tracking-widest block font-sans">
              Nhà Quản trị Số VNU-UMP • Lộ Trình Phát Triển 2026
            </span>
            <p className="text-white/90 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
              Trang bị tư duy công nghệ bền vững, kỹ năng cộng tác thông minh, sẵn sàng hành trang bước vào giai đoạn chuyển đổi số và quản trị số toàn diện.
            </p>
            <div className="pt-3 flex justify-center gap-4 flex-wrap sm:flex-nowrap relative z-10">
              <a
                href="#du-an"
                className="bg-white text-[#1b365d] text-xs font-black px-6 py-3 rounded-none uppercase tracking-widest transition-all shadow-md hover:-translate-x-[2px] hover:-translate-y-[2px] border-[2.5px] border-white active:scale-95 font-sans"
                style={{boxShadow: '3px 3px 0px rgba(191,219,254,0.6)'}}
              >
                Khám phá 6 Bài học số
              </a>
              <a
                href="#gioi-thieu"
                className="text-white hover:text-[#dbeafe] text-xs font-black py-3 px-6 rounded-none transition-all border-[2.5px] border-white/60 uppercase tracking-widest font-sans"
              >
                Quay lại đầu trang
              </a>
            </div>
          </div>
        </section>

        {/* 7. Academic Footer */}
        <footer className="bg-[#1b365d] border-t-[2.5px] border-[#1e3a8a] py-12 px-6 text-center text-white/80 relative z-10">
          <div className="max-w-5xl mx-auto space-y-4">
            <p className="text-sm font-black uppercase tracking-widest text-white font-sans">
              Trần Minh Lượng • Sinh viên Y Dược Tương Lai
            </p>
            <p className="text-xs text-[#dbeafe] font-semibold max-w-xl mx-auto font-sans">
              Sinh viên lớp VNU1001-E252028 • Trường Đại học Y Dược, Đại học Quốc gia Hà Nội
            </p>
            <p className="text-xs text-white/60 max-w-2xl mx-auto font-medium">
              VNU Gmail: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=25100773@vnu.edu.vn" target="_blank" rel="noopener noreferrer" className="text-[#dbeafe] font-bold hover:underline">25100773@vnu.edu.vn</a> &nbsp;|&nbsp; Địa chỉ học tập: VNU-UMP, VNU-UMP, Cầu Giấy, Hà Nội
            </p>
            <div className="pt-6 text-[10px] text-white/40 border-t border-white/10 max-w-xs mx-auto font-bold font-sans">
              © 2026 Trần Minh Lượng. Navy Blue Portfolio Edition.
            </div>
          </div>
        </footer>

        {/* 8. Quick Nav FAB */}
        <button
          type="button"
          onClick={() => setQuickNavOpen(true)}
          className="quick-nav-fab no-print fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#1b365d] text-white text-xs font-black uppercase tracking-wide shadow-lg shadow-blue-400/40 border-[2.5px] border-[#1e3a8a] hover:scale-105 hover:-translate-x-[2px] hover:-translate-y-[2px] active:scale-95 transition-all cursor-pointer"
          aria-label="Mở điều hướng nhanh"
          style={{boxShadow: '4px 4px 0px #1e3a8a'}}
        >
          <ListTree className="w-4 h-4" />
          <span className="hidden sm:inline">Điều hướng</span>
        </button>

        {linkCopied && (
          <div
            className="no-print fixed bottom-24 right-6 z-50 bg-[#1b365d] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg border-[2.5px] border-[#1e3a8a]"
            role="status"
          >
            Đã sao chép link bài tập
          </div>
        )}

        <QuickNavDrawer
          open={quickNavOpen}
          onClose={() => setQuickNavOpen(false)}
          navLinks={navLinks}
          currentSection={currentSection}
          portfolioProjects={portfolioProjects}
          activeTab={activeTab}
          viewMode={viewMode}
          stepTexts={(LESSON_STEPS[activeTab] ?? []).map((s) => s.text)}
          onSelectSection={(href) => {
            setMenuOpen(false);
            setQuickNavOpen(false);
            const sectionId = href.replace('#', '');
            handleMainNavClick(sectionId);
            window.location.hash = '';
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectLesson={(idx) => navigateToLesson(idx)}
          onSelectView={(view) => {
            setViewMode(view);
            setDeepLinkStep(null);
            if (view === 'dashboard') setTimeout(() => scrollToDashboardSection(), 80);
          }}
          onJumpToStep={jumpToStep}
          onCopyLessonLink={copyLessonLink}
        />

        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-[#1b365d]/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh minh chứng phóng to"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/15 hover:bg-white/25 text-white rounded-xl p-2.5 transition-colors focus:outline-none z-55 cursor-pointer border-2 border-white/20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div 
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Evidence Fullscreen View" 
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border-[2.5px] border-white/20 screenshot-img"
              />
              {(() => {
                const desc = getSelectedImageDescription();
                return desc ? (
                  <div className="bg-white/15 text-white text-xs sm:text-sm py-2.5 px-5 rounded-xl max-w-2xl text-center backdrop-blur-md shadow-md border border-white/20 font-semibold leading-relaxed">
                    {desc}
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
