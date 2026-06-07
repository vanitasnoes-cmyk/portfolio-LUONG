import { ExternalLink, FolderOpen } from 'lucide-react';
import {
  GROUP_DRIVE_FOLDER_URL,
  GROUP_VIDEO_EMBED_URL,
  GROUP_VIDEO_TITLE,
  GROUP_VIDEO_YOUTUBE_URL,
} from '../data/group-deliverables';

interface GroupDeliverablesMediaProps {
  /** compact: chỉ embed + link; full: thêm mô tả dài */
  variant?: 'compact' | 'full';
}

export function GroupDeliverablesMedia({ variant = 'full' }: GroupDeliverablesMediaProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-inner">
        <iframe
          src={GROUP_VIDEO_EMBED_URL}
          title={GROUP_VIDEO_TITLE}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={GROUP_VIDEO_YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 dark:bg-rose-950/20 text-rose-900 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40 text-[11px] font-bold hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
          Mở trên YouTube
        </a>
        {variant !== 'compact' && (
          <a
            href={GROUP_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-300 border border-blue-100/40 dark:border-blue-900/40 text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors"
          >
            <FolderOpen className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Thư mục Google Drive nhóm
          </a>
        )}
      </div>

      {variant === 'full' && (
        <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed text-justify">
          Video thuyết trình hoàn thiện của nhóm <strong className="text-slate-900 dark:text-slate-200">VNU1001-E252028</strong>.
          Kịch bản, slide và tài liệu gốc được lưu đồng bộ trên{' '}
          <a
            href={GROUP_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Google Drive chia sẻ
          </a>{' '}
          (phân quyền Viewer/Editor, bật 2FA).
        </p>
      )}
    </div>
  );
}
