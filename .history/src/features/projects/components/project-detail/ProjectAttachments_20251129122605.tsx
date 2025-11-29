/**
 * @file ProjectAttachments.tsx
 * @description Project attachments component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { Paperclip, Download, FileText, Image, File } from 'lucide-react';
import { MOCK_ATTACHMENTS } from '../../data';

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
    case 'doc':
    case 'docx':
      return <FileText className="w-5 h-5" />;
    case 'jpg':
    case 'png':
      return <Image className="w-5 h-5" />;
    default:
      return <File className="w-5 h-5" />;
  }
};

const getFileColor = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return 'bg-red-100 text-red-600';
    case 'doc':
    case 'docx':
      return 'bg-blue-100 text-blue-600';
    case 'jpg':
    case 'png':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const ProjectAttachments = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg">
          <Paperclip className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Attachments</h3>
          <p className="text-xs text-gray-500">{MOCK_ATTACHMENTS.length} files uploaded</p>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {MOCK_ATTACHMENTS.map((file) => (
          <div key={file.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition group">
            <div className={`p-2 rounded-lg ${getFileColor(file.fileType)}`}>
              {getFileIcon(file.fileType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{file.fileName}</p>
              <p className="text-xs text-gray-500">{file.fileSize}</p>
            </div>
            <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition opacity-0 group-hover:opacity-100">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
