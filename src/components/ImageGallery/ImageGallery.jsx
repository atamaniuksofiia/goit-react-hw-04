import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul>
      {images.map((image) => (
        <li
          key={image.id}
          onClick={() =>
            onImageClick(image.urls.regular, image.alt_description)
          }
        >
          <ImageCard src={image.urls.small} alt={image.alt_description} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
