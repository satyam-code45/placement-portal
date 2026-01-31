// Mock API client with simulated network delay

const MOCK_DELAY = 500;

export async function mockApiCall<T>(data: T, delay = MOCK_DELAY): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

export async function mockApiError(message: string, delay = MOCK_DELAY): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
}

// Utility to generate IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}