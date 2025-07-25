import { useRef } from "react";
import { useTimer } from "../context/TimerContext";
import { motion, type PanInfo } from "framer-motion";

function BottomSheet() {
  const {
    dispatch,
    isRunning,
    session,
    shortBreak,
    longBreak,
    themeColor,
    sessionNum,
    isAlarmMuted,
  } = useTimer();

  const sheetRef = useRef(null);
  const isMobile = window.innerWidth < 640;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    const shouldClose = offset > 120 || velocity > 800;

    if (shouldClose) {
      dispatch({ type: "CLOSE_BOTTOMSHEET" });
    }
  };

  function handleSoundToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return dispatch({ type: "TOGGLE_ALARM" });
  }

  const handleTimeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    mode: "session" | "shortBreak" | "longBreak"
  ) => {
    const raw = e.target.value;

    if (raw === "") {
      dispatch({
        type: "SET_TIME",
        payload: { mode, value: 0 },
      });
      return;
    }

    const val = Number(raw);
    if (isNaN(val)) return;

    dispatch({
      type: "SET_TIME",
      payload: { mode, value: val },
    });
  };

  const handleTimeInputBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    mode: "session" | "shortBreak" | "longBreak"
  ) => {
    const val = Number(e.target.value);
    if (isNaN(val) || val < 1) {
      dispatch({
        type: "SET_TIME",
        payload: { mode, value: 1 },
      });
    }
  };

  const handleSessionNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      dispatch({ type: "SET_SESSION_NUM", payload: 0 });
      return;
    }

    const val = Number(raw);
    if (isNaN(val)) return;

    dispatch({ type: "SET_SESSION_NUM", payload: val });
  };

  const handleSessionNumBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (isNaN(val) || val < 1) {
      dispatch({ type: "SET_SESSION_NUM", payload: 2 });
    }
  };

  return (
    <>
      <div
        className="fixed w-full  bg-black/20  inset-0 z-40"
        onClick={() => dispatch({ type: "CLOSE_BOTTOMSHEET" })}
      ></div>
      <motion.div
        ref={sheetRef}
        drag={isMobile ? "y" : false}
        dragConstraints={{ top: 0 }}
        onDragEnd={isMobile ? handleDragEnd : undefined}
        style={
          {
            "--user-color": themeColor,
          } as React.CSSProperties
        }
        className={`z-50 bg-[color:var(--user-color)]/95 p-5 pt-2  ${
          isMobile
            ? "fixed bottom-0 w-full sm:h-2/3 left-1/2 -translate-x-1/2 rounded-t-4xl"
            : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-auto rounded-2xl"
        }`}
      >
        {isMobile && (
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300" />
        )}

        <form className="w-full h-full p-3 flex flex-col gap-3 items-start justify-start">
          <label className="font-bold text-xl w-full flex justify-between items-center">
            Session :
            <input
              type="number"
              min={1}
              value={session === 0 ? "" : session.toString()}
              disabled={isRunning}
              onChange={(e) => handleTimeInputChange(e, "session")}
              onBlur={(e) => handleTimeInputBlur(e, "session")}
              className="bg-gray-50 text-black ml-3 w-1/2 rounded-xs text-center"
            />
          </label>

          <label className="text-xl font-bold w-full flex justify-between items-center">
            Short Break :
            <input
              type="number"
              value={shortBreak === 0 ? "" : shortBreak.toString()}
              disabled={isRunning}
              onChange={(e) => handleTimeInputChange(e, "shortBreak")}
              onBlur={(e) => handleTimeInputBlur(e, "shortBreak")}
              className="bg-gray-50 text-black ml-3 w-1/2 rounded-xs text-center"
            />
          </label>

          <label className="text-xl font-bold w-full flex justify-between items-center">
            Long Break :
            <input
              type="number"
              value={longBreak === 0 ? "" : longBreak.toString()}
              disabled={isRunning}
              onChange={(e) => handleTimeInputChange(e, "longBreak")}
              onBlur={(e) => handleTimeInputBlur(e, "longBreak")}
              className="bg-gray-50 text-black ml-3 w-1/2 rounded-xs text-center"
            />
          </label>

          <label className="text-xl font-bold w-full flex justify-between items-center">
            Number of Sessions :
            <input
              type="number"
              value={sessionNum}
              disabled={isRunning}
              onChange={(e) => handleSessionNumChange(e)}
              onBlur={(e) => handleSessionNumBlur(e)}
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

          <button
            onClick={handleSoundToggle}
            className=" w-full h-13 text-xl font-bold flex items-center justify-between cursor-pointer"
          >
            Sound:
            {isAlarmMuted && (
              <img src="/alarm-off.svg" alt="alarm-off" className="w-10 h-10" />
            )}
            {!isAlarmMuted && (
              <img src="/alarm-on.svg" alt="alarm-on" className="w-10 h-10" />
            )}
          </button>
        </form>
      </motion.div>
    </>
  );
}

export default BottomSheet;
