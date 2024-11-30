import React, { useState, useEffect } from 'react';


function DeleteConfirmation({ isOpen, onClose, onDelete }) {
  
  
    const [confirmText, setConfirmText] = useState('');
  
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (confirmText === 'DELETE') {
      onDelete();
      onClose();
      setConfirmText('');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-[#1E1F21] w-full max-w-md rounded-lg p-6 shadow-lg transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-xl font-semibold">
            Confirm Deletion
          </h2>
          
          <p className="text-gray-400">
            This action cannot be undone. Please type{' '}
            <span className="text-red-500 font-semibold">DELETE</span>
            {' '}to confirm.
          </p>
          
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="w-full p-3 bg-[#1E1F21] border border-gray-600 rounded-md text-white 
                     placeholder-gray-500 focus:outline-none focus:border-red-500 
                     transition-colors"
          />
          
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md 
                       hover:bg-opacity-80 transition-colors"
            >
              Cancel
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={confirmText !== 'DELETE'}
              className={`px-4 py-2 rounded-md text-white transition-colors ${
                confirmText === 'DELETE'
                  ? 'bg-red-500 hover:bg-opacity-80'
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;