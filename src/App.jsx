import SearchBar from "./components/SearchBar/SearchBar";
import React from "react";
import { useState } from "react";
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

  const handleSearch = async (newQuery) => {
    if (!newQuery.trim()) {
      toast.error("Будь ласка, введіть текст для пошуку.");
      return;
    }

    if (newQuery === query) return;

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setLoading(true);

    try {
      const data = await searchImages(newQuery, 1);
      if (data.results.length === 0) {
        setError("За вашим запитом нічого не знайдено.");
      } else {
        setImages(data.results);
      }
    } catch (error) {
      setError("Не вдалося завантажити зображення. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);

    try {
      const data = await searchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data.results]);
    } catch (error) {
      setError("Не вдалося завантажити нові зображення");
    } finally {
      setLoading(false);
    }
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

  // useEffect(() => {
  //   const fetchPopularImages = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await getPopularImages();
  //       setImages(data);
  //     } catch (error) {
  //       setError("Не вдалося завантажити популярні фото.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPopularImages();
  // }, [page]);

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
