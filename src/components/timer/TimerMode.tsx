import { useTimer } from "../../context/TimerContext";

function TimerMode() {
  const { dispatch, mode, themeColor } = useTimer();

  return (
    <div
      style={{ "--user-color": themeColor } as React.CSSProperties}
      className="bg-[color:var(--user-color)]/70 mb-10 w-3/4 h-15 rounded-full flex items-center justify-around font-bold text-lg"
    >
      <button
        className={`${
          mode === "session" && "bg-[color:var(--user-color)]"
        } rounded-full px-3 h-10 w-fit cursor-pointer`}
        onClick={() => dispatch({ type: "SWITCH_MODE", payload: "session" })}
      >
        Session
      </button>

      <button
        className={`${
          mode === "shortBreak" && "bg-[color:var(--user-color)]"
        } rounded-full px-3 h-10 w-fit cursor-pointer`}
        onClick={() => dispatch({ type: "SWITCH_MODE", payload: "shortBreak" })}
      >
        Short
      </button>

      <button
        className={`${
          mode === "longBreak" && "bg-[color:var(--user-color)]"
        } rounded-full px-3 h-10 w-fit cursor-pointer`}
        onClick={() => dispatch({ type: "SWITCH_MODE", payload: "longBreak" })}
      >
        Long
      </button>
    </div>
  );
}

export default TimerMode;
