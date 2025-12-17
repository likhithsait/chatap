import { useState } from "react";
import DeleteModal from "../delete-modal";
import ImageModal from "../image-modal";

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
  const [showImage, setShowImage] = useState(false);


if (msg.deletedGlobally) {
  return (
  <div className={`flex ${mine ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`inline-block px-3 py-2 rounded-xl shadow text-white  ${
          mine ? "bg-blue-950" : "bg-stone-700"
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
  className={`px-3 py-2 rounded-xl shadow text-white break-words
               ${mine ? "bg-blue-950" : "bg-stone-800"}`}
>
  {msg.replyTo && !msg.replyTo.image &&(
    <div
      onClick={() => onJumpToMessage(msg.replyTo.id)}
      className="text-xs bg-black/30 p-1 rounded mb-1 cursor-pointer"
      
    >
      {msg.replyTo.text}

    </div>
  )}

  {msg.image && (
    <img
      src={msg.image}
      alt="uploaded"
      className="mb-2 max-w-xs rounded cursor-pointer pt-2"
      onClick={() => setShowImage(true)}
    />
  )}

   {msg.replyTo && msg.replyTo.image && 
      (
    <div className=" bg-black/30 p-2 rounded" onClick={() => onJumpToMessage(msg.replyTo.id)}>
      
      <img
      src={msg.replyTo.image}
      alt="uploaded"
      className="mb-2 max-w-60 rounded cursor-pointer pt-2 "
      
      />
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
        <ImageModal
          isOpen={showImage}
          image={msg.image}
          onClose={() => setShowImage(false)}
        />

      </div>
    </div>
  );
}
