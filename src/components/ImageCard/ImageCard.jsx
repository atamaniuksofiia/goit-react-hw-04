const ImageCard = ({ src, alt }) => {
  return (
    <div>
      <img src={src} alt={alt || "Image"} />
    </div>
  );
};

export default ImageCard;
