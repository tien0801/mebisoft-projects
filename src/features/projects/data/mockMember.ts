/**
 * @file mockData.ts
 * @description Mock data cho Clients và Users
 * @author Mebisoft Team
 * @created 2025-11-22
 */

import { Client, User } from "../types";

// Mock Clients Data
export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Nguyễn Văn A', company: 'ABC Corp', email: 'nguyenvana@abc.com' },
  { id: '2', name: 'Trần Thị B', company: 'XYZ Ltd', email: 'tranthib@xyz.com' },
  { id: '3', name: 'Lê Văn C', company: 'Tech Solutions', email: 'levanc@tech.com' },
  { id: '4', name: 'Phạm Thị D', company: 'Digital Agency', email: 'phamthid@digital.com' },
  { id: '5', name: 'Hoàng Văn E', company: 'Innovation Hub', email: 'hoangvane@innovation.com' },
  { id: '6', name: 'Võ Thị F', company: 'Smart Systems', email: 'vothif@smart.com' },
  { id: '7', name: 'Đặng Văn G', company: 'Future Tech', email: 'dangvang@future.com' },
  { id: '8', name: 'Bùi Thị H', company: 'Cloud Services', email: 'buithih@cloud.com' },
];

// Mock Users/Members Data
export const MOCK_USERS: User[] = [
  { id: '1', name: 'Nguyễn Minh Tuấn', email: 'tuan@mebisoft.com', role: 'Project Manager', avatar: '' },
  { id: '2', name: 'Trần Hải Yến', email: 'yen@mebisoft.com', role: 'Developer', avatar: '' },
  { id: '3', name: 'Lê Quang Huy', email: 'huy@mebisoft.com', role: 'Developer', avatar: '' },
  { id: '4', name: 'Phạm Thu Hà', email: 'ha@mebisoft.com', role: 'Designer', avatar: '' },
  { id: '5', name: 'Hoàng Đức Anh', email: 'anh@mebisoft.com', role: 'QA Tester', avatar: '' },
  { id: '6', name: 'Võ Thị Mai', email: 'mai@mebisoft.com', role: 'Business Analyst', avatar: '' },
  { id: '7', name: 'Đặng Văn Nam', email: 'nam@mebisoft.com', role: 'DevOps', avatar: '' },
  { id: '8', name: 'Bùi Thị Lan', email: 'lan@mebisoft.com', role: 'Scrum Master', avatar: '' },
  { id: '9', name: 'Ngô Văn Phong', email: 'phong@mebisoft.com', role: 'Tech Lead', avatar: '' },
  { id: '10', name: 'Đinh Thị Hương', email: 'huong@mebisoft.com', role: 'UI/UX Designer', avatar: '' },
  { id: '11', name: 'Trương Văn Đạt', email: 'dat@mebisoft.com', role: 'Backend Developer', avatar: '' },
  { id: '12', name: 'Lý Thị Ngọc', email: 'ngoc@mebisoft.com', role: 'Frontend Developer', avatar: '' },
  { id: '13', name: 'Phan Văn Khoa', email: 'khoa@mebisoft.com', role: 'Mobile Developer', avatar: '' },
  { id: '14', name: 'Dương Thị Linh', email: 'linh@mebisoft.com', role: 'Product Owner', avatar: '' },
  { id: '15', name: 'Vũ Văn Thắng', email: 'thang@mebisoft.com', role: 'System Admin', avatar: '' },
];
