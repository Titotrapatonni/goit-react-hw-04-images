import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { id, webformatURL, largeImageURL },
  onClick,
}) => {
  return (
    <Item
      className="gallery-item"
      id={id}
      onClick={() => onClick(largeImageURL)}
    >
      <Image src={webformatURL} alt="img" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
};
