import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

// সকেট কানেকশন
const socket = io("http://localhost:5000");

const Messenger = () => {
    const { senderId, receiverId } = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const scrollRef = useRef();

    useEffect(() => {
        socket.emit("join", senderId);

        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off("receive_message");
    }, [senderId]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!senderId || !receiverId) return;
            try {
                const response = await fetch(
                    `http://localhost:5000/api/v1/messages/${senderId}/${receiverId}`
                );
                const resData = await response.json();
                if (resData.success) {
                    setMessages(resData.data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [senderId, receiverId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const msgData = {
            sender: senderId,
            receiver: receiverId,
            message: text,
        };

        socket.emit("send_message", msgData);
        setMessages((prev) => [...prev, { ...msgData, createdAt: new Date() }]);
        setText("");
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-screen bg-white md:max-w-4xl md:mx-auto md:border-x border-gray-100 ">
            <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm bg-white/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                            M
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900 text-base leading-none">Chat with Owner</h1>
                        <p className="text-xs text-gray-500 mt-1">Active now</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
                {messages.map((m, i) => {
                    const isMe = String(m.sender?._id || m.sender) === String(senderId);
                    return (
                        <div key={i} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`px-4 py-2.5 max-w-[75%] text-[15px] shadow-sm transition-all
                                    ${isMe
                                        ? "bg-[#0084ff] text-white rounded-[18px] rounded-br-[4px]"
                                        : "bg-[#f0f0f0] text-black rounded-[18px] rounded-bl-[4px]"
                                    }`}
                            >
                                {m.message}
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef}></div>
            </div>

            <div className="p-3 bg-white border-t border-gray-100">
                <form onSubmit={sendMessage} className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input
                            className="w-full bg-[#f0f2f5] border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-blue-100 outline-none placeholder-gray-500"
                            placeholder="Aa"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`p-2 transition-colors ${text.trim() ? "text-blue-600" : "text-gray-300"}`}
                        disabled={!text.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Messenger;