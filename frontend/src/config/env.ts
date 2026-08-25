export const env = {
  API_URL: import.meta.env.VITE_API_URL || '/api/v1',
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true' || false,
  APP_NAME: 'CareerBridge',
  HACKATHON_TAG: "HACKN'TECH 10.0 • Theme 8: Future of Work"
};
