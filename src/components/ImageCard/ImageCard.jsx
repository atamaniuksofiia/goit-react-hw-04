const ImageCard = ({ image, onImageClick }) => {
  const { urls, alt_description } = image;

  return (
    <div>
      <img
        src={urls.small}
        alt={alt_description || "Image"}
        onClick={() => onImageClick(urls.full, alt_description || "Image")} // Додаємо обробник події натискання
      />
    </div>
  );
};
export default ImageCard;
