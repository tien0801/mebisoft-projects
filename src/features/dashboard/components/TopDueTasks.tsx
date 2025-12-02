/**
 * @file TopDueTasks.tsx
 * @description Component hiển thị bảng tasks sắp đến hạn
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

/**
 * Component bảng hiển thị top 5 tasks sắp đến hạn
 * Columns: Task, Project, Stage, Completion
 */
export function TopDueTasks() {
  const tasks = [
    { id: '1', task: 'Finish the logo design', project: 'Website Builder', stage: 'Low', stageColor: 'bg-blue-500', completion: 0 },
    { id: '2', task: 'Define users and workflow', project: 'Website Launch', stage: 'High', stageColor: 'bg-orange-500', completion: 0 },
    { id: '3', task: 'Design Approval', project: 'Website Builder', stage: 'High', stageColor: 'bg-orange-500', completion: 0 },
    { id: '4', task: 'Identify event sources', project: 'Website Launch', stage: 'Medium', stageColor: 'bg-green-500', completion: 0 },
    { id: '5', task: 'Dashboard Issues', project: 'Website Launch', stage: 'Critical', stageColor: 'bg-red-500', completion: 0 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Due Tasks</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-medium text-gray-500 pb-3">Task</th>
              <th className="text-left text-xs font-medium text-gray-500 pb-3">Project</th>
              <th className="text-left text-xs font-medium text-gray-500 pb-3">Stage</th>
              <th className="text-right text-xs font-medium text-gray-500 pb-3">Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="py-3">
                  <p className="text-sm text-gray-900">{task.task}</p>
                </td>
                <td className="py-3">
                  <p className="text-sm text-gray-600">{task.project}</p>
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 text-xs">
                    <span className={`w-2 h-2 ${task.stageColor} rounded-full`}></span>
                    <span className="text-gray-600">{task.stage}</span>
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-sm font-medium text-gray-900">{task.completion}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
