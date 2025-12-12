import { useState } from "react";
import StartScreen from "./screens/StartScreen.jsx";
import UsernameScreen from "./screens/UsernameScreen.jsx";
import ChatScreen from "./screens/ChatScreen.jsx";

export default function App() {
  const [stage, setStage] = useState("start"); // start → username → chat
  const [usernames, setUsernames] = useState({ user1: "", user2: "" });

  return (
    <div className="h-screen w-screen bg-black text-white">
      {stage === "start" && <StartScreen next={() => setStage("username")} />}

      {stage === "username" && (
        <UsernameScreen
          usernames={usernames}
          setUsernames={setUsernames}
          next={() => setStage("chat")}
        />
      )}

      {stage === "chat" && <ChatScreen usernames={usernames} />}
    </div>
  );
}
