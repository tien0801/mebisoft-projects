
import { Attachment } from '../types'

// Mock Attachments Data
export const MOCK_ATTACHMENTS: Attachment[] = [
  {
    id: '1',
    fileName: 'Project_Requirements.pdf',
    fileSize: '2.5 MB',
    fileType: 'pdf',
    uploadedBy: 'Nguyễn Minh Tuấn',
    uploadedAt: '2024-11-20',
    projectId: '1',
  },
  {
    id: '2',
    fileName: 'Design_Mockups.fig',
    fileSize: '15.8 MB',
    fileType: 'fig',
    uploadedBy: 'Phạm Thu Hà',
    uploadedAt: '2024-11-22',
    projectId: '1',
  },
  {
    id: '3',
    fileName: 'Technical_Specs.docx',
    fileSize: '1.2 MB',
    fileType: 'docx',
    uploadedBy: 'Lê Quang Huy',
    uploadedAt: '2024-11-23',
    projectId: '1',
  },
  {
    id: '4',
    fileName: 'Database_Schema.xlsx',
    fileSize: '856 KB',
    fileType: 'xlsx',
    uploadedBy: 'Trần Hải Yến',
    uploadedAt: '2024-11-24',
    projectId: '1',
  },
  {
    id: '5',
    fileName: 'API_Documentation.pdf',
    fileSize: '3.2 MB',
    fileType: 'pdf',
    uploadedBy: 'Đặng Văn Nam',
    uploadedAt: '2024-11-25',
    projectId: '1',
  },
  {
    id: '6',
    fileName: 'User_Flow_Diagram.png',
    fileSize: '2.1 MB',
    fileType: 'png',
    uploadedBy: 'Võ Thị Mai',
    uploadedAt: '2024-11-21',
    projectId: '2',
  },
  {
    id: '7',
    fileName: 'Sprint_Planning.pptx',
    fileSize: '4.5 MB',
    fileType: 'pptx',
    uploadedBy: 'Bùi Thị Lan',
    uploadedAt: '2024-11-19',
    projectId: '2',
  },
  {
    id: '8',
    fileName: 'Test_Cases.xlsx',
    fileSize: '1.8 MB',
    fileType: 'xlsx',
    uploadedBy: 'Hoàng Đức Anh',
    uploadedAt: '2024-11-26',
    projectId: '2',
  },
];


// Helper function để lấy attachments theo projectId
export const getAttachmentsByProjectId = (projectId: string): Attachment[] => {
  return MOCK_ATTACHMENTS.filter(a => a.projectId === projectId);
};


// Helper function để get icon color theo file type
export const getFileIconColor = (fileType: Attachment['fileType']): string => {
  const colorMap: Record<Attachment['fileType'], string> = {
    pdf: 'text-red-500',
    doc: 'text-blue-500',
    docx: 'text-blue-500',
    xls: 'text-green-500',
    xlsx: 'text-green-500',
    ppt: 'text-orange-500',
    pptx: 'text-orange-500',
    jpg: 'text-purple-500',
    png: 'text-purple-500',
    fig: 'text-pink-500',
    zip: 'text-gray-500',
    other: 'text-gray-400',
  };
  return colorMap[fileType] || colorMap.other;
};
