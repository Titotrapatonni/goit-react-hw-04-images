import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import toast from 'react-hot-toast';
import { Loader } from 'components/Loader/Loader';
import { Component } from 'react';
import { getFetchImages } from '../Services';
import { Modal } from 'components/Modal/Modal';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';
export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    totalHits: 1,
    disableBtn: false,
    error: '',
    modalImage: null,
    modalAlt: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { images, disableBtn } = this.state;
    const { query, page } = this.props;

    if (prevProps.query !== query) {
      this.setState(prevState => ({
        ...prevState,
        images: [],
        totalHits: 0,
        disableBtn: false,
      }));
    }

    if (prevProps.query !== query || prevProps.page !== page) {
      this.getFetchApi();
    }

    if (
      images.length !== 0 &&
      !disableBtn &&
      this.state.totalHits > images.length
    ) {
      this.setState({ disableBtn: true });
    }
  }
  async getFetchApi() {
    try {
      this.setState({ isLoading: true });

      const { query, page } = this.props;

      const data = await getFetchImages(query, page);
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        totalHits: data.totalHits,
      }));

      if (data.totalHits === 0) {
        toast.error('Nothing was found for your request', { duration: 1500 });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleShowModal = (imageModal, title) => {
    this.toggleModal();
    this.setState({ modalImage: imageModal, modalAlt: title });
  };

  handleClick = () => {
    console.log('click');
  };

  render() {
    return (
      <>
        <Gallery className="gallery">
          {this.state.images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={this.handleShowModal}
              />
            );
          })}
        </Gallery>

        {this.state.isLoading && <Loader />}
        {this.state.disableBtn && this.state.images.length % 12 === 0 && (
          <Button onClick={() => this.props.loadMore()} />
        )}
        {this.state.showModal && (
          <Modal
            imageModal={this.state.modalImage}
            title={this.state.modalAlt}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
};
