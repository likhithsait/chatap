export default function ReplyPreview({ replyTo, clear, onJump }) {
  return (
    <div className="px-3 py-2 bg-neutral-800 border-l-4 border-neutral-500 flex justify-between items-center">
      <div
        onClick={onJump}
        className="cursor-pointer text-sm opacity-80 hover:opacity-100 "
      >
        Replying to: {replyTo.text}
      </div>

      <button
        onClick={clear}
        className="text-xs opacity-60 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}
