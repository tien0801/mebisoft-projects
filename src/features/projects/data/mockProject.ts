/**
 * @file mockData.ts
 * @description Mock data cho Project
 * @author Mebisoft Team
 * @created 2025-11-22
 */


import { Project, ProjectStatus, ProjectType } from '../types/project.types';

// Mock data - 8 projects với 6 trạng thái khác nhau
export const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        name: 'Dashboard UI',
        description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
        status: ProjectStatus.PLANNING,
        projectType: ProjectType.DOMESTIC,
        startDate: '2025-07-20',
        endDate: '2027-07-20',
        budget: '500000000', // 500 triệu VND
        members: [
            { id: '1', name: 'John Doe', avatar: '', role: 'PM' },
            { id: '2', name: 'Jane Smith', avatar: '', role: 'Developer' },
            { id: '3', name: 'Mike Johnson', avatar: '', role: 'Designer' },
        ],
        tasks: [
            {
                id: 'task-1',
                name: 'The marketplace strategy',
                startDate: '2025-09-20',
                endDate: '2026-06-20',
                status: ProjectStatus.IN_PROGRESS,
                assignedTo: [{ id: '1', name: 'John Doe', role: 'PM' }]
            },
            {
                id: 'task-2',
                name: 'Application wireframe',
                startDate: '2025-10-20',
                endDate: '2026-03-20',
                status: ProjectStatus.IN_PROGRESS,
                assignedTo: [{ id: '2', name: 'Jane Smith', role: 'Developer' }]
            },
            {
                id: 'task-3',
                name: 'Lunch meeting',
                startDate: '2025-11-20',
                endDate: '2025-12-20',
                status: ProjectStatus.PLANNING,
                assignedTo: [{ id: '1', name: 'John Doe', role: 'PM' }]
            },
            {
                id: 'task-4',
                name: 'Finish the logo design',
                startDate: '2025-08-20',
                endDate: '2025-10-20',
                status: ProjectStatus.COMPLETED,
                assignedTo: [{ id: '3', name: 'Mike Johnson', role: 'Designer' }]
            }
        ],
        trackerEntries: [
            {
                id: 'tracker-1',
                projectId: '1',
                description: 'Website Design set',
                taskId: 'task-3',
                taskName: 'Lunch meeting',
                startTime: '12:28:50',
                endTime: '12:31:59',
                date: '2025-11-30'
            },
            {
                id: 'tracker-2',
                projectId: '1',
                description: 'Dashboard cards',
                taskId: 'task-4',
                taskName: 'Finish the logo design',
                startTime: '12:32:16',
                endTime: '12:34:24',
                date: '2025-11-30',
                billable: true
            },
            {
                id: 'tracker-3',
                projectId: '1',
                description: 'Dashboard cards',
                taskId: 'task-4',
                taskName: 'Finish the logo design',
                startTime: '12:38:47',
                endTime: '12:39:53',
                date: '2025-11-30'
            }
        ]
    },
    {
        id: '2',
        name: 'Newsletter Templates',
        description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
        status: ProjectStatus.PREPARING,
        projectType: ProjectType.BUSINESS,
        startDate: '2021-04-25',
        endDate: '2021-07-20',
        budget: '100000000', // 100 triệu VND
        members: [
            { id: '4', name: 'Sarah Wilson', avatar: '', role: 'PM' },
            { id: '5', name: 'Tom Brown', avatar: '', role: 'Developer' },
            { id: '6', name: 'Lisa Davis', avatar: '', role: 'QA' },
        ],
        tasks: [
            {
                id: 'task-21',
                name: 'Design email templates',
                startDate: '2021-04-25',
                endDate: '2021-05-20',
                status: ProjectStatus.IN_PROGRESS,
                assignedTo: [{ id: '4', name: 'Sarah Wilson', role: 'PM' }]
            },
            {
                id: 'task-22',
                name: 'Set up template system',
                startDate: '2021-05-15',
                endDate: '2021-06-10',
                status: ProjectStatus.IN_PROGRESS,
                assignedTo: [{ id: '5', name: 'Tom Brown', role: 'Developer' }]
            },
            {
                id: 'task-23',
                name: 'Quality assurance testing',
                startDate: '2021-06-05',
                endDate: '2021-07-20',
                status: ProjectStatus.PREPARING,
                assignedTo: [{ id: '6', name: 'Lisa Davis', role: 'QA' }]
            }
        ],
        trackerEntries: [
            {
                id: 'tracker-4',
                projectId: '2',
                description: 'Template kickoff meeting',
                taskId: 'task-21',
                taskName: 'Design email templates',
                startTime: '09:00:00',
                endTime: '10:45:00',
                date: '2021-05-01'
            },
            {
                id: 'tracker-5',
                projectId: '2',
                description: 'QA preparation',
                taskId: 'task-23',
                taskName: 'Quality assurance testing',
                startTime: '14:10:00',
                endTime: '16:00:00',
                date: '2021-06-15',
                billable: true
            }
        ]
    },
    {
        id: '3',
        name: 'Payment Integration',
        description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
        status: ProjectStatus.IN_PROGRESS,
        projectType: ProjectType.INTERNATIONAL,
        startDate: '2021-07-20',
        endDate: '2021-07-20',
        budget: '200000000', // 200 triệu VND
        members: [
            { id: '7', name: 'David Lee', avatar: '', role: 'Developer' },
            { id: '8', name: 'Emma White', avatar: '', role: 'Developer' },
            { id: '9', name: 'Chris Martin', role: 'QA' },
        ],
        tasks: [
            {
                id: 'task-31',
                name: 'API endpoint development',
                startDate: '2021-07-20',
                endDate: '2021-08-15',
                status: ProjectStatus.IN_PROGRESS,
                assignedTo: [{ id: '7', name: 'David Lee', role: 'Developer' }]
            },
            {
                id: 'task-32',
                name: 'Payment gateway integration',
                startDate: '2021-08-10',
                endDate: '2021-09-05',
                status: ProjectStatus.IN_PROGRESS,
                assignedTo: [{ id: '8', name: 'Emma White', role: 'Developer' }]
            },
            {
                id: 'task-33',
                name: 'Security testing',
                startDate: '2021-08-20',
                endDate: '2021-09-15',
                status: ProjectStatus.IN_PROGRESS,
                assignedTo: [{ id: '9', name: 'Chris Martin', role: 'QA' }]
            }
        ],
        trackerEntries: [
            {
                id: 'tracker-6',
                projectId: '3',
                description: 'Gateway workshop',
                taskId: 'task-32',
                taskName: 'Payment gateway integration',
                startTime: '11:00:00',
                endTime: '12:30:00',
                date: '2021-08-18'
            }
        ]
    },
    {
        id: '4',
        name: 'Website Launch',
        description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
        status: ProjectStatus.ON_HOLD,
        projectType: ProjectType.MEDICAL,
        startDate: '2021-07-20',
        endDate: '2021-07-20',
        budget: '150000000', // 150 triệu VND
        members: [
            { id: '10', name: 'Anna Taylor', avatar: '', role: 'PM' },
            { id: '11', name: 'James Anderson', avatar: '', role: 'Developer' },
            { id: '12', name: 'Sophia Thomas', avatar: '', role: 'Designer' },
        ],
        tasks: [
            {
                id: 'task-41',
                name: 'Content preparation',
                startDate: '2021-07-20',
                endDate: '2021-08-10',
                status: ProjectStatus.ON_HOLD,
                assignedTo: [{ id: '10', name: 'Anna Taylor', role: 'PM' }]
            },
            {
                id: 'task-42',
                name: 'Backend deployment',
                startDate: '2021-08-05',
                endDate: '2021-08-25',
                status: ProjectStatus.ON_HOLD,
                assignedTo: [{ id: '11', name: 'James Anderson', role: 'Developer' }]
            },
            {
                id: 'task-43',
                name: 'Frontend optimization',
                startDate: '2021-08-15',
                endDate: '2021-09-05',
                status: ProjectStatus.ON_HOLD,
                assignedTo: [{ id: '12', name: 'Sophia Thomas', role: 'Designer' }]
            }
        ]
    },
    {
        id: '5',
        name: 'Website Builder',
        description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
        status: ProjectStatus.COMPLETED,
        projectType: ProjectType.DOMESTIC,
        startDate: '2021-07-20',
        endDate: '2021-07-20',
        budget: '300000000', // 300 triệu VND
        members: [
            { id: '13', name: 'Oliver Jackson', avatar: '', role: 'PM' },
            { id: '14', name: 'Mia Harris', avatar: '', role: 'Developer' },
            { id: '15', name: 'Liam Clark', avatar: '', role: 'Designer' },
        ],
        tasks: [
            {
                id: 'task-51',
                name: 'UI component library',
                startDate: '2021-07-20',
                endDate: '2021-08-15',
                status: ProjectStatus.COMPLETED,
                assignedTo: [{ id: '13', name: 'Oliver Jackson', role: 'PM' }]
            },
            {
                id: 'task-52',
                name: 'Drag and drop functionality',
                startDate: '2021-08-10',
                endDate: '2021-08-30',
                status: ProjectStatus.COMPLETED,
                assignedTo: [{ id: '14', name: 'Mia Harris', role: 'Developer' }]
            },
            {
                id: 'task-53',
                name: 'Theme customization',
                startDate: '2021-08-20',
                endDate: '2021-09-10',
                status: ProjectStatus.COMPLETED,
                assignedTo: [{ id: '15', name: 'Liam Clark', role: 'Designer' }]
            }
        ]
    },
    {
        id: '6',
        name: 'Component Library',
        description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
        status: ProjectStatus.CANCELLED,
        projectType: ProjectType.BUSINESS,
        startDate: '2021-07-20',
        endDate: '2021-07-20',
        budget: '80000000', // 80 triệu VND
        members: [
            { id: '16', name: 'Ava Lewis', avatar: '', role: 'Developer' },
            { id: '17', name: 'Noah Walker', avatar: '', role: 'Developer' },
            { id: '18', name: 'Isabella Hall', avatar: '', role: 'QA' },
        ],
        tasks: [
            {
                id: 'task-61',
                name: 'Button component design',
                startDate: '2021-07-20',
                endDate: '2021-08-05',
                status: ProjectStatus.CANCELLED,
                assignedTo: [{ id: '16', name: 'Ava Lewis', role: 'Developer' }]
            },
            {
                id: 'task-62',
                name: 'Form controls implementation',
                startDate: '2021-08-01',
                endDate: '2021-08-20',
                status: ProjectStatus.CANCELLED,
                assignedTo: [{ id: '17', name: 'Noah Walker', role: 'Developer' }]
            },
            {
                id: 'task-63',
                name: 'Documentation writing',
                startDate: '2021-08-10',
                endDate: '2021-08-30',
                status: ProjectStatus.CANCELLED,
                assignedTo: [{ id: '18', name: 'Isabella Hall', role: 'QA' }]
            }
        ]
    },
    {
        id: '7',
        name: 'Bootstrap Framework',
        description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
        status: ProjectStatus.COMPLETED,
        startDate: '2025-07-20',
        endDate: '2026-07-20',
        budget: '250000000', // 250 triệu VND
        members: [
            { id: '19', name: 'Ethan Young', avatar: '', role: 'PM' },
            { id: '20', name: 'Charlotte King', avatar: '', role: 'Developer' },
            { id: '21', name: 'Mason Wright', avatar: '', role: 'Designer' },
        ],
        tasks: [
            {
                id: 'task-71',
                name: 'Grid system setup',
                startDate: '2025-07-20',
                endDate: '2025-08-20',
                status: ProjectStatus.COMPLETED,
                assignedTo: [{ id: '19', name: 'Ethan Young', role: 'PM' }]
            },
            {
                id: 'task-72',
                name: 'CSS utilities development',
                startDate: '2025-08-15',
                endDate: '2025-10-15',
                status: ProjectStatus.COMPLETED,
                assignedTo: [{ id: '20', name: 'Charlotte King', role: 'Developer' }]
            },
            {
                id: 'task-73',
                name: 'Icon set creation',
                startDate: '2025-09-01',
                endDate: '2025-11-01',
                status: ProjectStatus.COMPLETED,
                assignedTo: [{ id: '21', name: 'Mason Wright', role: 'Designer' }]
            }
        ]
    },
    {
        id: '8',
        name: 'Application UI',
        description: 'The goal of this project is to improve operational efficiency within the organization by implementing proven automation.',
        status: ProjectStatus.IN_PROGRESS,
        startDate: '2024-07-20',
        endDate: '2025-07-20',
        budget: '180000000', // 180 triệu VND
        members: [
            { id: '22', name: 'Amelia Scott', avatar: '', role: 'Developer' },
            { id: '23', name: 'Lucas Green', avatar: '', role: 'QA' },
        ],
    },
];