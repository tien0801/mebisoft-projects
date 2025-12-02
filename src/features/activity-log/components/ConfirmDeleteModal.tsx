"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  type?: "member" | "file";
}

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  type = "member",
}: ConfirmDeleteModalProps) => {
  if (!isOpen) return null;

  const config = {
    member: {
      title: "Remove Member?",
      messagePart1: "Are you sure you want to remove",
      messagePart2: "from this project?",
      buttonText: "Yes, Remove",
    },
    file: {
      title: "Delete File?",
      messagePart1: "Are you sure you want to permanently delete",
      messagePart2: "?",
      buttonText: "Yes, Delete",
    },
  };

  const text = config[type];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 backdrop-blur-sm p-4 transition-all">
      <div className="bg-white rounded-2xl w-[90%] sm:w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#ff4f68]">
            <AlertTriangle size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{text.title}</h3>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            {text.messagePart1}{" "}
            <span className="font-bold text-gray-800">{itemName}</span>{" "}
            {text.messagePart2}
            <br className="hidden sm:block" />
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center flex-col sm:flex-row">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-500/20 transition-all font-semibold text-sm"
            >
              {text.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
