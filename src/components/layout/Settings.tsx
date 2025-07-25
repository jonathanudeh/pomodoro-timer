import { useTimer } from "../../context/TimerContext";
import SettingsIcon from "../Settings";

function Settings() {
  const { dispatch, themeColor } = useTimer();

  return (
    <div
      style={{ "--user-color": themeColor } as React.CSSProperties}
      className={`flex justify-around items-center`}
    >
      <button
        onClick={() => {
          return dispatch({ type: "OPEN-BOTTOMSHEET" });
        }}
        className="text-[color:var(--user-color)] rounded-full px-3 h-10 w-fit cursor-pointer font-bold text-xs flex items-center justify-center"
      >
        <SettingsIcon />
        Settings
      </button>
    </div>
  );
}

export default Settings;
