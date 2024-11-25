import SearchBar from "./components/SearchBar/SearchBar";
import React from "react";
import { useState, useEffect } from "react";
import { searchImages } from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { Toaster, toast } from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchImages(query, page);
        if (data.results.length === 0) {
          if (page === 1) {
            setError("За вашим запитом нічого не знайдено.");
          }
        } else {
          setImages((prevImages) =>
            page === 1 ? data.results : [...prevImages, ...data.results]
          );
        }
      } catch (error) {
        setError("Не вдалося завантажити зображення. Спробуйте ще раз.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) {
      toast.error("Будь ласка, введіть текст для пошуку.");
      return;
    }

    if (newQuery === query) return;

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageSrc, imageAlt) => {
    setModalData({
      isOpen: true,
      imageSrc,
      imageAlt,
    });
  };

  const closeModal = () => {
    setModalData({
      isOpen: false,
      imageSrc: "",
      imageAlt: "",
    });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onChangeQuery={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {loading && <Loader />}
          {images.length > 0 && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}
      <ImageModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        imageSrc={modalData.imageSrc}
        imageAlt={modalData.imageAlt}
      />
    </div>
  );
};
export default App;
