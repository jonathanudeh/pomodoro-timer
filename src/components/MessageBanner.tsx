// components/MessageBanner.tsx
import { useEffect } from "react";
import { useTimer } from "../context/TimerContext";
import { motion, AnimatePresence } from "framer-motion";

function MessageBanner() {
  const { message, themeColor, dispatch } = useTimer();

  // Auto-clear after 3s
  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => {
      dispatch({ type: "SET_MESSAGE", payload: null });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message, dispatch]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          //   initial={{ y: -60, opacity: 0 }}
          //   animate={{ y: 0, opacity: 1 }}
          //   exit={{ y: -60, opacity: 0 }}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.4 }}
          style={
            {
              "--user-color": themeColor,
            } as React.CSSProperties
          }
          className="fixed left-0 top-4 bg-[color:var(--user-color)] text-white font-medium text-sm min-w-55 h-10 px-2 rounded-r-lg z-50 shadow-lg flex items-center justify-start"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MessageBanner;
