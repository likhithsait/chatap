export default function DeleteModal({
  isOpen,
  onClose,
  onDeleteForMe,
  onDeleteForEveryone,
  canDeleteForEveryone
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
     
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div className="relative bg-neutral-900 border border-neutral-700 rounded-lg p-4 w-64 shadow-lg">
        <p className="text-sm mb-3 text-white">
          Delete message?
        </p>

        <button
          onClick={onDeleteForMe}
          className="block w-full text-left text-sm py-2 px-2 rounded hover:bg-neutral-800 text-white"
        >
          Delete for me
        </button>

        {canDeleteForEveryone && (
          <button
            onClick={onDeleteForEveryone}
            className="block w-full text-left text-sm py-2 px-2 rounded hover:bg-neutral-800 text-red-400"
          >
            Delete for everyone
          </button>
        )}

        <button
          onClick={onClose}
          className="block w-full text-left text-sm py-2 px-2 rounded hover:bg-neutral-800 opacity-70 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
