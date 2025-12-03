'use client';

import { useEffect, useMemo, useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { Project, ProjectTrackerEntry } from '../types';

interface TrackerViewControllerResult {
    project?: Project;
    search: string;
    setSearch: (value: string) => void;
    perPage: number;
    setPerPage: (value: number) => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    paginatedEntries: ProjectTrackerEntry[];
    filteredEntries: ProjectTrackerEntry[];
    totalPages: number;
    showingFrom: number;
    showingTo: number;
    formatDuration: (entry: ProjectTrackerEntry) => string;
}

const timeToSeconds = (time: string) => {
    const [h = '0', m = '0', s = '0'] = time.split(':');
    return Number(h) * 3600 + Number(m) * 60 + Number(s);
};

const calculateDuration = (entry: ProjectTrackerEntry) => {
    return Math.max(timeToSeconds(entry.endTime) - timeToSeconds(entry.startTime), 0);
};

export const useTrackerViewController = (projectId: string): TrackerViewControllerResult => {
    const { projects } = useProjectStore();

    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const project = useMemo(() => {
        return projects.find((p) => p.id === projectId);
    }, [projects, projectId]);

    const trackerEntries = useMemo(() => project?.trackerEntries ?? [], [project]);

    useEffect(() => {
        setCurrentPage(1);
    }, [perPage, search, projectId]);

    const filteredEntries = useMemo(() => {
        if (!search.trim()) return trackerEntries;
        const keyword = search.toLowerCase();
        return trackerEntries.filter((entry) => {
            return (
                entry.description.toLowerCase().includes(keyword) ||
                entry.taskName.toLowerCase().includes(keyword)
            );
        });
    }, [search, trackerEntries]);

    const totalPages = Math.max(1, Math.ceil(filteredEntries.length / perPage));
    const startIndex = filteredEntries.length ? (currentPage - 1) * perPage : 0;
    const paginatedEntries = filteredEntries.slice(startIndex, startIndex + perPage);

    const showingFrom = filteredEntries.length ? startIndex + 1 : 0;
    const showingTo = filteredEntries.length ? startIndex + paginatedEntries.length : 0;

    const formatDuration = (entry: ProjectTrackerEntry) => {
        const duration = calculateDuration(entry);
        const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return {
        project,
        search,
        setSearch,
        perPage,
        setPerPage,
        currentPage,
        setCurrentPage,
        paginatedEntries,
        filteredEntries,
        totalPages,
        showingFrom,
        showingTo,
        formatDuration,
    };
};
