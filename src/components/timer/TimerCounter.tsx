import { useTimer } from "../../context/TimerContext";

function TimerCounter() {
  const { formatTime, timeLeft } = useTimer();

  return (
    <div className="font-bold  text-5xl text-black">{formatTime(timeLeft)}</div>
  );
}

export default TimerCounter;
