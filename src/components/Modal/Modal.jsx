import { Component } from 'react';
import { createPortal } from 'react-dom';
import { BackDrop, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageModal, title } = this.props;
    return createPortal(
      <BackDrop className="overlay" onClick={this.onOverlayClick}>
        <ModalWindow className="modal">
          <img src={imageModal} alt={title} width="800" />
        </ModalWindow>
      </BackDrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imageModal: PropTypes.string.isRequired,
  title: PropTypes.string,
  onclose: PropTypes.func,
};
