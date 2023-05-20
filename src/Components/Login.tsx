import { FormEvent, useState } from "react";
import { User } from "../App";

interface LoginProps {
  setUser: (user: User) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setStreak: (clicks: number) => void;
  setIsNewUser: (user: boolean) => void;
}

export default function Login({ setUser, setLoggedIn, setStreak, setIsNewUser }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidUsername, setInvalidUsername] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user === "no user") {
          setInvalidUsername(true);
          setUsername("");
          setPassword("");
          return;
        } else {
          document.cookie = `user = ${user}; expires=${expirationDate}`;
          document.cookie = `lastClickedTime = ${user.lastClickTime}; expires=${expirationDate}`;
          setInvalidUsername(false);
          setUser(user);
          setLoggedIn(true);
          setStreak(user.consecutiveClickDays);
        }
        // console.log('user returend', user)
      });
  };

  return (
    <section className="mt-20">
      <h1>Login</h1>
      <form className="flex flex-col gap-3 mb-1" onSubmit={handleLogin}>
        {invalidUsername && <span>Username or password is incorrect</span>}

        <input
          className="px-4 py-1 rounded-sm w-72"
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="px-4 py-1 rounded-sm w-72"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-purple-400 rounded-xl px-8 py-1 hover:brightness-90"
          type="submit"
        >
          Login
        </button>
      </form>
      <a className="underline mt-2 hover:brightness-90" href="#" onClick={() => setIsNewUser(true)}>
        No account? Register here
      </a>
    </section>
  );
}
