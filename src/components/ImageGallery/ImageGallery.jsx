import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export function ImageGallery({ images,  onClick}) {
  return (
    <ul className={css.gallery} onClick={onClick}>
      {images.map(({ webformatURL, id, tags }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          tags={tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};