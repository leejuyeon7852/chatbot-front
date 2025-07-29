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

  // 새로고침 시 채팅 내용 삭제
  useEffect(() => {
    // 새로고침 시 채팅 내용 삭제
    localStorage.removeItem('chat_messages');
    const now = new Date();
    console.log('앱 실행 시각:', now.toISOString());
  }, []);

  // 대화 복원 (삭제됨 - 새로고침 시 항상 빈 상태로 시작)
  // useEffect(() => {
  //   const saved = localStorage.getItem('chat_messages');
  //   if (saved) {
  //     try {
  //       const parsed = JSON.parse(saved);
  //       setMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
  //     } catch {}
  //   }
  // }, []);

  // 채팅 컨테이너가 마운트될 때 맨 아래로 스크롤
  useEffect(() => {
    const chatContainer = document.querySelector(`.${styles.chatContainer}`);
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, []);

  // 새 메시지가 추가될 때 자동으로 스크롤
  useEffect(() => {
    const chatContainer = document.querySelector(`.${styles.chatContainer}`);
    if (chatContainer) {
      // 부드러운 스크롤로 맨 아래로 이동
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
      });
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
