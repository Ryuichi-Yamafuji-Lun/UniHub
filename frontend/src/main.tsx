import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = "424890256065-kvvgj81ffm6ah00bkvumbgq4n3irudln.apps.googleusercontent.com";

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