// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import this if not already

const queryClient = new QueryClient();

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer position="top-right" className="right-[52px] top-7" />
    </QueryClientProvider>
  </StrictMode>
);
