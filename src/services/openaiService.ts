import type { ChatRequestDto, ChatResponseDto } from '../dto/chat.dto';

export const callOpenAI = async (message: string, timestamp: string): Promise<string> => {
  const requestBody: ChatRequestDto = {
    prompt: message,
    timestamp: timestamp
  };

  const apiResponse = await fetch('http://localhost:3000/openai/rag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!apiResponse.ok) {
    throw new Error('서버 호출에 실패했습니다.');
  }

  const data: ChatResponseDto = await apiResponse.json();
  
  if (!data.success) {
    throw new Error('서버에서 오류가 발생했습니다.');
  }

  return data.message || '응답을 받지 못했습니다.';
}; 