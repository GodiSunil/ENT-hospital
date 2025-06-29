"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "white";
}

export function LoadingSpinner({ size = "md", color = "primary" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const colorClasses = {
    primary: "border-primary",
    accent: "border-accent",
    white: "border-white"
  };

  return (
    <motion.div
      className={`inline-block border-2 border-solid ${colorClasses[color]} border-t-transparent rounded-full ${sizeClasses[size]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}