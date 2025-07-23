import { useTimer } from "../../context/TimerContext";

function Session() {
  const { completedSessions, sessionNum } = useTimer();
  return (
    <div className="w-20 text-center">
      <span className="font-medium  text-xs text-white block">Session</span>
      <span className="font-bold text-2xl text-white block">
        {completedSessions}/{sessionNum}
      </span>
    </div>
  );
}

export default Session;
