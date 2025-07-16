import AppLayout from "./components/layout/AppLayout";
import MobileNav from "./components/layout/MobileNav";

function App() {
  return (
    <div className="relative max-w-screen w-screen max-h-screen h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white">
      <AppLayout />
      <MobileNav />
    </div>
  );
}

export default App;
