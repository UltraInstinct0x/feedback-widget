// app/config.ts

export const ANIMATION_CONFIG = {
    default: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
    
    spring: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
    
    exit: {
      duration: 0.15,
      ease: [0.4, 0, 1, 1],
    },
    
    layout: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    }
  } as const;
  
  // Also export common animation variants
  export const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: ANIMATION_CONFIG.default
  } as const;
  
  export const scaleInOut = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: ANIMATION_CONFIG.default
  } as const;