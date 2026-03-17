/*
  AIChatbot – Full-featured chat interface for Sushant Kumar's portfolio AI agent.
  Features: glassmorphism UI, typing animation, suggested prompts, message history,
  auto-scroll, timestamps, and Framer Motion animations.
*/

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage } from '../services/aiService';

const SUGGESTED_PROMPTS = [
  "Tell me about Sushant's AI projects",
  "What technologies does Sushant use?",
  "Show me Sushant's achievements",
  "What hackathons has Sushant participated in?",
];

const GREETING_MESSAGE = {
  role: 'ai',
  text: "Hi! 👋 I'm Sushant's AI assistant. Feel free to ask me anything about his skills, projects, achievements, or experience. I'm here to help!",
  timestamp: new Date(),
};

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AIChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([GREETING_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAiText, setDisplayedAiText] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedAiText, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Typing animation for AI messages
  const animateTyping = useCallback((messageId, fullText) => {
    let index = 0;
    const speed = 12; // ms per character

    const interval = setInterval(() => {
      index += 2; // type 2 chars at a time for speed
      if (index >= fullText.length) {
        index = fullText.length;
        clearInterval(interval);
      }
      setDisplayedAiText((prev) => ({ ...prev, [messageId]: fullText.slice(0, index) }));
    }, speed);

    return () => clearInterval(interval);
  }, []);

  const handleSend = async (text) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isTyping) return;

    // Add user message
    const userMsg = { role: 'user', text: messageText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await sendMessage(messageText);
      const aiMsgId = Date.now().toString();
      const aiMsg = { role: 'ai', text: aiResponse, timestamp: new Date(), id: aiMsgId };
      setMessages((prev) => [...prev, aiMsg]);
      // Start typing animation
      setDisplayedAiText((prev) => ({ ...prev, [aiMsgId]: '' }));
      animateTyping(aiMsgId, aiResponse);
    } catch {
      const errorMsg = {
        role: 'ai',
        text: "Oops, something went wrong. Please try again!",
        timestamp: new Date(),
        id: 'error-' + Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedPrompt = (prompt) => {
    handleSend(prompt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="chatbot-window"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* ─── Header ─── */}
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-avatar">
                <span className="chatbot-avatar-pulse" />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                  <path d="M6 10v1a6 6 0 0 0 12 0v-1" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                </svg>
              </div>
              <div>
                <h3 className="chatbot-title">Sushant's AI Assistant</h3>
                <span className="chatbot-status">
                  <span className="chatbot-status-dot" />
                  Online
                </span>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={onClose} aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* ─── Messages ─── */}
          <div className="chatbot-messages" ref={chatContainerRef}>
            {messages.map((msg, index) => {
              const isAi = msg.role === 'ai';
              const displayText =
                isAi && msg.id && displayedAiText[msg.id] !== undefined
                  ? displayedAiText[msg.id]
                  : msg.text;

              return (
                <motion.div
                  key={index}
                  className={`chatbot-msg ${isAi ? 'chatbot-msg-ai' : 'chatbot-msg-user'}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0.1 : 0 }}
                >
                  {isAi && (
                    <div className="chatbot-msg-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                      </svg>
                    </div>
                  )}
                  <div className={`chatbot-bubble ${isAi ? 'chatbot-bubble-ai' : 'chatbot-bubble-user'}`}>
                    <p className="chatbot-bubble-text">{displayText}</p>
                    <span className="chatbot-timestamp">{formatTime(msg.timestamp)}</span>
                  </div>
                </motion.div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                className="chatbot-msg chatbot-msg-ai"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="chatbot-msg-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                </div>
                <div className="chatbot-bubble chatbot-bubble-ai">
                  <div className="chatbot-typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Suggested prompts – show only at start */}
            {messages.length <= 1 && !isTyping && (
              <motion.div
                className="chatbot-suggestions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={i}
                    className="chatbot-suggestion-chip"
                    onClick={() => handleSuggestedPrompt(prompt)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ─── Input Area ─── */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Ask me anything about Sushant..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              className="chatbot-send-btn"
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
