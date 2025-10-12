import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Optional: Remember open/close state
    useEffect(() => {
        const savedState = localStorage.getItem("chatbotOpen");
        if (savedState === "true") setIsOpen(true);
    }, []);

    const toggleChat = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        localStorage.setItem("chatbotOpen", newState);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50"
                aria-label="Chatbot"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chatbot Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-20 right-4 sm:right-6 w-[90%] sm:w-[380px] h-[75vh] sm:h-[600px] bg-white  rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white shrink-0">
                            <h3 className="text-sm sm:text-base font-semibold">
                                Chat with Srijagatheeswaran
                            </h3>
                            <button
                                onClick={toggleChat}
                                className="hover:text-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chatbase Iframe */}
                        <div className="flex-1">
                            <iframe
                                src="https://www.chatbase.co/chatbot-iframe/Qrln_fxAUezbDip3HFU_J"
                                className="w-full h-full border-0"
                                title="Srijagatheeswaran Chatbot"
                                allow="microphone;"
                            ></iframe>
                        </div>
                    </motion.div>

                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotWidget;
