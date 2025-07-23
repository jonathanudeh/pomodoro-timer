import { Toaster } from "react-hot-toast";
import AppLayout from "./components/layout/AppLayout";
import MobileNav from "./components/layout/MobileNav";
import { TimerProvider } from "./context/TimerContext";

function App() {
  return (
    <TimerProvider>
      <div className="relative max-w-screen w-screen max-h-screen h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white">
        <Toaster />
        <AppLayout />
        <MobileNav />
      </div>
    </TimerProvider>
  );
}

export default App;
