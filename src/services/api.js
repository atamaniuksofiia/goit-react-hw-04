import axios from "axios";

const BASE_URL = "https://api.unsplash.com/";
const ACCESS_KEY = "Q8pYzgP7LozpjMPi760hJmlvutsAZiq9V5tD77qOiI0";
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});
export const searchImages = async (query, page = 1, perPage = 10) => {
  try {
    const response = await apiClient.get("search/photos", {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    return response.data; // Повертає об'єкт з даними
  } catch (error) {
    console.error("Помилка під час пошуку зображень:", error);
    throw error; // Кидає помилку для обробки у вищих рівнях
  }
};

export const getPopularImages = async (page = 1, perPage = 10) => {
  try {
    const response = await apiClient.get("photos", {
      params: {
        page,
        per_page: perPage,
        order_by: "popular", // Сортування за популярністю
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка під час завантаження популярних зображень:", error);
    throw error;
  }
};

export const getPhotoDetails = async (photoId) => {
  try {
    const response = await apiClient.get(`photos/${photoId}`);
    return response.data;
  } catch (error) {
    console.error("Помилка під час завантаження деталей фото:", error);
    throw error;
  }
};
