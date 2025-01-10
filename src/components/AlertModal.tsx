import React from 'react';

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[15px] p-6 max-w-sm w-full mx-4">
        <p className="text-center mb-6 font-montserrat">{message}</p>
        <button
          onClick={onConfirm}
          className="w-full bg-yellow-400 py-3 text-white rounded-[15px] font-montserrat hover:bg-yellow-500"
        >
          확인
        </button>
      </div>
    </div>
  );
}; 