import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import router from './router.tsx';
import './index.scss';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
  </StrictMode>,
);
