import BottomSheet from "../BottomSheet";
import Session from "../timer/CurrSession";
import StartStop from "../timer/StartStopBtn";
import TimerCircle from "../timer/TimerCircle";
import TimerCounter from "../timer/TimerCounter";
import { useTimer } from "../../context/TimerContext";
import TimerMode from "../timer/TimerMode";
import MobileNav from "./Settings";

function AppLayout() {
  const { isBottomSheetOpen, themeColor } = useTimer();

  return (
    <>
      <header
        style={{ "--user-color": themeColor } as React.CSSProperties}
        className={`h-30 max-w-30 w-30 bg-[color:var(--user-color)] ml-auto rounded-bl-4xl flex flex-col items-center justify-center`}
      >
        <Session />
      </header>
      <main className="relative max-w-full w-full h-full flex flex-col items-center justify-start pt-5 gap-5">
        <TimerMode />
        <TimerCircle />
        <TimerCounter />
        <StartStop />
        <MobileNav />
        {isBottomSheetOpen && <BottomSheet />}
      </main>
    </>
  );
}

export default AppLayout;
