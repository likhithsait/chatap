export default function UsernameScreen({ usernames, setUsernames, next }) {
  function proceed() {
    if (!usernames.user1.trim() || !usernames.user2.trim()) return;
    next();
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">

      <input
        className="p-2 text-white rounded w-64 border-2 border-gray-400"
        placeholder="Username for User 1"
        value={usernames.user1}
        onChange={(e) =>
          setUsernames((p) => ({ ...p, user1: e.target.value }))
        }
      />

      <input
        className="p-2 text-white rounded w-64 border-2 border-gray-400"
        placeholder="Username for User 2"
        value={usernames.user2}
        onChange={(e) =>
          setUsernames((p) => ({ ...p, user2: e.target.value }))
        }
      />

      <button
        onClick={proceed}
        className="px-4 py-2 bg-green-600 rounded text-white"
      >
        Continue
      </button>
    </div>
  );
}
