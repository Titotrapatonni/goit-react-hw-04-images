import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BackDrop, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, imageModal, title }) => {
  const onOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };
  const onEscClick = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onEscClick);
    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  });

  return createPortal(
    <BackDrop className="overlay" onClick={onOverlayClick}>
      <ModalWindow className="modal">
        <img src={imageModal} alt={title} width="800" />
      </ModalWindow>
    </BackDrop>,
    modalRoot
  );
};

Modal.propTypes = {
  imageModal: PropTypes.string.isRequired,
  title: PropTypes.string,
  onclose: PropTypes.func,
};
