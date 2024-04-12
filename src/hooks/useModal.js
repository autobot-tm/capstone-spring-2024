import { useState } from 'react';
/**
 * Custom hook to manage modal state.
 *
 * @returns {Object} Modal state and functions to control it.
 * @property {boolean} isOpen - Whether the modal is open.
 * @property {function} open - Function to open the modal.
 * @property {function} close - Function to close the modal.
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return { isOpen, open, close };
};
