import { toast as sonnerToast } from 'sonner';
import React from 'react';
import { CustomToast } from '@/components/ui/utils/custom-toast';

// Disable Sonner's default styling entirely by passing an empty class
const baseOptions = {
  unstyled: true,
  classNames: {
    toast: 'bg-transparent border-none shadow-none p-0',
  },
};

export const toast = {
  success: (message: string, description?: string) =>
    sonnerToast.custom(
      () => React.createElement(CustomToast, { type: 'success', message, description }),
      baseOptions
    ),

  error: (message: string, description?: string) =>
    sonnerToast.custom(
      () => React.createElement(CustomToast, { type: 'error', message, description }),
      baseOptions
    ),

  info: (message: string, description?: string) =>
    sonnerToast.custom(
      () => React.createElement(CustomToast, { type: 'info', message, description }),
      baseOptions
    ),
};
