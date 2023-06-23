// import React from 'react';
// import Message from './Message';
// import './MessageList.css';



// interface MessageListProps {
//   messages: string[];
// }



// const MessageList: React.FC<MessageListProps> = ({ messages }) => {
//   return (
//     <div className='mainPart'>
//       <ul>
//         {messages.map((message, index) => (
//           <Message key={index} message={message} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MessageList;

import React, { useEffect, useState } from 'react';
import './MessageList.css';

interface Chat {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const [firstMessageDate, setFirstMessageDate] = useState<string>('');

  useEffect(() => {
    // Fetch the API data
    fetch('https://qa.corider.in/assignment/chat?page=0')
      .then(response => response.json())
      .then(data => {
        // Set the fetched messages in the state
        setMessages(data.chats);// Extract the date from the first message and format it
        const firstMessage = data.chats[0];
        const messageDate = new Date(firstMessage.time);
        const formattedDate = messageDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        setFirstMessageDate(formattedDate);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  return (
    <div className='mainPart'>
      {firstMessageDate && (
        <div className='messageDate'>{firstMessageDate}</div>
      )}
      <ul className='messageList'>
        {messages.map((message, index) => (
          <Message key={index} message={message} self={message.sender.self} />
        ))}
      </ul>
    </div>
  );
};

interface MessageProps {
  message: Chat;
  self: boolean;
}

const Message: React.FC<MessageProps> = ({ message, self }) => {
  const messageStyle = {
    justifyContent: self ?  'flex-end':'flex-start' ,
  };
  const messageContentClassName = `messageContent ${self ? 'self' : ''}`;

  return (
    <li style={messageStyle}>
      {/* Render the user image */}
      <div className={`messageContainer ${self ? 'self' : ''}`}>
        {!self && <img src={message.sender.image} alt='User' className='userImage' /> }

        {/* Render the message content */}
        <div className={messageContentClassName}>{message.message}</div>
      </div>
    </li>
  );
};

export default MessageList;
