import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type props = {
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
  imageSrc: string;
  secondImageSrc: string;
};

const TimerCircle: React.FC<props> = ({
  progress,
  size = 150,
  strokeWidth = 10,
  color = "#10b981",
  imageSrc = "/tomatoe.svg",
  secondImageSrc = "/clock-handle.svg",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const progressValue = useMotionValue(progress);
  const strokeDashoffset = useTransform(
    progressValue,
    [0, 1],
    [circumference, 0]
  );

  useEffect(() => {
    progressValue.set(progress);
  }, [progress, progressValue]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={250}
          style={{ strokeDashoffset }}
        />
      </svg>

      <img
        src={imageSrc}
        alt="Tomato"
        className="absolute top-1/2 left-1/2 w-25 h-25 -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <img
        src={secondImageSrc}
        alt="Tomato"
        className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/3 object-contain"
      />
    </div>
  );
};

export default TimerCircle;

// import React from 'react';
// import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// type Props = {
//   percentage: number; // value between 0 and 100
//   size?: number; // in px
//   strokeWidth?: number;
//   color?: string;
//   imageSrc?: string; // image for center (like tomato)
// };

// const CircularProgress: React.FC<Props> = ({
//   percentage,
//   size = 150,
//   strokeWidth = 10,
//   color = '#10b981',
//   imageSrc = '/tomato.png', // default tomato image path
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const center = size / 2;

//   const progress = useMotionValue(0);
//   const strokeDashoffset = useTransform(
//     progress,
//     [0, 100],
//     [circumference, 0]
//   );

//   React.useEffect(() => {
//     const controls = animate(progress, percentage, {
//       duration: 0.8,
//       ease: 'easeInOut',
//     });
//     return controls.stop;
//   }, [percentage]);

//   // Ball tip position
//   const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2;
//   const ballX = center + radius * Math.cos(angle);
//   const ballY = center + radius * Math.sin(angle);

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       {/* SVG Ring */}
//       <svg width={size} height={size}>
//         <circle
//           cx={center}
//           cy={center}
//           r={radius}
//           stroke="#e5e7eb"
//           strokeWidth={strokeWidth}
//           fill="none"
//         />
//         <motion.circle
//           cx={center}
//           cy={center}
//           r={radius}
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           fill="none"
//           strokeDasharray={circumference}
//           style={{ strokeDashoffset }}
//         />
//       </svg>

//       {/* Tip Ball */}
//       <motion.div
//         className="absolute bg-white border border-green-500 rounded-full shadow"
//         style={{
//           width: 12,
//           height: 12,
//           left: ballX - 6,
//           top: ballY - 6,
//         }}
//       />

//       {/* Center Image */}
//       <img
//         src={imageSrc}
//         alt="Tomato"
//         className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 object-contain"
//       />
//     </div>
//   );
// };

// export default CircularProgress;
