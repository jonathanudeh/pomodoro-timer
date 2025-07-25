import { useTimer } from "../context/TimerContext";

function SettingsIcon() {
  const { themeColor } = useTimer();
  return (
    <svg
      style={
        {
          "--user-color": themeColor,
        } as React.CSSProperties
      }
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-6 h-6 text-[color:var(--user-color)] m-1"
    >
      <path d="M19.43 12.98c.04-.32.07-.66.07-1s-.03-.68-.07-1l2.11-1.65a.5.5 0 00.12-.64l-2-3.46a.5.5 0 00-.6-.22l-2.49 1a7.026 7.026 0 00-1.73-1l-.38-2.65A.5.5 0 0014 2h-4a.5.5 0 00-.49.42l-.38 2.65a6.978 6.978 0 00-1.73 1l-2.49-1a.5.5 0 00-.6.22l-2 3.46a.5.5 0 00.12.64L4.57 11c-.04.32-.07.66-.07 1s.03.68.07 1L2.46 14.65a.5.5 0 00-.12.64l2 3.46c.14.24.43.34.68.22l2.49-1c.52.4 1.1.73 1.73 1l.38 2.65c.04.24.25.42.49.42h4c.24 0 .45-.18.49-.42l.38-2.65c.63-.27 1.21-.6 1.73-1l2.49 1c.25.12.54.02.68-.22l2-3.46a.5.5 0 00-.12-.64l-2.11-1.65zM12 15.5A3.5 3.5 0 1115.5 12 3.504 3.504 0 0112 15.5z" />
    </svg>
  );
}

export default SettingsIcon;
