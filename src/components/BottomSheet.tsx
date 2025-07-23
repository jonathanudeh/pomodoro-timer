import { useTimer } from "../context/TimerContext";

function BottomSheet() {
  const {
    dispatch,
    session,
    shortBreak,
    longBreak,
    themeColor,
    sessionNum,
    isAlarmMuted,
  } = useTimer();

  function handleSoundToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return dispatch({ type: "TOGGLE_ALARM" });
  }

  return (
    <>
      <div
        className="fixed w-full  bg-black/20  inset-0 z-40"
        onClick={() => dispatch({ type: "CLOSE_BOTTOMSHEET" })}
      ></div>
      <div
        style={{ "--user-color": themeColor } as React.CSSProperties}
        className={`fixed bg-[color:var(--user-color)]/95 w-full h-2/3 bottom-0 z-50 left-1/2 -translate-x-1/2 rounded-t-4xl pt-2 p-5`}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300" />
        <form className="w-full h-full p-3 flex flex-col gap-3 items-start justify-start">
          <label className="font-bold text-xl w-full flex justify-between items-center">
            Session :
            <input
              type="number"
              value={session}
              onChange={(e) =>
                dispatch({
                  type: "SET_TIME",
                  payload: { mode: "session", value: +e.target.value },
                })
              }
              className="bg-gray-50 text-black ml-3 w-1/2 rounded-xs text-center"
            />
          </label>

          <label className="text-xl font-bold w-full flex justify-between items-center">
            Short Break :
            <input
              type="number"
              value={shortBreak}
              onChange={(e) =>
                dispatch({
                  type: "SET_TIME",
                  payload: { mode: "shortBreak", value: +e.target.value },
                })
              }
              className="bg-gray-50 text-black ml-3 w-1/2 rounded-xs text-center"
            />
          </label>

          <label className="text-xl font-bold w-full flex justify-between items-center">
            Long Break :
            <input
              type="number"
              value={longBreak}
              onChange={(e) =>
                dispatch({
                  type: "SET_TIME",
                  payload: { mode: "longBreak", value: +e.target.value },
                })
              }
              className="bg-gray-50 text-black ml-3 w-1/2 rounded-xs text-center"
            />
          </label>

          <label className="text-xl font-bold w-full flex justify-between items-center">
            Number of Sessions :
            <input
              type="number"
              value={sessionNum}
              onChange={(e) =>
                dispatch({ type: "SET_SESSION_NUM", payload: +e.target.value })
              }
              className="bg-gray-50 text-black ml-3 w-1/2 rounded-xs text-center"
            />
          </label>

          <label className="text-xl font-bold w-full flex justify-between items-center">
            Theme Color :
            <input
              type="color"
              value={themeColor}
              onChange={(e) =>
                dispatch({ type: "SET_THEME_COLOR", payload: e.target.value })
              }
              className="bg-gray-50  ml-3 w-1/2 rounded-xs text-center"
            />
          </label>

          <button onClick={handleSoundToggle} className=" w-full h-13 ">
            {isAlarmMuted && (
              <img src="/alarm-off.svg" alt="alarm-off" className="w-10 h-10" />
            )}
            {!isAlarmMuted && (
              <img
                src="/alarm-on.svg"
                alt="alarm-on"
                className="m-auto w-10 h-10"
              />
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default BottomSheet;
