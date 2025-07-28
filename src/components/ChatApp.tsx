import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/ChatApp.module.css';
import SearchBar from './SearchBar';
import ResponseView from './ResponseView';
import { callOpenAI } from '../services/openaiService';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // ✅ 한 세션 동안 고정되는 uuid를 생성
  const conversationIdRef = useRef<string>(uuidv4());

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    const now = new Date();

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: now
    };

    setMessages(prev => {
      const updated = [...prev, userMessage];
      localStorage.setItem('chat_messages', JSON.stringify(updated));
      return updated;
    });

    try {
      // ✅ uuid를 백엔드로 전송
      const aiResponse = await callOpenAI(message, conversationIdRef.current);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => {
        const updated = [...prev, assistantMessage];
        localStorage.setItem('chat_messages', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '오류가 발생했습니다. API 키를 확인해주세요.',
        timestamp: new Date()
      };

      setMessages(prev => {
        const updated = [...prev, errorMessage];
        localStorage.setItem('chat_messages', JSON.stringify(updated));
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 대화 복원
  useEffect(() => {
    const saved = localStorage.getItem('chat_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
      } catch {}
    }
  }, []);

  // 자동 스크롤
  useEffect(() => {
    const chatContainer = document.querySelector(`.${styles.chatContainer}`);
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      <ResponseView messages={messages} />
      <SearchBar onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ChatApp;
