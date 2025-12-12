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
  setReplyTo
}) {
  
  function keyHandler(e) {
    if (e.key === "Enter") send();
  }

  return (
    <div className={`flex flex-col h-full bg-black text-white 
      ${user === "user1" ? "border-r border-neutral-800" : ""}`}>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            side={user}
            setReplyTo={setReplyTo}
          />
        ))}
      </div>

      {/* Show reply preview ONLY for this user */}
      {replyTo && (
        <ReplyPreview
          replyTo={replyTo}
          clear={() => setReplyTo(null)}
        />
      )}

      {/* Input */}
      <div className="p-3 bg-neutral-900 flex gap-2 border-t border-neutral-700">
        <input
          className="flex-1 px-3 py-2 bg-black border border-neutral-700 rounded"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={keyHandler}
        />
        <button
          onClick={send}
          className={`px-4 py-2 rounded ${
            user === "user1" ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}
