import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function MessageBubble({
  msg,
  side,
  setReplyTo,
  onJumpToMessage,
  deleteForMe,
  deleteForEveryone
}) {
  const mine = msg.sender === side;
  const [hover, setHover] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

if (msg.deletedGlobally) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`inline-block px-3 py-2 rounded-xl shadow text-white  ${
          mine ? "bg-blue-500" : "bg-stone-700"
        }`}
      >
        ⊘ This message was deleted
      </div>
    </div>
  );
}

  return (
    <div
      className={`flex ${mine ? "justify-end" : "justify-start"} my-1`}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative max-w-sm ">
        <div
          onMouseEnter={() => setHover(true)}
          className={`px-3 py-2 rounded-xl shadow text-white  wrap-break-word
                       ${
            mine ? "bg-blue-900" : "bg-stone-800"
          }`}
        >
          {msg.replyTo && (
            <div
              onClick={() => onJumpToMessage(msg.replyTo.id)}
              className="text-xs bg-black/30 p-1 rounded mb-1 cursor-pointer"
            >
              {msg.replyTo.text}
            </div>
          )}
          {msg.text}
        </div>

        {hover && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 flex bg-neutral-800 rounded ${
                        mine ? "right-full mr-1" : "left-full ml-1"
                      }`}
          >
            <button
              onClick={() => setReplyTo(msg)}
              className="bg-neutral-800 text-white text-2xl px-2 py-1 rounded hover:bg-neutral-700 cursor-pointer"
            >
              ↩
            </button>

            <button
              onClick={() => setShowDelete(true)}
              className="bg-neutral-800 text-white text-2xl px-2 py-1 rounded hover:bg-neutral-700 cursor-pointer"
            >
              🗑
            </button>
          </div>
        )}

        <DeleteModal
          isOpen={showDelete}
          onClose={() => setShowDelete(false)}
          onDeleteForMe={() => {
            deleteForMe(msg.id, side);
            setShowDelete(false);
          }}
          onDeleteForEveryone={() => {
            deleteForEveryone(msg.id);
            setShowDelete(false);
          }}
          canDeleteForEveryone={mine}
        />
      </div>
    </div>
  );
}
