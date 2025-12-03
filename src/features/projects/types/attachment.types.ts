
// Interface cho Attachment
export interface Attachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'jpg' | 'png' | 'fig' | 'zip' | 'other';
  uploadedBy: string;
  uploadedAt: string;
  projectId: string;
  url?: string;
}