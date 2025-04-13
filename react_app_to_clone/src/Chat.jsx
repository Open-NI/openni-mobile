import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';

const Chat = forwardRef(({ chatColor }, userChatRef) => {
  const [messages, setMessages] = useState([]);

  useImperativeHandle(userChatRef, () => ({
    addMessage: (text, senderIsUser) => {
      const sender = senderIsUser ? 'user' : 'bot';
      setMessages((prev) => [...prev, { sender, text }]);
    },
  }));

  return (
    <div className="w-full p-4 rounded-lg space-y-2 text-white">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 font-medium rounded-3xl text-[20px] text-semibold border-[#3d3d3d] border-1 shadow-[12px_12px_20px_rgba(0,0,0,0.4)] 
            ${msg.sender === 'user' ? 'text-left text-black' : 'text-right text-white bg-[#202020]'}
          `}
          style={msg.sender === 'user' ? { backgroundColor: `${chatColor}` } : {}}
        >
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
});

export default Chat;

