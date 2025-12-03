'use client';

import { useState } from 'react';
import { Check, Copy, Sparkles, X } from 'lucide-react';

import { BugAiFormState } from '../../../types';

interface AiGenerateModalProps {
    isOpen: boolean;
    onClose: () => void;
    formState: BugAiFormState;
    updateFormState: <Key extends keyof BugAiFormState>(key: Key, value: BugAiFormState[Key]) => void;
    onGenerate: () => void;
    results: string[];
    onApplyResult: (value: string) => void;
}

const TARGET_OPTIONS: { value: BugAiFormState['target']; label: string }[] = [
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
];

const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'EN' },
    { value: 'vi', label: 'VI' },
    { value: 'id', label: 'ID' },
];

const CREATIVITY_OPTIONS: BugAiFormState['creativity'][] = ['low', 'medium', 'high'];

export const AiGenerateModal = ({
    isOpen,
    onClose,
    formState,
    updateFormState,
    onGenerate,
    results,
    onApplyResult,
}: AiGenerateModalProps) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    if (!isOpen) return null;

    const handleCopy = async (value: string, index: number) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (error) {
            console.error('Failed to copy AI suggestion', error);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div>
                        <h2 className="text-xl annon font-semibold text-gray-900">Generate with AI</h2>
                        <p className="text-sm text-gray-500">Let AI draft bug titles or descriptions for you.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-700">For What</p>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                {TARGET_OPTIONS.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${formState.target === option.value ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            className="hidden"
                                            checked={formState.target === option.value}
                                            onChange={() => updateFormState('target', option.value)}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="text-sm font-medium text-gray-700">
                                Language
                                <select
                                    value={formState.language}
                                    onChange={(event) => updateFormState('language', event.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                                >
                                    {LANGUAGE_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="text-sm font-medium text-gray-700">
                                AI Creativity
                                <select
                                    value={formState.creativity}
                                    onChange={(event) => updateFormState('creativity', event.target.value as BugAiFormState['creativity'])}
                                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                                >
                                    {CREATIVITY_OPTIONS.map((option) => (
                                        <option key={option} value={option} className="capitalize">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="text-sm font-medium text-gray-700">
                                Number of Result
                                <input
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={formState.resultCount}
                                    onChange={(event) => updateFormState('resultCount', Number(event.target.value))}
                                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                                />
                            </label>

                            <label className="text-sm font-medium text-gray-700">
                                Maximum Result Length
                                <input
                                    type="number"
                                    min={5}
                                    max={50}
                                    value={formState.maxLength}
                                    onChange={(event) => updateFormState('maxLength', Number(event.target.value))}
                                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                                />
                            </label>
                        </div>

                        <label className="text-sm font-medium text-gray-700">
                            Description of Bug
                            <textarea
                                rows={4}
                                value={formState.prompt}
                                onChange={(event) => updateFormState('prompt', event.target.value)}
                                placeholder="e.g. identify bugs and issues"
                                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                            />
                        </label>

                        <button
                            type="button"
                            onClick={onGenerate}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700"
                        >
                            <Sparkles className="h-4 w-4" />
                            Generate
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <p className="text-sm font-semibold text-gray-900">AI Suggestions</p>
                            <p className="text-xs text-gray-500">Select a suggestion to copy or apply to your form.</p>
                        </div>

                        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                            {results.length === 0 && <p className="text-sm text-gray-500">No AI results yet. Provide a description and click Generate.</p>}
                            {results.map((result, index) => (
                                <div key={`${result}-${index}`} className="rounded-xl border border-gray-200 p-4 shadow-sm">
                                    <p className="text-sm text-gray-800">{result}</p>
                                    <div className="mt-3 flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(result, index)}
                                            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            {copiedIndex === index ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                            {copiedIndex === index ? 'Copied' : 'Copy'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onApplyResult(result)}
                                            className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1 text-xs font-semibold text-white"
                                        >
                                            Use in form
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
