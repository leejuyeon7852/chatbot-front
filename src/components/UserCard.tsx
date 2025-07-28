import React from 'react';

// Props 타입 정의
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isActive?: boolean; // 선택적 props
  avatar?: string;
}

// Props를 받는 컴포넌트
const UserCard: React.FC<UserCardProps> = ({ 
  name, 
  age, 
  email, 
  isActive = false, // 기본값 설정
  avatar 
}) => {
  return (
    <div className="user-card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      backgroundColor: isActive ? '#e8f5e8' : '#f9f9f9',
      maxWidth: '300px'
    }}>
      {avatar && (
        <img 
          src={avatar} 
          alt={`${name}의 아바타`}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            marginBottom: '12px'
          }}
        />
      )}
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{name}</h3>
      <p style={{ margin: '4px 0', color: '#666' }}>나이: {age}세</p>
      <p style={{ margin: '4px 0', color: '#666' }}>이메일: {email}</p>
      <span style={{
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        backgroundColor: isActive ? '#4caf50' : '#9e9e9e',
        color: 'white'
      }}>
        {isActive ? '활성' : '비활성'}
      </span>
    </div>
  );
};

export default UserCard; 