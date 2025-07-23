import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";

const DEFAULT_SESSION = 25;
type ModeType = "session" | "shortBreak" | "longBreak";
const alarm = new Audio("/sound/alarm.mp3");

const initialState: TimerState = {
  session: DEFAULT_SESSION,
  shortBreak: 5,
  longBreak: 15,
  timeLeft: DEFAULT_SESSION * 60,
  sessionNum: 4,
  completedSessions: 0,
  isRunning: false,
  mode: "session",
  isBottomSheetOpen: false,
  themeColor: "#fb2c36",
  isAlarmMuted: false,
};

type TimerState = {
  session: number;
  shortBreak: number;
  longBreak: number;
  timeLeft: number;
  sessionNum: number;
  completedSessions: number;
  isRunning: boolean;
  mode: ModeType;
  isBottomSheetOpen: boolean;
  themeColor: string;
  isAlarmMuted: boolean;
};

type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "TICK" }
  | { type: "SWITCH_MODE"; payload: ModeType }
  | { type: "OPEN-BOTTOMSHEET" }
  | { type: "CLOSE_BOTTOMSHEET" }
  | { type: "SET_TIME"; payload: { mode: ModeType; value: number } }
  | { type: "SET_THEME_COLOR"; payload: string }
  | { type: "SET_SESSION_NUM"; payload: number }
  | { type: "TOGGLE_ALARM" };

type TimerContextType = TimerState & {
  dispatch: React.Dispatch<TimerAction>;
  formatTime: (seconds: number) => string;
};
const TimerContext = createContext<TimerContextType | undefined>(undefined);

type TimerProviderProps = {
  children: ReactNode;
};

function reducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };

    case "PAUSE":
      return { ...state, isRunning: false };

    case "SET_TIME": {
      if (state.isRunning) {
        toast.error("Pause timer to change sessions");
        return state;
      }

      const { value, mode } = action.payload;
      const updatedTime = Math.max(1, value);
      const timeLeft = state.mode === mode ? updatedTime * 60 : state.timeLeft;

      return {
        ...state,
        [mode]: updatedTime,
        timeLeft,
      };
    }

    case "TICK":
      if (state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 };
      }

      if (!state.isAlarmMuted) alarm.play();

      if (state.sessionNum === state.completedSessions) {
        if (!state.isAlarmMuted) alarm.play();
        return initialState;
      }

      // when time is up, switch mode
      if (state.mode === "session") {
        const nextMode =
          (state.completedSessions + 1) % state.sessionNum === 0
            ? "longBreak"
            : "shortBreak";
        const nextTime =
          nextMode === "longBreak"
            ? state.longBreak * 60
            : state.shortBreak * 60;

        return {
          ...state,
          mode: nextMode,
          timeLeft: nextTime,
          completedSessions: state.completedSessions + 1,
        };
      } else {
        // break is over and back to session

        if (!state.isAlarmMuted) alarm.play();

        return {
          ...state,
          mode: "session",
          timeLeft: state.session * 60,
        };
      }

    case "SWITCH_MODE":
      if (state.isRunning) {
        toast.error("Pause timer to change sessions");
        return state;
      }

      {
        const newMode = action.payload;
        let newTime = 0;

        if (newMode === "session") newTime = state.session * 60;
        if (newMode === "shortBreak") newTime = state.shortBreak * 60;
        if (newMode === "longBreak") newTime = state.longBreak * 60;

        return { ...state, mode: newMode, timeLeft: newTime };
      }

    case "OPEN-BOTTOMSHEET":
      return { ...state, isBottomSheetOpen: true };

    case "CLOSE_BOTTOMSHEET":
      return { ...state, isBottomSheetOpen: false };

    case "SET_THEME_COLOR":
      return { ...state, themeColor: action.payload };

    case "SET_SESSION_NUM":
      return { ...state, sessionNum: action.payload };

    case "TOGGLE_ALARM":
      return { ...state, isAlarmMuted: !state.isAlarmMuted };

    default:
      throw new Error("reducer's default return");
  }
}

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [
    {
      session,
      shortBreak,
      longBreak,
      timeLeft,
      isRunning,
      isBottomSheetOpen,
      themeColor,
      sessionNum,
      completedSessions,
      mode,
      isAlarmMuted,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  useEffect(
    function () {
      if (!isRunning) return;

      const countdownTimer = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);

      return () => clearInterval(countdownTimer);
    },
    [isRunning]
  );

  return (
    <TimerContext.Provider
      value={{
        session,
        shortBreak,
        longBreak,
        timeLeft,
        isRunning,
        isBottomSheetOpen,
        themeColor,
        sessionNum,
        completedSessions,
        mode,
        isAlarmMuted,
        formatTime,
        dispatch,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer should be used inside the TimerProvider");
  }
  return context;
};

export { TimerProvider, useTimer };
