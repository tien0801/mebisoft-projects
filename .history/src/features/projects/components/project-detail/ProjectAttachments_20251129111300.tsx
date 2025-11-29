/**
 * @file ProjectAttachments.tsx
 * @description Project attachments component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { MOCK_ATTACHMENTS } from '../../data';

export const ProjectAttachments = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments</h3>
      <p className="text-sm text-gray-600 mb-4">Attachment that uploaded in this project</p>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {MOCK_ATTACHMENTS.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 truncate">{file.fileName}</p>
              <p className="text-xs text-gray-600">{file.fileSize}</p>
            </div>
            <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
              ↓
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
