/**
 * @file route.ts
 * @description Mock API cho Projects - Không cần database
 * @author Mebisoft Team
 * @created 2025-11-22
 */

import { NextRequest, NextResponse } from 'next/server';
import { ProjectStatus } from '@/features/projects/types/project.types';

// Mock data - 6 projects với 6 trạng thái khác nhau
const MOCK_PROJECTS = [
  {
    id: '1',
    name: 'Dashboard UI',
    description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
    status: ProjectStatus.PLANNING,
    startDate: '2025-07-20',
    endDate: '2027-07-20',
    members: [
      { id: '1', name: 'John Doe', avatar: '', role: 'PM' },
      { id: '2', name: 'Jane Smith', avatar: '', role: 'Developer' },
      { id: '3', name: 'Mike Johnson', avatar: '', role: 'Designer' },
    ],
  },
  {
    id: '2',
    name: 'Newsletter Templates',
    description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
    status: ProjectStatus.PREPARING,
    startDate: '2021-04-25',
    endDate: '2021-07-20',
    members: [
      { id: '4', name: 'Sarah Wilson', avatar: '', role: 'PM' },
      { id: '5', name: 'Tom Brown', avatar: '', role: 'Developer' },
      { id: '6', name: 'Lisa Davis', avatar: '', role: 'QA' },
    ],
  },
  {
    id: '3',
    name: 'Payment Integration',
    description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
    status: ProjectStatus.IN_PROGRESS,
    startDate: '2021-07-20',
    endDate: '2021-07-20',
    members: [
      { id: '7', name: 'David Lee', avatar: '', role: 'Developer' },
      { id: '8', name: 'Emma White', avatar: '', role: 'Developer' },
      { id: '9', name: 'Chris Martin', avatar: '', role: 'QA' },
    ],
  },
  {
    id: '4',
    name: 'Website Launch',
    description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
    status: ProjectStatus.ON_HOLD,
    startDate: '2021-07-20',
    endDate: '2021-07-20',
    members: [
      { id: '10', name: 'Anna Taylor', avatar: '', role: 'PM' },
      { id: '11', name: 'James Anderson', avatar: '', role: 'Developer' },
      { id: '12', name: 'Sophia Thomas', avatar: '', role: 'Designer' },
    ],
  },
  {
    id: '5',
    name: 'Website Builder',
    description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
    status: ProjectStatus.COMPLETED,
    startDate: '2021-07-20',
    endDate: '2021-07-20',
    members: [
      { id: '13', name: 'Oliver Jackson', avatar: '', role: 'PM' },
      { id: '14', name: 'Mia Harris', avatar: '', role: 'Developer' },
      { id: '15', name: 'Liam Clark', avatar: '', role: 'Designer' },
    ],
  },
  {
    id: '6',
    name: 'Component Library',
    description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
    status: ProjectStatus.CANCELLED,
    startDate: '2021-07-20',
    endDate: '2021-07-20',
    members: [
      { id: '16', name: 'Ava Lewis', avatar: '', role: 'Developer' },
      { id: '17', name: 'Noah Walker', avatar: '', role: 'Developer' },
      { id: '18', name: 'Isabella Hall', avatar: '', role: 'QA' },
    ],
  },
  {
    id: '7',
    name: 'Bootstrap Framework',
    description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
    status: ProjectStatus.COMPLETED,
    startDate: '2025-07-20',
    endDate: '2026-07-20',
    members: [
      { id: '19', name: 'Ethan Young', avatar: '', role: 'PM' },
      { id: '20', name: 'Charlotte King', avatar: '', role: 'Developer' },
      { id: '21', name: 'Mason Wright', avatar: '', role: 'Designer' },
    ],
  },
  {
    id: '8',
    name: 'Application UI',
    description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
    status: ProjectStatus.IN_PROGRESS,
    startDate: '2024-07-20',
    endDate: '2025-07-20',
    members: [
      { id: '22', name: 'Amelia Scott', avatar: '', role: 'Developer' },
      { id: '23', name: 'Lucas Green', avatar: '', role: 'QA' },
    ],
  },
];

/**
 * GET /api/projects
 * Lấy danh sách projects (có thể filter)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Filter theo status nếu có
    let filteredProjects = MOCK_PROJECTS;
    if (status) {
      filteredProjects = MOCK_PROJECTS.filter((p) => p.status === status);
    }

    return NextResponse.json(filteredProjects);
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách projects' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Tạo project mới
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Tạo project mới với ID random
    const newProject = {
      id: `project-${Date.now()}`,
      ...body,
    };

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi khi tạo project' },
      { status: 500 }
    );
  }
}
