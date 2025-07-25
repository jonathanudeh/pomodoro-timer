import { useTimer } from "../../context/TimerContext";

function StartStop() {
  const { dispatch, isRunning, themeColor } = useTimer();

  function handleStartStop() {
    if (isRunning) {
      dispatch({ type: "PAUSE" });
    } else {
      dispatch({ type: "START" });
    }
  }

  return (
    <button
      style={{ "--user-color": themeColor } as React.CSSProperties}
      className={`w-40 h-12 bg-[color:var(--user-color)] rounded-full font-bold text-lg shadow-2xl cursor-pointer`}
      onClick={handleStartStop}
    >
      {isRunning && "Stop"}
      {!isRunning && "Start"}
    </button>
  );
}

export default StartStop;
