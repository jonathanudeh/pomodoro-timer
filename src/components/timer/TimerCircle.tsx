import { motion } from "framer-motion";
import { useTimer } from "../../context/TimerContext";

export default function CircularCountdown({
  size = 180,
  strokeWidth = 15,
  imageSrc = "/tomatoe.svg",
  secondImageSrc = "/clock-handle.svg",
}) {
  const { mode, timeLeft, session, shortBreak, longBreak, themeColor } =
    useTimer();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 💡 Calculate the full duration based on current mode
  const duration =
    mode === "session"
      ? session * 60
      : mode === "shortBreak"
      ? shortBreak * 60
      : longBreak * 60;

  const percentage = (timeLeft / duration) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-fit h-fit">
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress circle */}
        <motion.circle
          stroke={themeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={imageSrc}
          alt="Tomato"
          className="absolute top-1/2 left-1/2 w-30 h-30 -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <img
          src={secondImageSrc}
          alt="Tomato"
          className="absolute top-1/2 left-1/2 w-13 h-13 -translate-x-1/2 -translate-y-1/3 object-contain"
        />
      </div>
    </div>
  );
}
