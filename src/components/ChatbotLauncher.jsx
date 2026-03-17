/*
  ChatbotLauncher – 3D interactive launcher for the AI chatbot.
  Uses React Three Fiber to render a rotating 3D robot icon.
  Clicking opens/closes the chatbot window.
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AIChatbot from './AIChatbot';

export default function ChatbotLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);
  const closeChat = () => setIsOpen(false);

  return (
    <div className="chatbot-launcher-wrapper">
      {/* Chatbot Window */}
      <AIChatbot isOpen={isOpen} onClose={closeChat} />

      {/* Launcher Button */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="launcher"
            className="chatbot-launcher-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
            onClick={toggleChat}
          >
            {/* Bot Head Icon */}
            <div className="bot-head">
              <div className="bot-antennae" />
              <div className="bot-face">
                <div className="bot-eyes">
                  <motion.div 
                    className="bot-eye"
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      times: [0, 0.45, 0.5, 0.55, 1],
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="bot-eye"
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      times: [0, 0.45, 0.5, 0.55, 1],
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="bot-mouth" />
              </div>
            </div>
            
            {/* Hover Tooltip/Text */}
            <div className="chatbot-launcher-tooltip">
              Talk to Sushant's AI
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="close"
            className="chatbot-launcher-close"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={closeChat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close chatbot"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

