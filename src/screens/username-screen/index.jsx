export default function UsernameScreen({ usernames, setUsernames, next }) {
 function proceed() {
  const u1 = usernames.user1.trim();
  const u2 = usernames.user2.trim();

  if (!u1 || !u2) {
    alert("please enter username")
    return;}

  if (hasNumber(u1) || hasNumber(u2)){
    alert("please remove any special characters(!@#$..) and numbers from username")
    return;
  }

  next();
}

  function keyHandler(e){
    if(e.key === "Enter") proceed();
  }

  function hasNumber(str) {
   return /[^a-zA-Z ]/.test(str);

}


  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">

      <input
        className="p-2 text-white rounded w-64 border-2 border-neutral-500 "
        placeholder="Username for User 1"
        value={usernames.user1}
        onChange={(e) =>
          setUsernames((p) => ({ ...p, user1: e.target.value }))
        }
        onKeyDown={keyHandler}
      />

      <input
        className="p-2 text-white rounded w-64 border-2 border-neutral-500 "
        placeholder="Username for User 2"
        value={usernames.user2}
        onChange={(e) =>
          setUsernames((p) => ({ ...p, user2: e.target.value }))
        }
        onKeyDown={keyHandler}
      />

      <button
        onClick={proceed}
        className="px-4 py-2 bg-green-600 rounded text-white cursor-pointer"
      >
        Continue →
      </button>
    </div>
  );
}
