import { useRef, useEffect } from "react";
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

  useEffect(() => {
    if (replyTo) inputRef.current?.focus();
  }, [replyTo]);

  function keyHandler(e) {
    if (e.key === "Enter") send();
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
      ">
        <input
          ref={inputRef}
          className="flex-1 px-3 py-2 bg-black rounded"
          placeholder="Type a message"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={keyHandler}
        />

        <button
          onClick={send}
          className={`px-4 py-2 rounded
            transition-all duration-200 cursor-pointer
            hover:bg-blue-400 active:scale-105
            ${input.trim() ? "bg-blue-400" : "bg-neutral-700"}
          `}
        >
           ᯓ➤
        </button>
      </div>
    </div>
  );
}
