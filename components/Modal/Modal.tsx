import React, { ReactNode, useEffect, useRef } from "react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  className?: string; // Optional className prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, width, className }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown)
      document.addEventListener("click", handleClickOutside)
    } else {
      document.removeEventListener("keydown", handleKeydown)
      document.removeEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div style={{width: '100%'}}>
        
      <div
        ref={modalRef}
        className={`bg-white p-8 rounded-lg shadow-lg relative ${className || ''}`} // Append additional className here
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
      </div>

    </div>
  )
}

export default Modal;
