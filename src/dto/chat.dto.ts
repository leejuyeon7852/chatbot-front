export interface ChatRequestDto {
  prompt: string;
}

export interface ChatResponseDto {
  success: boolean;
  prompt?: string;
  error?: string;
} 