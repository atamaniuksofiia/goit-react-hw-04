import Modal from "react-modal";

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "transparent",
          border: "none",
        },
      }}
      ariaHideApp={false}
    >
      <div onClick={onClose} style={{ cursor: "pointer" }}>
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{ maxWidth: "100%", maxHeight: "80vh", display: "block" }}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
