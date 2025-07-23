import { useTimer } from "../../context/TimerContext";

function Settings() {
  const { dispatch, themeColor } = useTimer();

  return (
    <div
      style={{ "--user-color": themeColor } as React.CSSProperties}
      className={`shadow-lg z-20 flex justify-around items-center`}
    >
      <button
        onClick={() => {
          return dispatch({ type: "OPEN-BOTTOMSHEET" });
        }}
        className="text-[color:var(--user-color)] rounded-full px-3 h-10 w-fit cursor-pointer font-bold text-xs flex items-center justify-center"
      >
        <img
          src="/settings.svg"
          alt="setting icon"
          className="w-7 h-7 bg-red-500"
        />{" "}
        Settings
      </button>
    </div>
  );
}

export default Settings;

/*
<footer
      style={{ "--user-color": themeColor } as React.CSSProperties}
      className={`w-70 h-13 bg-[color:var(--user-color)]/70 rounded-full fixed bottom-3 left-1/2 -translate-x-1/2 shadow-lg z-20 flex justify-around items-center`}
    >
      <button
        onClick={() => {
          return dispatch({ type: "OPEN-BOTTOMSHEET" });
        }}
        className="bg-[color:var(--user-color)] rounded-full px-3 h-10 w-fit cursor-pointer"
      >
        Setting
      </button>
    </footer>
*/
