/**
 * @file ProjectInfoCard.tsx
 * @description Project information card component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { Project } from '../../types';

interface ProjectInfoCardProps {
  project: Project;
  completion: number;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const ProjectInfoCard = ({ project, completion }: ProjectInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {getInitials(project.name)}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-600">
            Completed: <span className="font-semibold text-gray-900">{completion}%</span>
          </p>
          <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
            <div
              className={`h-2 rounded-full ${
                completion < 50 ? 'bg-red-500' : completion < 80 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-6 line-clamp-3">{project.description}</p>

      <div className="bg-green-500 text-white rounded-lg p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Start Date</span>
          <span className="font-bold">
            {new Date(project.startDate).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">End Date</span>
          <span className="font-bold">
            {new Date(project.endDate).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })}
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t border-green-400">
          <span className="text-sm">Client</span>
          <span className="font-bold">
            {project.members?.[0]?.name || 'Not assigned'}
          </span>
        </div>
      </div>
    </div>
  );
};
