import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [hasWelcomed, setHasWelcomed] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Show welcome message when chat opens for the first time
    useEffect(() => {
        if (open && !hasWelcomed && messages.length === 0) {
            setHasWelcomed(true);
            setIsTyping(true);

            const welcomeMsg = { role: 'bot', content: '', isTyping: true };
            setMessages([welcomeMsg]);

            // Simulate typing for welcome message
            const welcomeText = "Hello! Welcome to BlockEstate. Do you have any questions? I'm here to help you.";
            let typedText = '';

            const typeWelcomeMessage = async () => {
                for (let i = 0; i < welcomeText.length; i++) {
                    await new Promise(resolve => setTimeout(resolve, 20));
                    typedText += welcomeText[i];
                    setMessages([{ ...welcomeMsg, content: typedText }]);
                }
                setMessages([{ ...welcomeMsg, content: typedText, isTyping: false }]);
                setIsTyping(false);
            };

            typeWelcomeMessage();
        }
    }, [open, hasWelcomed]);

    // Check if window is active
    useEffect(() => {
        const handleFocus = () => setIsActive(true);
        const handleBlur = () => setIsActive(false);

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    // Animation for the closed state when window is inactive
    useEffect(() => {
        if (!open && !isActive) {
            const interval = setInterval(() => {
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 1000);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [open, isActive]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input, isTyping: false };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            setIsTyping(true);
            const res = await axios.post('http://localhost:5500/api/ask-ai', { message: input });

            // Add temporary typing indicator
            const tempMsg = { role: 'bot', content: '', isTyping: true };
            setMessages(prev => [...prev, tempMsg]);

            // Simulate typing effect
            let typedText = '';
            const replyText = res.data.reply;
            for (let i = 0; i < replyText.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 10)); // Typing speed
                typedText += replyText[i];
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        ...newMessages[newMessages.length - 1],
                        content: typedText
                    };
                    return newMessages;
                });
            }

            // Mark typing as complete
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    isTyping: false
                };
                return newMessages;
            });
        } catch (err) {
            console.error('Chatbot error:', err);
            setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I encountered an error.", isTyping: false }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {open ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="bg-white dark:bg-[#1E1E1E] p-4 rounded-xl shadow-2xl w-[450px] border border-gray-100 dark:border-[#5D5D65]"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="font-bold text-gray-800 dark:text-[#ffffff] text-lg flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                                BlockEstate Assistant
                            </h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 dark:text-[#ffffff] hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="h-80 overflow-y-auto border border-gray-200 dark:border-[#5D5D65] p-3 mb-3 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg shadow">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    <div className={`inline-block rounded-lg px-3 py-2 text-sm max-w-[80%] ${
                                        msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-gray-200 dark:bg-[#3D3D3D] text-gray-800 dark:text-[#E5E7EB] rounded-tl-none'
                                    }`}>
                                        {msg.content}
                                        {msg.isTyping && (
                                            <span className="typing-dots">
                                                <span className="dot">.</span>
                                                <span className="dot">.</span>
                                                <span className="dot">.</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && !isTyping && sendMessage()}
                                placeholder="Ask something..."
                                disabled={isTyping}
                                className="flex-1 p-2 text-sm rounded-lg outline-none transition duration-300 ease-out
                                dark:bg-transparent dark:text-[#ffffff] border dark:border-[#5D5D65]
                                border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight
                                disabled:opacity-70 disabled:cursor-not-allowed"
                                autoFocus
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isTyping || !input.trim()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center
                                disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isTyping ? (
                                    <div className="flex space-x-1">
                                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        onClick={() => setOpen(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={isAnimating ? {
                            y: [0, -8, 0],
                            scale: [1, 1.1, 1],
                            rotate: isActive ? [0, 0, 0] : [0, -10, 10, 0],
                            transition: {
                                duration: 0.8,
                                repeat: isActive ? 0 : 1
                            }
                        } : {}}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl relative"
                    >
                        <motion.div
                            animate={!isActive ? {
                                scale: [1, 1.2, 1],
                                transition: {
                                    duration: 1.5,
                                    repeat: Infinity
                                }
                            } : {}}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </motion.div>
                        {messages.length > 0 && (
                            <motion.span
                                className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    y: isAnimating ? [-2, 2, -2] : 0,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {messages.length}
                            </motion.span>
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            <style jsx>{`
                .typing-dots {
                    display: inline-block;
                    margin-left: 4px;
                }
                .typing-dots .dot {
                    display: inline-block;
                    opacity: 0;
                    animation: dotFade 1.4s infinite;
                }
                .typing-dots .dot:nth-child(1) { animation-delay: 0ms; }
                .typing-dots .dot:nth-child(2) { animation-delay: 300ms; }
                .typing-dots .dot:nth-child(3) { animation-delay: 600ms; }
                @keyframes dotFade {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}