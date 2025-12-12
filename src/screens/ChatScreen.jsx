import { useState } from "react";
import ChatPane from "../chat/ChatPane.jsx";

export default function ChatScreen({ usernames }) {
  const [messages, setMessages] = useState([]);

  const [replyTo, setReplyTo] = useState({
    user1: null,
    user2: null,
  });

  const [inputs, setInputs] = useState({
    user1: "",
    user2: ""
  });

  const [idCounter, setIdCounter] = useState(1);
  const nextId = () => {
    setIdCounter((p) => p + 1);
    return idCounter;
  };

  function sendMessage(side) {
    const text = inputs[side].trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        sender: side,
        text,
        replyTo: replyTo[side] ? { ...replyTo[side] } : null,
      }
    ]);

    setInputs((p) => ({ ...p, [side]: "" }));
    setReplyTo((p) => ({ ...p, [side]: null }));
  }

  return (
    <div className="grid grid-cols-2 h-full w-full">

      <div className="flex flex-col border-r border-neutral-800">
        <div className="p-3 bg-neutral-900 border-b border-neutral-700">
          <h1 className="text-lg font-semibold">{usernames.user1}</h1>
        </div>

        <ChatPane
          user="user1"
          username={usernames.user1}
          messages={messages}
          input={inputs.user1}
          setInput={(v) => setInputs((p) => ({ ...p, user1: v }))}
          send={() => sendMessage("user1")}
          replyTo={replyTo.user1}
          setReplyTo={(msg) =>
            setReplyTo((p) => ({ ...p, user1: msg }))
          }
        />
      </div>

      <div className="flex flex-col">
        <div className="p-3 bg-neutral-900 border-b border-neutral-700">
          <h1 className="text-xs font-bold ">{usernames.user2}</h1>
        </div>

        <ChatPane
          user="user2"
          username={usernames.user2}
          messages={messages}
          input={inputs.user2}
          setInput={(v) => setInputs((p) => ({ ...p, user2: v }))}
          send={() => sendMessage("user2")}
          replyTo={replyTo.user2}
          setReplyTo={(msg) =>
            setReplyTo((p) => ({ ...p, user2: msg }))
          }
        />
      </div>

    </div>
  );
}
