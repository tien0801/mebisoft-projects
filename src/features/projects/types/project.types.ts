/**
 * @file project.types.ts
 * @description Project types và interfaces
 * @author Mebisoft Team
 * @created 2025-11-22
 */

// Enum cho 6 trạng thái dự án
export enum ProjectStatus {
  PLANNING = 'planning',           // Lên kế hoạch
  PREPARING = 'preparing',         // Chuẩn bị
  IN_PROGRESS = 'in_progress',     // Đang triển khai
  ON_HOLD = 'on_hold',            // Tạm dừng
  COMPLETED = 'completed',         // Hoàn thành
  CANCELLED = 'cancelled',         // Hủy bỏ
}

// Enum cho loại dự án
export enum ProjectType {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international',
  MEDICAL = 'medical',
  BUSINESS = 'business',
}

// Label hiển thị cho từng status
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.PLANNING]: 'Lên kế hoạch',
  [ProjectStatus.PREPARING]: 'Chuẩn bị',
  [ProjectStatus.IN_PROGRESS]: 'Đang triển khai',
  [ProjectStatus.ON_HOLD]: 'Tạm dừng',
  [ProjectStatus.COMPLETED]: 'Hoàn thành',
  [ProjectStatus.CANCELLED]: 'Hủy bỏ',
};

// Màu sắc cho từng status (theo hình mẫu)
export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  [ProjectStatus.PLANNING]: 'bg-purple-100 text-purple-700',      // Tím
  [ProjectStatus.PREPARING]: 'bg-blue-100 text-blue-700',         // Xanh dương
  [ProjectStatus.IN_PROGRESS]: 'bg-cyan-100 text-cyan-700',       // Xanh lơ
  [ProjectStatus.ON_HOLD]: 'bg-yellow-100 text-yellow-700',       // Vàng
  [ProjectStatus.COMPLETED]: 'bg-green-100 text-green-700',       // Xanh lá
  [ProjectStatus.CANCELLED]: 'bg-red-100 text-red-700',           // Đỏ
};

// Label hiển thị cho loại dự án
export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.DOMESTIC]: 'Domestic Project',
  [ProjectType.INTERNATIONAL]: 'International Project',
  [ProjectType.MEDICAL]: 'Medical Project',
  [ProjectType.BUSINESS]: 'Business Project',
};

// Interface thành viên dự án
export interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
  role?: string; // PM, Developer, QA, Designer
}

// Interface cho task trong project
export interface ProjectTask {
  id: string;
  name: string;
  startDate: string;  // ISO format
  endDate: string;    // ISO format
  status?: ProjectStatus;
  assignedTo?: ProjectMember[];
  bugReports?: string[]; // IDs of bug reports
}

// Interface cho tracker entry của project
export interface ProjectTrackerEntry {
  id: string;
  projectId: string;
  description: string;
  taskId?: string;
  taskName: string;
  startTime: string; // HH:mm:ss
  endTime: string;   // HH:mm:ss
  date?: string;     // ISO date
  billable?: boolean;
  source?: 'tracker' | 'timesheet';
}

// Interface chính cho Project
export interface Project {
  id: string;
  name: string;                    // Tên dự án
  description: string;             // Mô tả ngắn
  status: ProjectStatus;           // Trạng thái
  projectType?: ProjectType;       // Loại dự án
  startDate: string;               // Ngày bắt đầu (ISO format)
  endDate: string;                 // Ngày kết thúc (ISO format)
  members: ProjectMember[];        // Danh sách thành viên
  tasks?: ProjectTask[];           // Danh sách tasks trong project
  trackerEntries?: ProjectTrackerEntry[]; // Các bản ghi tracker
  clientId?: string;               // ID khách hàng (liên kết hệ thống 2)
  managerId?: string;              // ID người phụ trách (liên kết hệ thống 3)
  imageUrl?: string;                  // URL hình ảnh project
  budget?: string;                 // Ngân sách
  estimatedHours?: string;         // Số giờ ước tính
  tag?: string;                    // Tag/nhãn
}

// Interface cho filter projects
export interface ProjectFilter {
  status?: ProjectStatus;
  projectType?: ProjectType;
  search?: string;
  startDate?: string;
  endDate?: string;
}
