import { Toaster } from "react-hot-toast";
import AppLayout from "./components/layout/AppLayout";
import { TimerProvider } from "./context/TimerContext";
import MessageBanner from "./components/MessageBanner";

function App() {
  return (
    <TimerProvider>
      <div className="relative max-w-screen w-screen max-h-screen h-[calc(100vh)] flex flex-col items-center justify-center">
        <MessageBanner />
        <Toaster />
        <AppLayout />
      </div>
    </TimerProvider>
  );
}

export default App;
