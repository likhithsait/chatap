export default function StartScreen({ next }) {
  return (
    <div className="h-full flex items-center justify-center">
      <button
        onClick={next}
        className="px-6 py-3 bg-blue-600 rounded-lg text-white text-lg"
      >
        Start Session
      </button>
    </div>
  );
}
