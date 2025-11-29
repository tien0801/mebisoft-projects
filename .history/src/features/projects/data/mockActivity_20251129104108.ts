// /**
//  * @file mockActivity.ts
//  * @description Mock data cho Activity Log, Milestones và Attachments
//  * @author Mebisoft Team
//  * @created 2025-11-27
//  */

// import { Activity } from '../types'

// // Mock Activity Log Data
// export const MOCK_ACTIVITIES: Activity[] = [
//   {
//     id: '1',
//     userId: '1',
//     userName: 'Nguyễn Minh Tuấn',
//     action: 'created the project',
//     timestamp: '2 hours ago',
//     type: 'create',
//   },
//   {
//     id: '2',
//     userId: '2',
//     userName: 'Trần Hải Yến',
//     action: 'added 3 new tasks',
//     timestamp: '5 hours ago',
//     type: 'add',
//   },
//   {
//     id: '3',
//     userId: '3',
//     userName: 'Lê Quang Huy',
//     action: 'completed milestone "Phase 1"',
//     timestamp: '1 day ago',
//     type: 'complete',
//   },
//   {
//     id: '4',
//     userId: '4',
//     userName: 'Phạm Thu Hà',
//     action: 'uploaded design mockups',
//     timestamp: '2 days ago',
//     type: 'add',
//   },
//   {
//     id: '5',
//     userId: '5',
//     userName: 'Hoàng Đức Anh',
//     action: 'updated project status',
//     timestamp: '3 days ago',
//     type: 'update',
//   },
//   {
//     id: '6',
//     userId: '6',
//     userName: 'Võ Thị Mai',
//     action: 'added new member to team',
//     timestamp: '4 days ago',
//     type: 'add',
//   },
//   {
//     id: '7',
//     userId: '7',
//     userName: 'Đặng Văn Nam',
//     action: 'completed 5 tasks',
//     timestamp: '5 days ago',
//     type: 'complete',
//   },
//   {
//     id: '8',
//     userId: '8',
//     userName: 'Bùi Thị Lan',
//     action: 'created sprint planning meeting',
//     timestamp: '1 week ago',
//     type: 'create',
//   },
// ];





// // Helper function để lấy activities theo projectId
// export const getActivitiesByProjectId = (projectId: string): Activity[] => {
//   // Trong thực tế sẽ filter theo projectId, hiện tại return tất cả
//   return MOCK_ACTIVITIES;
// };




// // Helper function để format date
// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('vi-VN');
// };




