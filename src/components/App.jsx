import { useState, useEffect } from 'react';

import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'Api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if(query === ''){
      return
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const onSubmit = e => {
    e.preventDefault();
    setImages([]);
    setPage(1);

    const searchQuery = e.target.elements.searchQuery.value;
    setQuery(searchQuery);
  };

  const onShowMore = e => {
    e.preventDefault();
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = e => {
    e.preventDefault();
    setShowModal(true);
    setCurrentImage(e.target);
  };

  return (
    <div className={css.contentContainer}>
      <Searchbar onSubmit={onSubmit} />
      {error && <p>Something went wrong: {error.message}</p>}
      {isLoading && <Loader/>}
      <ImageGallery onClick={openModal} images={images} />
      {!!images.length && !isLoading && <Button onShowMore={onShowMore} />}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={currentImage.src} alt={currentImage.alt} />
        </Modal>
      )}
    </div>
  );
}
