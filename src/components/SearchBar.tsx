import React, { useState } from 'react';
import styles from '../css/SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      await onSubmit(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className={styles.input}
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading || !inputText.trim()}
      >
        {isLoading ? '전송 중...' : '전송'}
      </button>
    </form>
  );
};

export default SearchBar; 