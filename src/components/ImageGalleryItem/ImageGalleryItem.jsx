import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({url, tags}) {
  
  return (
    <li className={css.galleryItem}>
      <img className={css.galleryImage} src={url} alt={tags} width="250px"/>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}