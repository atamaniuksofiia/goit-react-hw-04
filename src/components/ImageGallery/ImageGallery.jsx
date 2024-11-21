const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <div>
            <img
              src={image.urls.small}
              alt={image.alt_description || "Image"}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
