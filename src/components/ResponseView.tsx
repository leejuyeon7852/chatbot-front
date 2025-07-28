import React from 'react';
import styles from '../css/ResponseView.module.css';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ResponseViewProps {
  messages: Message[];
}

const ResponseView: React.FC<ResponseViewProps> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>대화를 시작해보세요!</p>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`${styles.messageContainer} ${
            message.type === 'user' ? styles.userMessage : styles.assistantMessage
          }`}
        >
          <div className={styles.messageContent}>
            <div className={styles.messageHeader}>
              <span className={styles.messageType}>
                {message.type === 'user' ? '사용자' : 'AI'}
              </span>
              <span className={styles.timestamp}>
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className={styles.messageText}>
              {message.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResponseView; 