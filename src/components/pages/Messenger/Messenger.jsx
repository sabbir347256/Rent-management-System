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
        <div className="bg-gray-100 min-h-screen  py-20">
            <div className="flex flex-col container">
                <div className="bg-white p-4 shadow-sm font-bold text-xl flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            M
                        </div>
                        <span>Chat with Owner</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-normal">Active Now</span>
                        <div className="h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col">
                    {messages.map((m, i) => {
                        const isMe = String(m.sender?._id || m.sender) === String(senderId);

                        return (
                            <div key={i} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`p-4 rounded-2xl max-w-[75%] shadow-sm ${isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border"
                                    }`}
                                >
                                    {m.message}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={scrollRef}></div>
                </div>

                <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex gap-3">
                        <input
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            placeholder="Type your message here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white p-3 px-6 rounded-full hover:bg-blue-700 transition-transform active:scale-95 flex items-center justify-center shadow-md shadow-blue-200"
                        >
                            <span className="font-semibold">Send</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Messenger;