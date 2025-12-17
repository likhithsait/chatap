import { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import ReplyPreview from "./ReplyPreview";

export default function ChatPane({
  user,
  username,
  messages,
  input,
  setInput,
  send,
  replyTo,
  setReplyTo,
  deleteForMe,
  deleteForEveryone
}) {
  
  const inputRef = useRef(null);
  const messageRefs = useRef({});

  const [showTools, setShowTools] = useState(false);
  const [image, setImage] = useState(null);
  const [hover, setHover] = useState(false);

  function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result); 
    setShowTools(false);
  };
  reader.readAsDataURL(file);
}



  useEffect(() => {
    if (replyTo) inputRef.current?.focus();
  }, [replyTo]);

  function keyHandler(e) {
    if (e.key === "Enter"){
          send(image);
        setImage(null);
    }
  }

  function scrollToMessage(id) {
    const node = messageRefs.current[id];
    if (!node) return;

    node.scrollIntoView({ behavior: "smooth", block: "center" });
    node.classList.add("shadow-[0_0_20px_rgba(255,255,255,0.35)]"
);


    setTimeout(() => {
  node.classList.remove(
    "shadow-[0_0_20px_rgba(255,255,255,0.35)]"
  );
}, 800);
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white border-r border-neutral-800 overflow-hidden ">

      <div className="p-3 bg-neutral-900 border-b border-neutral-800 ">
        <h3 className="text-lg font-bold">{username}</h3>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-auto ">
        {messages.map(msg => {
          if (msg.deletedFor?.includes(user)) return null;

          return (
            <div
              key={msg.id}
              ref={el => (messageRefs.current[msg.id] = el)}
             
            >
              <MessageBubble
                msg={msg}
                side={user}
                setReplyTo={setReplyTo}
                onJumpToMessage={scrollToMessage} 
                deleteForMe={deleteForMe}
                deleteForEveryone={deleteForEveryone}
              />
            </div>
          );
        })}
      </div>

      {replyTo && (
        <ReplyPreview
          replyTo={replyTo}
          clear={() => setReplyTo(null)}
          onJump={() => scrollToMessage(replyTo.id)}
        />
      )}

      <div className="p-3 bg-neutral-900 flex gap-2 relative
      " 
        onMouseLeave={() => setHover(false)}>
          {image && (
  <div className="px-3 py-2 bg-neutral-900 flex items-center gap-3">
    <img
      src={image}
      alt="preview"
      className="h-16 w-16 object-cover rounded"
    />
    <button
      onClick={() => setImage(null)}
      className="ml-auto text-neutral-400 hover:text-white text-lg cursor-pointer">
      Cancel
    </button>
  </div>
)}

        <input
          ref={inputRef}
          className="flex-1 px-3 py-2 bg-black rounded"
          placeholder={
                        image
                        ? "Press send to send image"
                        : "Type a message"
                     }
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={keyHandler}
        />

        <button
         onClick={() => {
         send(image);
         setImage(null);
         }}
          className={`px-4 py-2 rounded 
            transition-all duration-200 cursor-pointer
            hover:bg-blue-400 active:scale-105
            ${input.trim() ? "bg-blue-400" : "bg-neutral-700"}
          `}
        >
           ᯓ➤
        </button>
  <div className="relative " >
  <button 
      onMouseEnter={() => setHover(true)}
    className="px-3 py-2 rounded bg-neutral-700 hover:bg-neutral-600 cursor-pointer"
  >
    +
  </button>

  {hover  && (
    <div className="absolute bottom-full mb-2 mr-6 left-0
                    bg-neutral-800 rounded shadow p-2">
      <label className="cursor-pointer text-sm">
        📷 
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </label>
    </div>
  )}
</div>
      </div>
    </div>
  );
}
