import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  throw new Error("Missing Google Client ID. Did you set VITE_GOOGLE_CLIENT_ID in your .env file?");
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find the root element to mount the app.");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);