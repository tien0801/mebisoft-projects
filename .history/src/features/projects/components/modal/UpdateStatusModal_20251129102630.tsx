// 'use client'
// import { useState } from 'react';
// import { Project, ProjectStatus, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../../types/project.types';
// import { X } from 'lucide-react';

// interface UpdateStatusModalProps {
//     project: Project | null;
//     isOpen: boolean;
//     onClose: () => void;
//     onUpdate?: (projectId: string, newStatus: ProjectStatus) => void;
// }

// export const UpdateStatusModal = ({ project, isOpen, onClose, onUpdate }: UpdateStatusModalProps) => {
//     const [newStatus, setNewStatus] = useState<ProjectStatus | null>(null);
//     const [loading, setLoading] = useState(false);

//     if (!isOpen || !project) return null;

//     const currentStatus = newStatus || project.status;

//     const handleUpdate = async () => {
//         if (!newStatus) return;

//         setLoading(true);
//         try {
//             if (onUpdate) {
//                 onUpdate(project.id, newStatus);
//             }
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 500));
//             setNewStatus(null);
//             onClose();
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg max-w-md w-full">
//                 {/* Header */}
//                 <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                     <h2 className="text-lg font-bold text-gray-900">Update Status</h2>
//                     <button
//                         onClick={onClose}
//                         className="p-1 text-gray-500 hover:text-gray-700 transition"
//                         disabled={loading}
//                     >
//                         <X className="w-6 h-6" />
//                     </button>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6 space-y-4">
//                     <div>
//                         <p className="text-sm text-gray-600 mb-2">Project: <span className="font-medium text-gray-900">{project.name}</span></p>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             New Status
//                         </label>
//                         <select
//                             value={newStatus || project.status}
//                             onChange={(e) => setNewStatus(e.target.value as ProjectStatus)}
//                             disabled={loading}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//                         >
//                             {Object.entries(PROJECT_STATUS_LABELS).map(([status, label]) => (
//                                 <option key={status} value={status}>
//                                     {label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {newStatus && newStatus !== project.status && (
//                         <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                             <p className="text-xs font-medium text-yellow-800">
//                                 Status will change from <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${PROJECT_STATUS_COLORS[project.status]} mr-1`}>
//                                     {PROJECT_STATUS_LABELS[project.status]}
//                                 </span>
//                                 to <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${PROJECT_STATUS_COLORS[newStatus]}`}>
//                                     {PROJECT_STATUS_LABELS[newStatus]}
//                                 </span>
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Footer */}
//                 <div className="flex justify-end gap-2 p-6 border-t border-gray-200 bg-gray-50">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={loading}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleUpdate}
//                         disabled={!newStatus || newStatus === project.status || loading}
//                         className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {loading ? 'Updating...' : 'Update Status'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
