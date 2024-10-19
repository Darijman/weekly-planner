import { useRef, useEffect } from 'react';
import './modal.css';

interface Props {
  title: string;
  showModal: boolean;
  onYes: () => void;
  onNo: () => void;
}

export const Modal = ({ title, showModal, onYes, onNo }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onNo();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal, onNo]);

  return (
    <div className='container'>
      {showModal && (
        <div className='modal_overlay'>
          <div className='modal' ref={modalRef}>
            <button className='close_modal_button' onClick={onNo}>
              ✕
            </button>
            <h2 className='modal_title'>{title}</h2>
            <div className='modal_content'>
              <button onClick={onYes} className='confirm_button'>
                Yes
              </button>
              <button onClick={onNo} className='decline_button'>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
