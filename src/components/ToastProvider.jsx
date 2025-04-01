import React from 'react';
import { Toaster } from 'sonner';

/**
 * Toast notification provider component
 */
const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
      richColors
    />
  );
};

export default ToastProvider;
