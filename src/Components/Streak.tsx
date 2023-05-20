import "./Streak.css";

interface StreakProps {
  streak: number;
}

export default function Streak({ streak }: StreakProps) {
  return (
    <div className="streakBox w-24 h-24 p-4 flex items-center justify-center">
      <span className="text-2xl">{streak}</span>
    </div>
  );
}
