export default function ReplyPreview({ replyTo, clear }) {
  return (
    <div className="bg-neutral-900 border-l-4 border-blue-500 p-2 mx-3 mb-1 rounded">
      <div className="text-xs opacity-70">Replying to:</div>
      <div className="text-sm">{replyTo.text}</div>
      <button
        className="text-red-400 text-xs mt-1"
        onClick={clear}
      >
        Cancel
      </button>
    </div>
  );
}
