import { useState } from "react";
import ChatPane from "../../components/chat-pane";

export default function ChatScreen({ usernames }) {
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState({ user1: null, user2: null });
  const [inputs, setInputs] = useState({ user1: "", user2: "" });
  const [idCounter, setIdCounter] = useState(1);

  function sendMessage(side, image = null) {
    const text = inputs[side].trim();
    if (!text && !image) return;

    setMessages(prev => [
      ...prev,
      {
        id: idCounter,
        sender: side,
        text,
        image,
        replyTo: replyTo[side] ? { ...replyTo[side] } : null,
        deletedFor: [],
        deletedGlobally: false
      }
    ]);

    setIdCounter(p => p + 1);
    setInputs(p => ({ ...p, [side]: "" }));
    setReplyTo(p => ({ ...p, [side]: null }));
  }

  function deleteForMe(id, user) {
    setMessages(p =>
      p.map(m =>
        m.id === id
          ? { ...m, deletedFor: [...m.deletedFor, user] }
          : m
      )
    );
  }

  function deleteForEveryone(id) {
    setMessages(p =>
      p.map(m =>
        m.id === id ? { ...m, deletedGlobally: true } : m
      )
    );
  }

  return (
    <div className="grid grid-cols-2 h-screen bg-black">
      <ChatPane
        user="user1"
        username={usernames.user1}
        messages={messages}
        input={inputs.user1}
        setInput={v => setInputs(p => ({ ...p, user1: v }))}
        send={(image) => sendMessage("user1", image)}
        replyTo={replyTo.user1}
        setReplyTo={msg => setReplyTo(p => ({ ...p, user1: msg }))}
        deleteForMe={deleteForMe}
        deleteForEveryone={deleteForEveryone}
      />

      <ChatPane
        user="user2"
        username={usernames.user2}
        messages={messages}
        input={inputs.user2}
        setInput={v => setInputs(p => ({ ...p, user2: v }))}
        send={(image) => sendMessage("user2", image)}
        replyTo={replyTo.user2}
        setReplyTo={msg => setReplyTo(p => ({ ...p, user2: msg }))}
        deleteForMe={deleteForMe}
        deleteForEveryone={deleteForEveryone}
      />
    </div>
  );
}
