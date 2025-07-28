export interface ChatRequestDto {
  prompt: string;
}

export interface ChatResponseDto {
  success: boolean;
  message?: string;
  error?: string;
  prompt?: string;
}

export const callOpenAI = async (message: string): Promise<string> => {
  const requestBody: ChatRequestDto = {
    prompt: message
  };

  const apiResponse = await fetch('http://localhost:3000/openai/chat', {
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
    throw new Error(data.error || '서버에서 오류가 발생했습니다.');
  }

  return data.prompt || '응답을 받지 못했습니다.';
}; 