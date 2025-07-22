import { createContext, useContext, useReducer, type ReactNode } from "react";

const initialState = {
  session: 25,
  shortBreak: 5,
  longBreak: 15,
  timeLeft: 25 * 60,
  isRunning: false,
  isBottomSheetOpen: false,
  uiFontColor: "",
};

type TimerState = {
  session: number;
  shortBreak: number;
  longBreak: number;
  timeLeft: number;
  isRunning: boolean;
  isBottomSheetOpen: boolean;
  uiFontColor: string;
};

type TimerAction = { type: "START" } | { type: "PAUSE" } | { type: "TICK" };

type TimerContextType = {
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
};
const TimerContext = createContext<TimerContextType | undefined>(undefined);

type TimerProviderProps = {
  children: ReactNode;
};

function reducer(state: TimerState, action: TimerAction) {
  switch (action.type) {
    case "PAUSE":
      return { ...state, isRunning: false };
    default:
      throw new Error("reducer's default return");
  }
}

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
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
