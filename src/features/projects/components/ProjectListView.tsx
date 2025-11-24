/**
 * @file ProjectListView.tsx
 * @description Component hiển thị projects dạng List (Table view) - Responsive
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { Project, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types/project.types';

interface ProjectListViewProps {
  projects: Project[];
  onDuplicate?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

/**
 * ProjectListView Component
 * Hiển thị danh sách projects dạng table/list với responsive
 */
export function ProjectListView({ projects, onDuplicate, onEdit, onDelete }: ProjectListViewProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Wrapper với horizontal scroll */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
            <div className="col-span-3">PROJECT</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2">USERS</div>
            <div className="col-span-3">COMPLETION</div>
            <div className="col-span-2 text-right">ACTION</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
              >
                {/* Project Name */}
                <div className="col-span-3 flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                    {project.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900 truncate">{project.name}</span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase whitespace-nowrap ${
                      PROJECT_STATUS_COLORS[project.status]
                    }`}
                  >
                    {PROJECT_STATUS_LABELS[project.status]}
                  </span>
                </div>

                {/* Users/Members */}
                <div className="col-span-2">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 5).map((member) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium shrink-0"
                        title={member.name}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {project.members.length > 5 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium shrink-0">
                        +{project.members.length - 5}
                      </div>
                    )}
                  </div>
                </div>

                {/* Completion Progress */}
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    {/* Mock progress */}
                    <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[80px]">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-green-600 w-12 text-right shrink-0">
                      {Math.floor(Math.random() * 100)}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2 shrink-0">
                  {/* Duplicate */}
                  <button
                    onClick={() => onDuplicate?.(project)}
                    className="p-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-sm"
                    title="Duplicate"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => onEdit?.(project)}
                    className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-sm"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDelete?.(project)}
                    className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors shadow-sm"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
