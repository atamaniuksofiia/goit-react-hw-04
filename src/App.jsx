import SearchBar from "./components/SearchBar/SearchBar";
import React from "react";
import { useState, useEffect } from "react";
import { searchImages, getPopularImages } from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setError(null);
    setLoading(true);
    try {
      const data = await searchImages(newQuery);
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

  useEffect(() => {
    const fetchPopularImages = async () => {
      setLoading(true);
      try {
        const data = await getPopularImages();
        setImages(data);
      } catch (error) {
        console.error("Помилка під час завантаження популярних фото:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularImages();
  }, []);

  return (
    <div>
      <SearchBar onChangeQuery={handleSearch} />
      <ImageGallery images={images} />
    </div>
  );
};
export default App;
