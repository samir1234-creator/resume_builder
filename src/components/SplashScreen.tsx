import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void, key?: string }) {
  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background Pulse */}
      <motion.div 
        className="absolute w-[500px] h-[500px] bg-slate-900 rounded-full blur-[100px] opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="w-24 h-24 bg-white rounded-3xl rotate-12 flex items-center justify-center shadow-2xl relative">
             <div className="absolute inset-0 bg-white rounded-3xl -rotate-6 opacity-20" />
             <span className="text-4xl font-black text-slate-950 -rotate-12 italic">E</span>
          </div>
        </motion.div>

        {/* Text Animation */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl font-black text-white uppercase tracking-[0.4em] leading-none"
          >
            Elevate CV
          </motion.h1>
          
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </motion.div>
            <span>by Samir</span>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-12 w-48 h-[1px] bg-slate-800 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div 
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2.5, 
            ease: "easeInOut",
          }}
          onAnimationComplete={onComplete}
        />
      </motion.div>
    </motion.div>
  );
}
