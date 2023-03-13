import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import toast from 'react-hot-toast';
import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { getFetchImages } from '../Services';
import { Modal } from 'components/Modal/Modal';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ query, page, loadMore }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setImages([]);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setDisableBtn(false);
      return;
    }
    const getFetchApi = async () => {
      try {
        setIsLoading(true);

        const data = await getFetchImages(query, page);

        setImages(prevState => {
          return [...prevState, ...data.hits];
        });
        setDisableBtn(true);
        if (data.totalHits === 0) {
          toast.error('Nothing was found for your request', { duration: 1500 });
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFetchApi();
  }, [page, query]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleShowModal = (imageModal, title) => {
    toggleModal();
    setModalImage(imageModal);
    setModalAlt(title);
  };

  return (
    <>
      <Gallery className="gallery">
        {images.length !== 0 &&
          images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={handleShowModal}
              />
            );
          })}
      </Gallery>

      {isLoading && <Loader />}
      {disableBtn && images.length % 12 === 0 && (
        <Button onClick={() => loadMore()} />
      )}
      {showModal && (
        <Modal imageModal={modalImage} title={modalAlt} onClose={toggleModal} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
};
