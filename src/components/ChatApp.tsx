import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/ChatApp.module.css';
import SearchBar from './SearchBar';
import ResponseView from './ResponseView';
import { callOpenAI } from '../services/openaiService';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const appStartTimeRef = useRef<string>("");

  useEffect(() => {
    const now = new Date();
    appStartTimeRef.current = now.toISOString();
    console.log('앱 실행 시각:', appStartTimeRef.current);
  }, []);

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    
    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => {
      const updated = [...prev, userMessage];
      localStorage.setItem('chat_messages', JSON.stringify(updated));
      return updated;
    });
    
    try {
      const aiResponse = await callOpenAI(message);
      
      // AI 응답 메시지 추가
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
      
      // 에러 메시지 추가
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

  // 대화 문맥 캐싱: 마운트 시 localStorage에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('chat_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // timestamp를 Date 객체로 변환
        setMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
      } catch {}
    }
  }, []);

  // 새로고침(최초 마운트) 시 현재 시간을 포함한 메시지 자동 전송 제거
  // useEffect(() => {
  //   const now = new Date();
  //   const formattedTimestamp = now.toISOString();
  //   handleSubmit(formattedTimestamp, formattedTimestamp);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   console.log('현재 시각', formattedTimestamp)
  // }, []);

  // 새 메시지가 추가될 때 자동으로 스크롤
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