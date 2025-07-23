import { useTimer } from "../../context/TimerContext";

function MobileNav() {
  const { dispatch, themeColor } = useTimer();

  return (
    <footer
      style={{ "--user-color": themeColor } as React.CSSProperties}
      className={` shadow-lg z-20 flex justify-around items-center`}
    >
      <button
        onClick={() => {
          return dispatch({ type: "OPEN-BOTTOMSHEET" });
        }}
        className="text-[color:var(--user-color)] rounded-full px-3 h-10 w-fit cursor-pointer flex"
      >
        <img src="/settings.svg" alt="setting icon" className="w-7 h-7" />{" "}
        Setting
      </button>
    </footer>
  );
}

export default MobileNav;

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
