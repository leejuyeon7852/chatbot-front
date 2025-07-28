import React from 'react';
import styles from './Count.module.css';

// Count 컴포넌트의 props 타입 정의
interface CountProps {
  count: number;
  onCountChange: (newCount: number) => void;
  buttonCountText: string;
}

const Count: React.FC<CountProps> = ({ 
  count, 
  onCountChange, 
  buttonCountText 
}) => {
  const handleIncrement = () => {
    onCountChange(count + 1);
  };

  const handleDecrement = () => {
    onCountChange(count - 1);
  };

  const handleReset = () => {
    onCountChange(0);
  };

  return (
    <div className={styles.countContainer}>
      <h3 className={styles.countTitle}>{buttonCountText} {count}</h3>
      
      <div className={styles.buttonGroup}>
        <button 
          className={styles.decrementButton}
          onClick={handleDecrement}
        >
          감소
        </button>
        
        <button 
          className={styles.incrementButton}
          onClick={handleIncrement}
        >
          증가
        </button>
        
        <button 
          className={styles.resetButton}
          onClick={handleReset}
        >
          리셋
        </button>
      </div>
    </div>
  );
};

export default Count; 