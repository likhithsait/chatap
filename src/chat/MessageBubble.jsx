import { useState } from "react";

export default function MessageBubble({ msg, side, setReplyTo }) {
  const mine = msg.sender === side;
  const [hover, setHover] = useState(false);

  return (
    <div 
      className={`flex ${mine ? "justify-end" : "justify-start"} my-1`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className=" max-w-sm">

        <div
          className={`px-3 py-2 rounded-xl border shadow text-white ${
            mine ? "bg-blue-700" : "bg-neutral-800"
          }`}
        >
          {msg.replyTo && (
            <div className="text-xs  bg-black/30 p-1 rounded mb-1">
              {msg.replyTo.text}
            </div>
          )}

          {msg.text}
        </div>

        {hover && (
          <div
            className={`
                           
              bg-neutral-900 border border-neutral-700 rounded-md
              relative bottom-1/4 
              
              
              ${mine ? "-left-14" : "-right-14"}   /* position side */
            `}
          >
            <button
              className="text-white text-sm relative "
              onClick={() => setReplyTo(msg)}
            >
              reply
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
