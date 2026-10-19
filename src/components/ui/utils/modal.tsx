import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModalProps {
  // ... (keep your existing props)
  children: React.ReactNode;
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  showFooter?: boolean;
  submitVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  isPending?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  showFooter = true,
  submitVariant = 'default',
  isPending = false,
  className = '',
}) => {
  const handleOpenChange = (open: boolean) => {
    if (!open && !isPending) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          'sm:max-w-[425px] border-border shadow-2xl transition-all duration-500',
          // ✅ Universal Emerald Glow on Modal Border
          'focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]',
          className
        )}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit?.();
          }}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          <div className="py-2">{children}</div>

          {showFooter && (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                {cancelText}
              </Button>
              {onSubmit && (
                <Button
                  type="submit"
                  variant={submitVariant}
                  disabled={isPending}
                  // ✅ Submit Button Glow
                  className="transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  {submitText}
                </Button>
              )}
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
