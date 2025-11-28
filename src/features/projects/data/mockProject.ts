/**
 * @file mockData.ts
 * @description Mock data cho Project
 * @author Mebisoft Team
 * @created 2025-11-22
 */


import { Project, ProjectStatus } from '../types/project.types';
import { MOCK_CLIENTS } from './mockMember';

export const getClientNameById = (id: string) => {
  const client = MOCK_CLIENTS.find(c => c.id === id);
  return client ? client.name : 'Unknown Client';
};

// Mock data - 8 projects với 6 trạng thái khác nhau
export const MOCK_PROJECTS: Project[] = [
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
        clientId: '1',
        managerId: '1',
        budget: '50000',
        estimatedHours: '500',
        tag: 'UI/UX',
        imageUrl: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg'
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
        clientId: '2',
        managerId: '4',
        budget: '30000',
        estimatedHours: '300',
        tag: 'Marketing',
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
        clientId: '3',
        managerId: '7',
        budget: '75000',
        estimatedHours: '800',
        tag: 'Backend',
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
        clientId: '4',
        managerId: '10',
        budget: '40000',
        estimatedHours: '400',
        tag: 'Web',
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
        clientId: '5',
        managerId: '13',
        budget: '60000',
        estimatedHours: '600',
        tag: 'SaaS',
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
        clientId: '6',
        managerId: '16',
        budget: '25000',
        estimatedHours: '250',
        tag: 'Library',
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
        clientId: '7',
        managerId: '19',
        budget: '45000',
        estimatedHours: '450',
        tag: 'Framework',
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
        clientId: '8',
        managerId: '22',
        budget: '55000',
        estimatedHours: '550',
        tag: 'Mobile',
    },
];