import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';


// We can also code the 'topbar' and 'tripinfo' here.------ practically it should be here!!

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://qa.corider.in/assignment/chat?page=0');
        const data = await response.json();
        setMessages(data.chats.map((chat: any) => chat.message));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleMessageSend = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    
    <div>
      
      {/* <MessageList messages={messages} /> */}
      <MessageList  />
      <MessageInput onMessageSend={handleMessageSend} />
    </div>

  );
};

export default ChatRoom;
