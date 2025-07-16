import BottomSheet from "../BottomSheet";
import Session from "../timer/session";
import StartStop from "../timer/StartStopBtn";
import TimerCircle from "../timer/TimerCircle";
import TimerCounter from "../timer/TimerCounter";

function AppLayout() {
  return (
    <>
      <header className="h-20 max-w-30 w-30 bg-red-500 ml-auto rounded-bl-4xl flex flex-col items-center justify-center">
        <Session />
      </header>
      <main className="relative max-w-full bg-blue-400  w-full h-full flex flex-col items-center justify-start pt-20 gap-5">
        <TimerCircle />
        <TimerCounter />
        <StartStop />
        {/* <MobileNav /> */}
        {/* <BottomSheet /> */}
      </main>
    </>
  );
}

export default AppLayout;
