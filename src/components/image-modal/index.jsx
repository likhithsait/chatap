export default function ImageModal({ isOpen, image, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 ">
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold hover:opacity-70 cursor-pointer"
      >
        ✕
      </button>
     
      <img
        src={image}
        alt="preview"
        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
      />
     
    </div>
  );
}
