export default function StartScreen({ next }) {
  return (
    <div className="h-full flex items-center justify-center">
      <button
        onClick={next}
        className="px-16 py-13 bg-neutral-600 rounded-lg text-white text-4xl cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_18px_rgba(156,163,175,0.8)]"
      >
        Start Session
      </button>
    </div>
  );
}
