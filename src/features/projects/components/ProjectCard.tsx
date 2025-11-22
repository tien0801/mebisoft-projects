/**
 * @file ProjectCard.tsx
 * @description Component hiển thị 1 project card (theo design mẫu)
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Copy, Pencil, Trash2 } from 'lucide-react';
import { Project, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types/project.types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  onDuplicate?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

/**
 * ProjectCard Component
 * Hiển thị thông tin project dạng card với dropdown menu
 */
export function ProjectCard({ project, onClick, onDuplicate, onEdit, onDelete }: ProjectCardProps) {
  // State quản lý dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle menu actions
  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn trigger onClick của card
    setIsMenuOpen(false);
    onDuplicate?.(project);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    onEdit?.(project);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    onDelete?.(project);
  };
  // Format date từ ISO sang DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      {/* Header: Icon + Name + Menu */}
      <div className="bg-gray-100 p-4 flex justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Icon placeholder */}
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold border-3 border-emerald-600">
            {project.name.charAt(0)}
          </div>
          <h3 className="font-semibold text-gray-900">{project.name}</h3>
        </div>

        {/* Menu 3 chấm với dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Ngăn trigger onClick của card
              setIsMenuOpen(!isMenuOpen);
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              {/* Duplicate */}
              <button
                onClick={handleDuplicate}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Duplicate</span>
              </button>

              {/* Edit */}
              <button
                onClick={handleEdit}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </button>

              {/* Delete */}
              <button
                onClick={handleDelete}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className='p-4'>
        <div className="mb-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase ${PROJECT_STATUS_COLORS[project.status]
              }`}
          >
            {PROJECT_STATUS_LABELS[project.status]}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>


        {/* Members */}
        <div className="mb-1">
          <p className="text-xs text-gray-500 mb-2">MEMBERS</p>
          {/* <div className="flex -space-x-1"> */}
          <div className="flex">
            {project.members.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                title={member.name}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            ))}
            {project.members.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                +{project.members.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Dates: Start/Due Date - Màu XÁM NHẠT */}
      <div className="bg-gray-100 p-4 border-t border-gray-200">
        <div className="flex justify-between text-xs">
          <div>
            <p className="text-red-500 font-medium">{formatDate(project.startDate)}</p>
            <p className="text-gray-500">Start Date</p>
          </div>
          <div className="text-right">
            <p className="text-gray-900 font-medium">{formatDate(project.endDate)}</p>
            <p className="text-gray-500">Due Date</p>
          </div>
        </div>
      </div>
    </div>
  );
}
