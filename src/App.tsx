import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Streak from "./Components/Streak";
import Register from "./Components/Register";

export type User = {
  username: string;
  password: string;
  consecutiveClickDays: number;
  lastClickTime: Date;
};

export default function App() {
  const [user, setUser] = useState<User>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  // const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  if (!loggedIn)
    return (
      <>
        <Header />
        <main className="w-full h-screen flex flex-col items-center">
          {isNewUser ? (
            <Register
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              setStreak={setStreak}
              setIsNewUser={setIsNewUser}
            />
          ) : (
            <Login
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              setStreak={setStreak}
              setIsNewUser={setIsNewUser}
            />
          )}
        </main>
      </>
    );

  const handleStreak = () => {
    setStreak((prev) => prev + 1);
    // setButtonDisabled(true);
    fetch("http://localhost:3000/streak", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user?.username, streak, date: Date.now() }),
    }).then((res) => res.json());
    // .then((streak) => (newStreak = streak.newStreak));
    //  console.log('lastPickedCookie',  getCookieValue("lastPicked"))
  };

  const renderStreak = () => {
    const components = [];
    for (let i = 1; i <= streak; i++) {
      components.push(<Streak key={i} streak={i} />);
    }
    return components;
  };

  return (
    <>
      <Header />
      <main className="w-full flex flex-col items-center gap-10">
        <h1 className="text-center light:brightness-90">Hey {user?.username}</h1>
        <div className="flex flex-col gap-4 items-center w-72">
          <button
            className="flex items-center justify-center text-white shadow-md hover:shadow-xl border rounded-xl bg-purple-400 border-none w-full px-10 py-4 text-lg hover:brightness-90 disabled:bg-gray-500 disabled:border-none disabled:text-gray-400"
            onClick={handleStreak}
          >
            Up your streak
          </button>
          <h2> Current Streak: {streak} </h2>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-600">
          <div
            className="bg-purple-400 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
            style={{ width: `${Math.floor((streak % 10) * 10)}%` }}
          >
            {(streak % 10) * 10 + "%"}
          </div>
        </div>
        <section className="flex flex-wrap gap-2 md:gap-8 justify-center my-24">
          {renderStreak()}
        </section>
      </main>
    </>
  );
}
