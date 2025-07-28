import React from 'react';

// Button 컴포넌트의 props 타입 정의
interface ButtonProps {
  children?: React.ReactNode; // 자식 요소 (선택적)
  text?: string; // 텍스트 prop (선택적)
  onClick?: () => void; // 클릭 이벤트 핸들러 (선택적)
  variant?: 'primary' | 'secondary' | 'danger'; // 버튼 스타일 변형
  size?: 'small' | 'medium' | 'large'; // 버튼 크기
  disabled?: boolean; // 비활성화 여부
  type?: 'button' | 'submit' | 'reset'; // 버튼 타입
}

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button'
}) => {
  // 표시할 텍스트 결정 (children 우선, 없으면 text 사용)
  const displayText = children || text || '';

  // 스타일 객체 생성
  const getButtonStyle = () => {
    const baseStyle = {
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.6 : 1,
    };

    // 크기별 스타일
    const sizeStyles = {
      small: { padding: '6px 12px', fontSize: '12px' },
      medium: { padding: '8px 16px', fontSize: '14px' },
      large: { padding: '12px 24px', fontSize: '16px' }
    };

    // 변형별 스타일
    const variantStyles = {
      primary: {
        backgroundColor: '#007bff',
        color: 'white',
        '&:hover': { backgroundColor: '#0056b3' }
      },
      secondary: {
        backgroundColor: '#6c757d',
        color: 'white',
        '&:hover': { backgroundColor: '#545b62' }
      },
      danger: {
        backgroundColor: '#dc3545',
        color: 'white',
        '&:hover': { backgroundColor: '#c82333' }
      }
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant]
    };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={getButtonStyle()}
    >
      {displayText}
    </button>
  );
};

export default Button; 